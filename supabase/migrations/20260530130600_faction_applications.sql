-- Create faction applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('police', 'medic', 'staff')),
  character_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  playtime_hours INTEGER NOT NULL,
  motivation TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_asteptare' CHECK (status IN ('in_asteptare', 'acceptat', 'respins')),
  admin_response TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT SELECT ON public.applications TO anon;
GRANT ALL ON public.applications TO service_role;

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create Security Policies
CREATE POLICY "Applications are viewable by everyone"
  ON public.applications FOR SELECT USING (true);

CREATE POLICY "Users can insert their own applications"
  ON public.applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications (status/responses can be updated by simulation)"
  ON public.applications FOR UPDATE TO authenticated
  USING (true);

-- Updated_at trigger for applications
CREATE TRIGGER applications_set_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.applications IS 'Recruitment applications and CVs submitted by players for factions and staff roles';
COMMENT ON COLUMN public.applications.type IS 'Target faction/role: police (Poliția Română), medic (S.M.U.R.D.), or staff (Helper/Admin)';
COMMENT ON COLUMN public.applications.status IS 'Current application state: in_asteptare (Pending), acceptat (Accepted), or respins (Rejected)';
COMMENT ON COLUMN public.applications.admin_response IS 'Feedback and official response provided by faction leadership or community admins';
