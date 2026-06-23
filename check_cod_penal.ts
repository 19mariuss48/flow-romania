import { db } from './src/db/index';
import { siteContent } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    const result = await db.select().from(siteContent).where(eq(siteContent.id, 'cod_penal')).limit(1);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
}

main();
