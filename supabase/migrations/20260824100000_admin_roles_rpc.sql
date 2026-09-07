-- Function to safely grant super_admin role with SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.claim_admin_role()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), 'super_admin')
  ON CONFLICT (user_id, role) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END; $$;

GRANT EXECUTE ON FUNCTION public.claim_admin_role() TO authenticated;
