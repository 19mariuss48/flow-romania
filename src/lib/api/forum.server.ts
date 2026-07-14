import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/db";
import { forumCategories, forums, forumThreads, forumPosts, profiles, applications, forumLikes } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { getCache, setCache, clearCacheByPrefix } from "./cache.server";

function invalidateForumCache() {
  clearCacheByPrefix("forum_");
  clearCacheByPrefix("thread_");
}


export const getForumStructure = createServerFn({ method: "GET" })
  .handler(async () => {
    const cacheKey = "forum_structure";
    const cached = getCache(cacheKey);
    if (cached) return cached;

    let cats = await db.query.forumCategories.findMany({
      orderBy: (cats, { asc }) => [asc(cats.order_index)]
    });
    
    // Auto-seed if empty
    if (cats.length === 0) {
      await autoSeedForumStructure();
      cats = await db.query.forumCategories.findMany({
        orderBy: (cats, { asc }) => [asc(cats.order_index)]
      });
    }

    const fms = await db.query.forums.findMany({
      orderBy: (fms, { asc }) => [asc(fms.order_index)]
    });

    const structured = cats.map((cat, idx) => {
      const categoryForums = fms.filter(f => f.category_id === cat.id);
      return {
        group: cat.title,
        slug: cat.slug,
        tag: String(idx + 1).padStart(2, "0"),
        cats: categoryForums.map(f => ({
          title: f.title,
          slug: f.slug,
          desc: f.description || "",
          icon: f.icon || "◆",
          threads_count: f.threads_count,
          posts_count: f.posts_count,
          subs: [] // Mocked for now
        }))
      };
    });
    setCache(cacheKey, structured, 60);
    return structured;
  });

export const getForumDetails = createServerFn({ method: "POST" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const cacheKey = `forum_details_${data.slug}`;
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const forum = await db.query.forums.findFirst({
      where: eq(forums.slug, data.slug)
    });
    setCache(cacheKey, forum || null, 60);
    return forum || null;
  });

export const getForumThreads = createServerFn({ method: "POST" })
  .inputValidator(z.object({ forumId: z.string() }))
  .handler(async ({ data }) => {
    const cacheKey = `forum_threads_${data.forumId}`;
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const threads = await db.query.forumThreads.findMany({
      where: eq(forumThreads.forum_id, data.forumId),
      orderBy: (threads, { desc }) => [desc(threads.is_pinned), desc(threads.created_at)]
    });

    if (threads.length === 0) return [];

    const userIds = [...new Set(threads.map(t => t.user_id))];
    const users = await db.query.profiles.findMany({
      where: inArray(profiles.id, userIds)
    });

    const result = threads.map(t => {
      const user = users.find(u => u.id === t.user_id);
      return {
        ...t,
        user_name: user?.display_name || user?.username || "Cetățean",
        avatar_url: user?.avatar_url || ""
      };
    });

    setCache(cacheKey, result, 60);
    return result;
  });

export const getThreadDetails = createServerFn({ method: "POST" })
  .inputValidator(z.object({ threadId: z.string() }))
  .handler(async ({ data }) => {
    const cacheKey = `thread_details_${data.threadId}`;
    const cached = getCache<any>(cacheKey);

    if (cached) {
      // Async increment views in background
      db.query.forumThreads.findFirst({ where: eq(forumThreads.id, data.threadId) }).then(t => {
        if (t) {
          db.update(forumThreads).set({ views_count: t.views_count + 1 }).where(eq(forumThreads.id, data.threadId)).execute();
        }
      });
      return cached;
    }

    const thread = await db.query.forumThreads.findFirst({
      where: eq(forumThreads.id, data.threadId)
    });
    if (!thread) return null;

    const posts = await db.query.forumPosts.findMany({
      where: eq(forumPosts.thread_id, data.threadId),
      orderBy: (posts, { asc }) => [asc(posts.created_at)]
    });

    const userIds = [...new Set([thread.user_id, ...posts.map(p => p.user_id)])];
    const users = await db.query.profiles.findMany({
      where: inArray(profiles.id, userIds)
    });

    const threadUser = users.find(u => u.id === thread.user_id);
    
    // Increment views
    await db.update(forumThreads)
      .set({ views_count: thread.views_count + 1 })
      .where(eq(forumThreads.id, thread.id));

    const result = {
      thread: {
        ...thread,
        views_count: thread.views_count + 1,
        user_name: threadUser?.display_name || threadUser?.username || "Cetățean",
        avatar_url: threadUser?.avatar_url || ""
      },
      posts: [
        {
          id: thread.id,
          thread_id: thread.id,
          user_id: thread.user_id,
          content: thread.content,
          created_at: thread.created_at,
          updated_at: thread.updated_at,
          likes: 0,
          liked: false,
          user_name: threadUser?.display_name || threadUser?.username || "Ceta?ean",
          avatar_url: threadUser?.avatar_url || "",
          rank: threadUser?.faction || "Jucator"
        },
        ...posts.map(p => {
          const user = users.find(u => u.id === p.user_id);
          return {
            ...p,
            user_name: user?.display_name || user?.username || "Ceta?ean",
            avatar_url: user?.avatar_url || "",
            rank: user?.faction || "Jucator"
          };
        })]
    };

    setCache(cacheKey, result, 60);
    return result;
  });

