-- Designated Admins auto-assignment trigger on auth signup
CREATE OR REPLACE FUNCTION public.handle_designated_admin_roles()
RETURNS TRIGGER AS $$
DECLARE
  v_role public.app_role;
BEGIN
  IF lower(NEW.email) = 'sirojbekmuxtorov74@gmail.com' THEN
    v_role := 'super_admin';
  ELSIF lower(NEW.email) IN ('toxirovsurat96@gmail.com', '21buxgalter@gmail.com') THEN
    v_role := 'admin';
  ELSE
    v_role := 'customer';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, v_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_admin_roles ON auth.users;
CREATE TRIGGER on_auth_user_created_admin_roles
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_designated_admin_roles();
