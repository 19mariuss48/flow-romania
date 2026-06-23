import { db } from './src/db/index';
import { forumCategories, forums } from './src/db/schema';

async function main() {
    const categories = await db.select().from(forumCategories);
    const f = await db.select().from(forums);
    console.log("Categories:", categories);
    console.log("Forums:", f);
    process.exit(0);
}

main();