export const createThread = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    forumId: z.string(),
    userId: z.string(),
    category: z.string().optional(),
    title: z.string(),
    content: z.string()
  }))
  .handler(async ({ data }) => {
    const threadId = crypto.randomUUID();
    
    await db.insert(forumThreads).values({
      id: threadId,
      forum_id: data.forumId,
      user_id: data.userId,
      category: data.category || null,
      title: data.title,
      content: data.content,
      views_count: 0,
      replies_count: 0
    });

    const postId = crypto.randomUUID();
    await db.insert(forumPosts).values({
      id: postId,
      thread_id: threadId,
      user_id: data.userId,
      content: data.content
    });

    const forum = await db.query.forums.findFirst({
      where: eq(forums.id, data.forumId)
    });

    if (forum) {
      await db.update(forums)
        .set({ threads_count: (forum.threads_count || 0) + 1, posts_count: (forum.posts_count || 0) + 1 })
        .where(eq(forums.id, forum.id));

      let appType = "";
      if (forum.slug === "aplicatii-politie") appType = "police";
      else if (forum.slug === "aplicatii-smurd") appType = "medic";
      else if (forum.slug === "aplicatii-staff") appType = "staff";

      if (appType) {
        const appId = crypto.randomUUID();
        const userProfile = await db.query.profiles.findFirst({ where: eq(profiles.id, data.userId) });
        const charName = userProfile?.character_name || userProfile?.display_name || userProfile?.username || "Cetățean";
        const ageMatch = data.content.match(/V[aâă]rst[aă]:?\s*(\d+)/i);
        const age = ageMatch ? parseInt(ageMatch[1], 10) : 18;
        
        await db.insert(applications).values({
          id: appId,
          user_id: data.userId,
          type: appType,
          character_name: charName,
          age: age,
          playtime_hours: userProfile?.fivem_playtime ? Math.floor(userProfile.fivem_playtime / 60) : 0,
          motivation: "Aplicație depusă pe forum: " + data.content.substring(0, 100) + "...",
          status: "in_asteptare"
        });
      }
    }

    invalidateForumCache();
    return { success: true, threadId };
  });

export const createPost = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    threadId: z.string(),
    userId: z.string(),
    content: z.string()
  }))
  .handler(async ({ data }) => {
    // Check if thread exists and is locked
    const thread = await db.query.forumThreads.findFirst({
      where: eq(forumThreads.id, data.threadId)
    });
    
    if (!thread) {
      throw new Error("Acest subiect a fost șters.");
    }
    
    if (thread.is_locked) {
      throw new Error("Acest subiect este închis! Nu poți adăuga răspunsuri.");
    }

    const postId = crypto.randomUUID();
    await db.insert(forumPosts).values({
      id: postId,
      thread_id: data.threadId,
      user_id: data.userId,
      content: data.content
    });

    // Update replies count
    await db.update(forumThreads)
      .set({ replies_count: thread.replies_count + 1 })
      .where(eq(forumThreads.id, data.threadId));

    invalidateForumCache();
    return { success: true, postId };
  });

export const deletePost = createServerFn({ method: "POST" })
  .inputValidator(z.object({ postId: z.string() }))
  .handler(async ({ data }) => {
    const post = await db.query.forumPosts.findFirst({
      where: eq(forumPosts.id, data.postId)
    });
    if (post) {
      await db.delete(forumPosts).where(eq(forumPosts.id, data.postId));
      const thread = await db.query.forumThreads.findFirst({
        where: eq(forumThreads.id, post.thread_id)
      });
      if (thread && thread.replies_count > 0) {
        await db.update(forumThreads)
          .set({ replies_count: thread.replies_count - 1 })
          .where(eq(forumThreads.id, post.thread_id));
      }
    }
    invalidateForumCache();
    return { success: true };
  });

export const deleteThread = createServerFn({ method: "POST" })
  .inputValidator(z.object({ threadId: z.string() }))
  .handler(async ({ data }) => {
    await db.delete(forumThreads).where(eq(forumThreads.id, data.threadId));
    invalidateForumCache();
    return { success: true };
  });

export const toggleThreadLock = createServerFn({ method: "POST" })
  .inputValidator(z.object({ threadId: z.string() }))
  .handler(async ({ data }) => {
    const thread = await db.query.forumThreads.findFirst({
      where: eq(forumThreads.id, data.threadId)
    });
    if (thread) {
      await db.update(forumThreads).set({ is_locked: !thread.is_locked }).where(eq(forumThreads.id, data.threadId));
      invalidateForumCache();
      return { success: true, is_locked: !thread.is_locked };
    }
    return { success: false };
  });

