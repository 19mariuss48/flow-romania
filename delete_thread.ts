import { db } from "./src/db";
import { forumThreads } from "./src/db/schema";
import { eq, and, ilike } from "drizzle-orm";

async function main() {
  console.log("Looking for 'Biroul de Reclamatii' in Spitalul General Los Santos...");
  
  // Actually we can just find it by title and forum_slug/forum_id
  const threads = await db.query.forumThreads.findMany();
  
  let deletedCount = 0;
  for (const t of threads) {
    if (t.title && t.title.toLowerCase().includes("reclamatii")) {
      // Find the forum it belongs to
      const forum = await db.query.forums.findFirst({
        where: (forums, { eq }) => eq(forums.id, t.forum_id)
      });
      
      if (forum && forum.title.toLowerCase().includes("spitalul")) {
        console.log(`Deleting thread: ${t.title} (ID: ${t.id}) from ${forum.title}`);
        await db.delete(forumThreads).where(eq(forumThreads.id, t.id));
        deletedCount++;
      }
    }
  }
  
  console.log(`Deleted ${deletedCount} thread(s).`);
  process.exit(0);
}

main().catch(console.error);
