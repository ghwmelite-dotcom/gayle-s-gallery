-- Create guestbook table
CREATE TABLE IF NOT EXISTS guestbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  message TEXT NOT NULL CHECK (char_length(message) <= 500),
  emoji VARCHAR(10) DEFAULT '🎨',
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for approved entries
CREATE INDEX IF NOT EXISTS idx_guestbook_approved ON guestbook(is_approved, created_at DESC);

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved entries
CREATE POLICY "Anyone can read approved guestbook entries"
  ON guestbook
  FOR SELECT
  USING (is_approved = true);

-- Policy: Anyone can insert entries
CREATE POLICY "Anyone can create guestbook entries"
  ON guestbook
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only admins can update entries
CREATE POLICY "Admins can update guestbook entries"
  ON guestbook
  FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Policy: Only admins can delete entries
CREATE POLICY "Admins can delete guestbook entries"
  ON guestbook
  FOR DELETE
  USING (is_admin());

-- Create trigger for updated_at
CREATE TRIGGER update_guestbook_updated_at
  BEFORE UPDATE ON guestbook
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT SELECT ON guestbook TO anon;
GRANT INSERT ON guestbook TO anon;
GRANT SELECT, INSERT ON guestbook TO authenticated;
GRANT ALL ON guestbook TO service_role;
