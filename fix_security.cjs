const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\lib\\api', 'profile.server.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const updateProfileOld = `  .handler(async ({ data }) => {
    const updateData: any = { updated_at: new Date() };
    if (data.displayName !== undefined) updateData.display_name = data.displayName;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.characterName !== undefined) updateData.character_name = data.characterName;
    if (data.faction !== undefined) updateData.faction = data.faction;
    if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;

    await db.update(profiles).set(updateData).where(eq(profiles.id, data.userId));
    return { success: true };
  });`;

const updateProfileNew = `  .handler(async ({ data }) => {
    const currentProfile = await db.query.profiles.findFirst({
      where: eq(profiles.id, data.userId),
    });

    const restrictedRoles = ["fondator", "moderator", "administrator", "admin", "staff", "helper", "owner", "manager"];
    const isCurrentlyStaff = currentProfile?.faction && restrictedRoles.some(r => currentProfile.faction!.toLowerCase().includes(r));
    const isAttemptingStaff = data.faction && restrictedRoles.some(r => data.faction!.toLowerCase().includes(r));

    if (!isCurrentlyStaff && isAttemptingStaff) {
      throw new Error("Eroare de securitate: Nu ai permisiunea de a-ți seta un grad administrativ!");
    }

    const updateData: any = { updated_at: new Date() };
    if (data.displayName !== undefined) updateData.display_name = data.displayName;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.characterName !== undefined) updateData.character_name = data.characterName;
    if (data.faction !== undefined) updateData.faction = data.faction;
    if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;

    await db.update(profiles).set(updateData).where(eq(profiles.id, data.userId));
    return { success: true };
  });`;

content = content.replace(updateProfileOld, updateProfileNew);

const updateSyncOld = `  .handler(async ({ data }) => {
    await db.update(profiles).set({
      ...data.syncData,
      fivem_connected: true,
      fivem_synced_at: new Date()
    }).where(eq(profiles.id, data.userId));
    return { success: true };
  });`;

const updateSyncNew = `  .handler(async ({ data }) => {
    const currentProfile = await db.query.profiles.findFirst({
      where: eq(profiles.id, data.userId),
    });

    const restrictedRoles = ["fondator", "moderator", "administrator", "admin", "staff", "helper", "owner", "manager"];
    const isCurrentlyStaff = currentProfile?.faction && restrictedRoles.some(r => currentProfile.faction!.toLowerCase().includes(r));

    let finalSyncData = { ...data.syncData };

    if (isCurrentlyStaff && finalSyncData.faction) {
       delete finalSyncData.faction;
    }
    
    if (!isCurrentlyStaff && finalSyncData.faction) {
       const isAttemptingStaff = restrictedRoles.some(r => finalSyncData.faction.toLowerCase().includes(r));
       if (isAttemptingStaff) {
           delete finalSyncData.faction;
       }
    }

    await db.update(profiles).set({
      ...finalSyncData,
      fivem_connected: true,
      fivem_synced_at: new Date()
    }).where(eq(profiles.id, data.userId));
    return { success: true };
  });`;

content = content.replace(updateSyncOld, updateSyncNew);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed profile.server.ts security roles.');
