-- Fix the overly permissive RLS policy for contact_messages
-- Drop the existing policy and create a more restrictive one
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

-- Allow anyone (including unauthenticated) to submit contact messages but restrict what they can insert
CREATE POLICY "Public can submit contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (
    name IS NOT NULL AND 
    email IS NOT NULL AND 
    message IS NOT NULL
);