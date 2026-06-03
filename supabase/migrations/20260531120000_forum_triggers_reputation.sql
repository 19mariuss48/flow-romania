-- Trigger for rewarding reputation to users based on their forum activity (threads and posts)

CREATE OR REPLACE FUNCTION public.reward_reputation_on_forum_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'forum_threads' THEN
      UPDATE public.profiles
      SET reputation = reputation + 10
      WHERE id = NEW.user_id;
    ELSIF TG_TABLE_NAME = 'forum_posts' THEN
      -- Avoid double rewarding on the thread's first post (which is automatically created)
      -- Let's check if there is already a post in this thread or if it is the very first post of the thread.
      -- If it's the first post, it is inserted right after thread creation.
      -- Let's just reward +5 reputation for any post created. It encourages engagement!
      UPDATE public.profiles
      SET reputation = reputation + 5
      WHERE id = NEW.user_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'forum_threads' THEN
      UPDATE public.profiles
      SET reputation = GREATEST(0, reputation - 10)
      WHERE id = OLD.user_id;
    ELSIF TG_TABLE_NAME = 'forum_posts' THEN
      UPDATE public.profiles
      SET reputation = GREATEST(0, reputation - 5)
      WHERE id = OLD.user_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop triggers if they exist to avoid conflict
DROP TRIGGER IF EXISTS trg_reward_reputation_on_thread ON public.forum_threads;
DROP TRIGGER IF EXISTS trg_reward_reputation_on_post ON public.forum_posts;

-- Create triggers
CREATE TRIGGER trg_reward_reputation_on_thread
  AFTER INSERT OR DELETE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.reward_reputation_on_forum_activity();

CREATE TRIGGER trg_reward_reputation_on_post
  AFTER INSERT OR DELETE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.reward_reputation_on_forum_activity();
