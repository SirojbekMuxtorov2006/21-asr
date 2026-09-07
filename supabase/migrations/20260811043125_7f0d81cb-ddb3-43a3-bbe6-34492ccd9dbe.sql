
CREATE POLICY "docs_own_read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'documents' AND (
    (storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid())));
CREATE POLICY "docs_own_insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND (
    (storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid())));
CREATE POLICY "docs_own_delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'documents' AND (
    (storage.foldername(name))[1] = auth.uid()::text OR public.is_admin(auth.uid())));
