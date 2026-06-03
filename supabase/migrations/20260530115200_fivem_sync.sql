-- Add FiveM synchronization columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS fivem_connected BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS fivem_username TEXT,
  ADD COLUMN IF NOT EXISTS fivem_license TEXT,
  ADD COLUMN IF NOT EXISTS fivem_discord_id TEXT,
  ADD COLUMN IF NOT EXISTS fivem_steam_hex TEXT,
  ADD COLUMN IF NOT EXISTS fivem_cash INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fivem_bank INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fivem_job TEXT,
  ADD COLUMN IF NOT EXISTS fivem_playtime INTEGER NOT NULL DEFAULT 0, -- accumulated playtime in minutes
  ADD COLUMN IF NOT EXISTS fivem_character_data JSONB DEFAULT '[]'::jsonb, -- dynamic structure for list of characters/inventory
  ADD COLUMN IF NOT EXISTS fivem_synced_at TIMESTAMPTZ;

-- Add comments for documentation
COMMENT ON COLUMN public.profiles.fivem_connected IS 'Indicates whether the player has linked their FiveM in-game profile';
COMMENT ON COLUMN public.profiles.fivem_username IS 'The linked player Cfx.re or server in-game profile name';
COMMENT ON COLUMN public.profiles.fivem_license IS 'The primary license of the Rockstar Social Club account used by FiveM';
COMMENT ON COLUMN public.profiles.fivem_discord_id IS 'Linked Discord User ID for FiveM in-game and Discord bot guild synchronization';
COMMENT ON COLUMN public.profiles.fivem_steam_hex IS 'Steam Hex ID associated with the FiveM player';
COMMENT ON COLUMN public.profiles.fivem_cash IS 'In-game cash balance on the main character';
COMMENT ON COLUMN public.profiles.fivem_bank IS 'In-game bank balance on the main character';
COMMENT ON COLUMN public.profiles.fivem_job IS 'Current job/faction of the main in-game character';
COMMENT ON COLUMN public.profiles.fivem_playtime IS 'Total accumulated playtime in minutes on the server';
COMMENT ON COLUMN public.profiles.fivem_character_data IS 'Detailed metadata of player characters, assets, and active server stats';
COMMENT ON COLUMN public.profiles.fivem_synced_at IS 'Timestamp of the last server profile sync';
