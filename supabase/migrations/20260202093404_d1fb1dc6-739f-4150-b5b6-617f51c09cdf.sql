-- Create storage bucket for complaint images
INSERT INTO storage.buckets (id, name, public)
VALUES ('complaint-images', 'complaint-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload complaint images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'complaint-images' 
  AND auth.uid() IS NOT NULL
);

-- Allow public read access for complaint images
CREATE POLICY "Public read access for complaint images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'complaint-images');

-- Allow users to delete their own complaint images
CREATE POLICY "Users can delete their own complaint images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'complaint-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);