import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/db";
import { forumCategories, forums, forumThreads, forumPosts, profiles } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";

export const getForumStructure = createServerFn({ method: "GET" })
  .handler(async () => {
    const cats = await db.query.forumCategories.findMany({
      orderBy: (cats, { asc }) => [asc(cats.order_index)]
    });
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
    return structured;
  });

export const getForumDetails = createServerFn({ method: "POST" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const forum = await db.query.forums.findFirst({
      where: eq(forums.slug, data.slug)
    });
    return forum || null;
  });

export const getForumThreads = createServerFn({ method: "POST" })
  .inputValidator(z.object({ forumId: z.string() }))
  .handler(async ({ data }) => {
    const threads = await db.query.forumThreads.findMany({
      where: eq(forumThreads.forum_id, data.forumId),
      orderBy: (threads, { desc }) => [desc(threads.is_pinned), desc(threads.created_at)]
    });

    if (threads.length === 0) return [];

    const userIds = [...new Set(threads.map(t => t.user_id))];
    const users = await db.query.profiles.findMany({
      where: inArray(profiles.id, userIds)
    });

    return threads.map(t => {
      const user = users.find(u => u.id === t.user_id);
      return {
        ...t,
        user_name: user?.display_name || user?.username || "Cetățean",
        avatar_url: user?.avatar_url || ""
      };
    });
  });

export const getThreadDetails = createServerFn({ method: "POST" })
  .inputValidator(z.object({ threadId: z.string() }))
  .handler(async ({ data }) => {
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

    return {
      thread: {
        ...thread,
        views_count: thread.views_count + 1,
        user_name: threadUser?.display_name || threadUser?.username || "Cetățean",
        avatar_url: threadUser?.avatar_url || ""
      },
      posts: posts.map(p => {
        const user = users.find(u => u.id === p.user_id);
        return {
          ...p,
          user_name: user?.display_name || user?.username || "Cetățean",
          avatar_url: user?.avatar_url || "",
          rank: user?.faction || "Jucător"
        };
      })
    };
  });

export const createThread = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    forumId: z.string(),
    userId: z.string(),
    title: z.string(),
    content: z.string()
  }))
  .handler(async ({ data }) => {
    const threadId = crypto.randomUUID();
    
    await db.insert(forumThreads).values({
      id: threadId,
      forum_id: data.forumId,
      user_id: data.userId,
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

    return { success: true, threadId };
  });

export const createPost = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    threadId: z.string(),
    userId: z.string(),
    content: z.string()
  }))
  .handler(async ({ data }) => {
    const postId = crypto.randomUUID();
    await db.insert(forumPosts).values({
      id: postId,
      thread_id: data.threadId,
      user_id: data.userId,
      content: data.content
    });

    // Update replies count
    const thread = await db.query.forumThreads.findFirst({
      where: eq(forumThreads.id, data.threadId)
    });
    if (thread) {
      await db.update(forumThreads)
        .set({ replies_count: thread.replies_count + 1 })
        .where(eq(forumThreads.id, data.threadId));
    }

    return { success: true, postId };
  });
