
-- split anon-facing policies so they never need the role helpers
DROP POLICY "services_public_read" ON public.services;
CREATE POLICY "services_anon_read" ON public.services FOR SELECT TO anon USING (is_active);
CREATE POLICY "services_auth_read" ON public.services FOR SELECT TO authenticated
  USING (is_active OR public.is_staff(auth.uid()));

DROP POLICY "news_public_read" ON public.news;
CREATE POLICY "news_anon_read" ON public.news FOR SELECT TO anon USING (is_published);
CREATE POLICY "news_auth_read" ON public.news FOR SELECT TO authenticated
  USING (is_published OR public.is_staff(auth.uid()));

DROP POLICY "reviews_public_read" ON public.reviews;
CREATE POLICY "reviews_anon_read" ON public.reviews FOR SELECT TO anon USING (is_approved);
CREATE POLICY "reviews_auth_read" ON public.reviews FOR SELECT TO authenticated
  USING (is_approved OR user_id = auth.uid() OR public.is_staff(auth.uid()));

-- helper functions must not be directly callable through the API
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.assign_order_number() FROM public, anon, authenticated;