export const toggleThreadPin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ threadId: z.string() }))
  .handler(async ({ data }) => {
    const thread = await db.query.forumThreads.findFirst({
      where: eq(forumThreads.id, data.threadId)
    });
    if (thread) {
      await db.update(forumThreads).set({ is_pinned: !thread.is_pinned }).where(eq(forumThreads.id, data.threadId));
      invalidateForumCache();
      return { success: true, is_pinned: !thread.is_pinned };
    }
    return { success: false };
  });

export const toggleLike = createServerFn({ method: "POST" })
  .inputValidator(z.object({ postId: z.string(), userId: z.string() }))
  .handler(async ({ data }) => {
    // Check if like exists
    const existingLike = await db.query.forumLikes.findFirst({
      where: (likes, { and, eq }) => and(
        eq(likes.user_id, data.userId),
        eq(likes.post_id, data.postId)
      )
    });

    if (existingLike) {
      await db.delete(forumLikes).where(eq(forumLikes.id, existingLike.id));
      invalidateForumCache();
      return { success: true, liked: false };
    } else {
      await db.insert(forumLikes).values({
        id: crypto.randomUUID(),
        user_id: data.userId,
        post_id: data.postId
      });
      invalidateForumCache();
      return { success: true, liked: true };
    }
  });

export const getLatestThreads = createServerFn({ method: "GET" })
  .handler(async () => {
    const cacheKey = "latest_threads_global";
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const threads = await db.query.forumThreads.findMany({
      orderBy: (threads, { desc }) => [desc(threads.created_at)],
      limit: 6
    });

    if (threads.length === 0) return [];

    const userIds = [...new Set(threads.map(t => t.user_id))];
    const forumIds = [...new Set(threads.map(t => t.forum_id))];

    const [users, fms] = await Promise.all([
      db.query.profiles.findMany({ where: inArray(profiles.id, userIds) }),
      db.query.forums.findMany({ where: inArray(forums.id, forumIds) })
    ]);

    const result = threads.map(t => {
      const user = users.find(u => u.id === t.user_id);
      const forum = fms.find(f => f.id === t.forum_id);
      
      const diffMs = Date.now() - new Date(t.created_at).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      let timeStr = `${diffMins}m`;
      if (diffMins >= 1440) {
        timeStr = `${Math.floor(diffMins / 1440)}z`;
      } else if (diffMins >= 60) {
        timeStr = `${Math.floor(diffMins / 60)}h`;
      }
      if (diffMins === 0) timeStr = "Acum";

      return {
        id: t.id,
        t: t.title,
        a: user?.username || "Cetățean",
        c: forum?.title?.replace("[FiveM] ", "") || t.category || "General",
        time: timeStr
      };
    });

    setCache(cacheKey, result, 60);
    return result;
  });

async function autoSeedForumStructure() {
  const oocCatId = crypto.randomUUID();
  const icCatId = crypto.randomUUID();

  await db.insert(forumCategories).values([
    { id: oocCatId, title: "FLOW ROMÂNIA [OOC]", slug: "flow-romania-ooc", order_index: 1 },
    { id: icCatId, title: "FLOW ROMÂNIA [IC]", slug: "flow-romania-ic", order_index: 2 }
  ]);

  const forumsList = [
    { id: crypto.randomUUID(), category_id: oocCatId, title: "Anunțuri Oficiale", slug: "anunturi", description: "Noutăți, jurnale de modificări și știri oficiale.", icon: "📢", order_index: 1 },
    { id: crypto.randomUUID(), category_id: oocCatId, title: "[FiveM] Staff FLOW", slug: "staff", description: "Aplicații, anunțuri și informații despre echipa administrativă FLOW.", icon: "🛡️", order_index: 2 },
    { id: crypto.randomUUID(), category_id: oocCatId, title: "[FiveM] Beneficii", slug: "beneficii", description: "Informații despre pachete, VIP și alte avantaje pe server.", icon: "💎", order_index: 3 },
    { id: crypto.randomUUID(), category_id: oocCatId, title: "Sugestii și Feedback", slug: "sugestii", description: "Ajută-ne să modelăm viitorul FLOW propunând idei noi.", icon: "💡", order_index: 4 },
    { id: crypto.randomUUID(), category_id: oocCatId, title: "Discuții Generale", slug: "discutii-generale", description: "Discuții libere (Free Chat) și subiecte diverse legate de comunitate.", icon: "💬", order_index: 5 },
    { id: crypto.randomUUID(), category_id: icCatId, title: "[FiveM] Poliția Română", slug: "politia-romana", description: "Secția de poliție Los Santos. Aplicații și aviziere oficiale.", icon: "🚔", order_index: 1 },
    { id: crypto.randomUUID(), category_id: icCatId, title: "[FiveM] Spitalul General", slug: "spitalul-general", description: "Departamentul medical al orașului. Informații și recrutări.", icon: "🏥", order_index: 2 },
    { id: crypto.randomUUID(), category_id: icCatId, title: "[FiveM] Syndicate Business", slug: "syndicate-business", description: "Centrul de afaceri, aplicatii si dezvoltare economica.", icon: "💼", order_index: 3 }
  ];

  await db.insert(forums).values(forumsList);
}
