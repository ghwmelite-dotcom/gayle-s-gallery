-- Gayle's Gallery Storage Buckets
-- Run this in your Supabase SQL Editor AFTER 001_initial_schema.sql

-- ============================================
-- CREATE STORAGE BUCKETS
-- ============================================

-- Private bucket for original (unwatermarked) images
INSERT INTO storage.buckets (id, name, public)
VALUES ('originals', 'originals', FALSE);

-- Public bucket for watermarked display images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', TRUE);

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Originals bucket: Only admins can access
CREATE POLICY "Admins can upload originals"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'originals' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can view originals"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'originals' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can delete originals"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'originals' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Gallery bucket: Admins can upload, anyone can view
CREATE POLICY "Admins can upload to gallery"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'gallery' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Anyone can view gallery images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'gallery' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
