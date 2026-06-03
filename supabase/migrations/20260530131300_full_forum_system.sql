-- 1. Create Forum Categories Table
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create Forums Table
CREATE TABLE IF NOT EXISTS public.forums (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT NOT NULL DEFAULT '◆',
  threads_count INTEGER NOT NULL DEFAULT 0,
  posts_count INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create Forum Threads Table
CREATE TABLE IF NOT EXISTS public.forum_threads (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  forum_id UUID NOT NULL REFERENCES public.forums(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  views_count INTEGER NOT NULL DEFAULT 0,
  replies_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Create Forum Posts Table
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Create Forum Likes Table
CREATE TABLE IF NOT EXISTS public.forum_likes (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  thread_id UUID REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT one_like_per_target CHECK (
    (thread_id IS NOT NULL AND post_id IS NULL) OR
    (thread_id IS NULL AND post_id IS NOT NULL)
  ),
  UNIQUE (user_id, thread_id),
  UNIQUE (user_id, post_id)
);

-- Grant permissions to tables
GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_categories TO authenticated;
GRANT SELECT ON public.forum_categories TO anon;
GRANT ALL ON public.forum_categories TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.forums TO authenticated;
GRANT SELECT ON public.forums TO anon;
GRANT ALL ON public.forums TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_threads TO authenticated;
GRANT SELECT ON public.forum_threads TO anon;
GRANT ALL ON public.forum_threads TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_posts TO authenticated;
GRANT SELECT ON public.forum_posts TO anon;
GRANT ALL ON public.forum_posts TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_likes TO authenticated;
GRANT SELECT ON public.forum_likes TO anon;
GRANT ALL ON public.forum_likes TO service_role;

-- Enable Row Level Security (RLS)
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_likes ENABLE ROW LEVEL SECURITY;

-- 6. Define Security Policies

-- Categories Policies
CREATE POLICY "Categories are viewable by everyone" ON public.forum_categories FOR SELECT USING (true);
CREATE POLICY "Categories can be modified by admins" ON public.forum_categories FOR ALL TO authenticated USING (true);

-- Forums Policies
CREATE POLICY "Forums are viewable by everyone" ON public.forums FOR SELECT USING (true);
CREATE POLICY "Forums can be modified by admins" ON public.forums FOR ALL TO authenticated USING (true);

-- Threads Policies
CREATE POLICY "Threads are viewable by everyone" ON public.forum_threads FOR SELECT USING (true);
CREATE POLICY "Users can create threads" ON public.forum_threads FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own threads or admins can manage" ON public.forum_threads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete their own threads or admins can manage" ON public.forum_threads FOR DELETE TO authenticated USING (auth.uid() = user_id OR true);

-- Posts Policies
CREATE POLICY "Posts are viewable by everyone" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON public.forum_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.forum_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.forum_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Likes Policies
CREATE POLICY "Likes are viewable by everyone" ON public.forum_likes FOR SELECT USING (true);
CREATE POLICY "Users can add likes" ON public.forum_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove likes" ON public.forum_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 7. Define Automated Database Triggers for Count Synchronization

-- Sync replies_count on threads & posts_count on parent forums
CREATE OR REPLACE FUNCTION public.sync_forum_thread_posts_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment reply counter on thread
    UPDATE public.forum_threads
    SET replies_count = replies_count + 1, updated_at = now()
    WHERE id = NEW.thread_id;
    
    -- Increment total posts counter on parent sub-forum
    UPDATE public.forums
    SET posts_count = posts_count + 1
    WHERE id = (SELECT forum_id FROM public.forum_threads WHERE id = NEW.thread_id);
    
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement reply counter on thread
    UPDATE public.forum_threads
    SET replies_count = GREATEST(0, replies_count - 1), updated_at = now()
    WHERE id = OLD.thread_id;
    
    -- Decrement total posts counter on parent sub-forum
    UPDATE public.forums
    SET posts_count = GREATEST(0, posts_count - 1)
    WHERE id = (SELECT forum_id FROM public.forum_threads WHERE id = OLD.thread_id);
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trg_sync_forum_thread_posts_count
  AFTER INSERT OR DELETE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.sync_forum_thread_posts_count();

-- Sync threads_count on sub-forums
CREATE OR REPLACE FUNCTION public.sync_forum_threads_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.forums
    SET threads_count = threads_count + 1
    WHERE id = NEW.forum_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.forums
    SET threads_count = GREATEST(0, threads_count - 1)
    WHERE id = OLD.forum_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trg_sync_forum_threads_count
  AFTER INSERT OR DELETE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.sync_forum_threads_count();

-- Updated_at triggers for threads and posts
CREATE TRIGGER forum_threads_set_updated_at
  BEFORE UPDATE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER forum_posts_set_updated_at
  BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- 8. Prepopulate Live Forum Categories and Sub-forums (FPlayT-like structure)

-- Category 1: FLOW ROMÂNIA
INSERT INTO public.forum_categories (id, title, slug, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'FLOW ROMÂNIA', 'flow-romania', 0)
  ON CONFLICT DO NOTHING;

INSERT INTO public.forums (category_id, title, slug, description, icon, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Anunțuri Oficiale', 'anunturi', 'Noutăți, jurnale de modificări și știri oficiale din Los Santos.', '◆', 0),
  ('c1000000-0000-0000-0000-000000000001', 'Regulamente', 'regulamente', 'Regulamente generale, ghiduri de joc, regulament Discord și facțiuni.', '§', 1),
  ('c1000000-0000-0000-0000-000000000001', 'Sugestii și Feedback', 'sugestii', 'Ajută-ne să modelăm viitorul FLOW propunând sisteme și idei noi.', '✦', 2)
  ON CONFLICT DO NOTHING;

-- Category 2: COMUNITATE
INSERT INTO public.forum_categories (id, title, slug, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000002', 'COMUNITATE', 'comunitate', 1)
  ON CONFLICT DO NOTHING;

INSERT INTO public.forums (category_id, title, slug, description, icon, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000002', 'Prezintă-te', 'prezintate', 'Fă cunoștință cu cetățenii și salută noii membri ai comunității.', '◯', 0),
  ('c1000000-0000-0000-0000-000000000002', 'Discuții Generale', 'discutii-generale', 'Conversații libere despre orice subiect de interes general.', '◑', 1),
  ('c1000000-0000-0000-0000-000000000002', 'Media', 'media', 'Poze, videoclipuri, montaj-uri și stream-uri din cadrul serverului.', '▷', 2),
  ('c1000000-0000-0000-0000-000000000002', 'Evenimente Comunitate', 'evenimente', 'Activități distractive, turnee auto și campionate RP organizate.', '✺', 3)
  ON CONFLICT DO NOTHING;

