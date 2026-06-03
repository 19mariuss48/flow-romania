-- 1. Add is_banned to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_banned BOOLEAN NOT NULL DEFAULT false;

-- 2. Create RPC for updating profiles (to bypass RLS for staff)
CREATE OR REPLACE FUNCTION public.admin_update_profile(
  p_target_id UUID,
  p_new_faction TEXT,
  p_new_bio TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_caller_faction TEXT;
BEGIN
  -- Get the caller's faction
  SELECT faction INTO v_caller_faction
  FROM public.profiles
  WHERE id = auth.uid();

  -- Allow update if caller is one of the staff/leadership roles
  IF v_caller_faction IN ('Fondator', 'Administrator', 'Chestor General', 'Director General', 'Moderator') THEN
    UPDATE public.profiles
    SET faction = p_new_faction,
        bio = p_new_bio,
        updated_at = now()
    WHERE id = p_target_id;
  ELSE
    RAISE EXCEPTION 'Insufficient permissions to update profile';
  END IF;
END;
$$;

-- 3. Create RPC for banning users
CREATE OR REPLACE FUNCTION public.admin_ban_user(
  p_target_id UUID,
  p_is_banned BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_caller_faction TEXT;
BEGIN
  -- Get the caller's faction
  SELECT faction INTO v_caller_faction
  FROM public.profiles
  WHERE id = auth.uid();

  -- Allow ban if caller is admin or mod
  IF v_caller_faction IN ('Fondator', 'Administrator', 'Moderator') THEN
    UPDATE public.profiles
    SET is_banned = p_is_banned,
        updated_at = now()
    WHERE id = p_target_id;
  ELSE
    RAISE EXCEPTION 'Insufficient permissions to ban user';
  END IF;
END;
$$;

-- 4. Fix RLS on forum tables to prevent "OR true" exploit
DROP POLICY IF EXISTS "Users can delete their own threads or admins can manage" ON public.forum_threads;
DROP POLICY IF EXISTS "Users can update their own threads or admins can manage" ON public.forum_threads;

CREATE POLICY "Users can update their own threads or admins can manage"
ON public.forum_threads FOR UPDATE TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND faction IN ('Fondator', 'Administrator', 'Moderator', 'Chestor General', 'Director General')
  )
);

CREATE POLICY "Users can delete their own threads or admins can manage"
ON public.forum_threads FOR DELETE TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND faction IN ('Fondator', 'Administrator', 'Moderator')
  )
);

DROP POLICY IF EXISTS "Users can delete their own posts" ON public.forum_posts;
CREATE POLICY "Users can delete their own posts or admins can manage"
ON public.forum_posts FOR DELETE TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND faction IN ('Fondator', 'Administrator', 'Moderator')
  )
);
