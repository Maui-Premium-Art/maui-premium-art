# Supabase Setup — Feature #41

## 1. Create Project
Go to https://supabase.com and create a new project.

## 2. Get Credentials
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- Service Role Key (Settings → API) → `SUPABASE_SERVICE_ROLE_KEY`
- Add both to `.env.local`

## 3. Run SQL (SQL Editor in Supabase Dashboard)

```sql
CREATE TABLE artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  x_handle TEXT,
  instagram_handle TEXT,
  portfolio_url TEXT,
  bio TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  consent_public_display BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for email lookups
CREATE INDEX idx_artists_email ON artists(email);

-- Index for status filtering (admin queue)
CREATE INDEX idx_artists_status ON artists(status);

-- Row Level Security
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read (API routes use service key)
CREATE POLICY "Service role full access" ON artists
  FOR ALL USING (auth.role() = 'service_role');
```

## 4. Discord Webhook (optional)
Create a webhook in #content channel → add URL to `DISCORD_CONTENT_WEBHOOK_URL` in `.env.local`
