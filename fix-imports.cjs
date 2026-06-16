const fs = require('fs');
const files = [
  'src/components/ForumIndex.tsx', 
  'src/components/SiteHeader.tsx', 
  'src/routes/admin.tsx', 
  'src/routes/forum.$forumSlug.tsx', 
  'src/routes/forum.new-topic.$forumSlug.tsx', 
  'src/routes/forum.thread.$threadId.tsx', 
  'src/routes/profile.tsx'
];
files.forEach(f => { 
  try { 
    const data = fs.readFileSync(f, 'utf8'); 
    fs.writeFileSync(f, data.replace(/\.functions/g, '.server')); 
  } catch(e){
    console.error(e);
  } 
});
