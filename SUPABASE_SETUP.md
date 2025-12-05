# Supabase Setup Guide

This guide will help you set up Supabase for the BIOSYTEMS application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js 18+ installed
3. npm, yarn, pnpm, or bun package manager

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: biosystems (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be set up (takes a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")
   - **service_role key** (under "Project API keys" - keep this secret!)

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace the placeholder values with your actual Supabase credentials.

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click "Run" to execute the SQL
5. Verify that all tables were created by going to **Table Editor**

## Step 5: Set Up Storage Bucket

1. In your Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Configure the bucket:
   - **Name**: `product-images`
   - **Public bucket**: ✅ Check this (so images can be accessed publicly)
   - **File size limit**: 5MB (or your preference)
   - **Allowed MIME types**: `image/jpeg,image/png,image/webp,image/gif`
4. Click "Create bucket"

### Set Up Storage Policies

1. Click on the `product-images` bucket
2. Go to **Policies** tab
3. Click "New Policy" → "For full customization"
4. Create the following policies:

**Policy 1: Allow public read access**
- Policy name: `Public read access`
- Allowed operation: `SELECT`
- Policy definition:
```sql
bucket_id = 'product-images'
```

**Policy 2: Allow authenticated users to upload**
- Policy name: `Authenticated users can upload`
- Allowed operation: `INSERT`
- Policy definition:
```sql
bucket_id = 'product-images' AND auth.role() = 'authenticated'
```

**Policy 3: Allow users to update their own uploads**
- Policy name: `Users can update their uploads`
- Allowed operation: `UPDATE`
- Policy definition:
```sql
bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]
```

**Policy 4: Allow users to delete their own uploads**
- Policy name: `Users can delete their uploads`
- Allowed operation: `DELETE`
- Policy definition:
```sql
bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]
```

## Step 6: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add your site URL:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/**` and your production URL

3. (Optional) Configure email templates:
   - Go to **Authentication** → **Email Templates**
   - Customize the templates to match your branding

## Step 7: Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Try registering a new user:
   - Go to `http://localhost:3000/register`
   - Fill out the registration form
   - Check your Supabase dashboard → **Authentication** → **Users** to see if the user was created

3. Check the database:
   - Go to **Table Editor** → **profiles**
   - Verify that a profile was created for your new user

## Step 8: Seed Initial Data (Optional)

You can manually add some initial data:

1. **Categories**: Should already be created by the schema.sql script
2. **Test Products**: Add some test products through the supplier dashboard or directly in Supabase
3. **Test Suppliers**: Create supplier accounts and verify them

## Troubleshooting

### Issue: "Invalid API key" error
- **Solution**: Double-check your `.env.local` file has the correct keys
- Make sure you're using `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not the service role key for client-side)

### Issue: "Row Level Security policy violation"
- **Solution**: Check that RLS policies are correctly set up in the schema
- Verify the user is authenticated when trying to access protected data

### Issue: Images not uploading
- **Solution**: 
  - Verify the storage bucket exists and is public
  - Check storage policies are set correctly
  - Ensure file size and MIME type are within limits

### Issue: User profile not created after signup
- **Solution**: 
  - Check the trigger `on_auth_user_created` exists in your database
  - Verify the function `handle_new_user()` is working
  - Check Supabase logs for errors

## Production Deployment

When deploying to production:

1. Update your `.env.local` or environment variables in your hosting platform:
   - Set `NEXT_PUBLIC_SITE_URL` to your production URL
   - Update Supabase redirect URLs to include your production domain

2. Update Supabase settings:
   - Add your production URL to allowed redirect URLs
   - Configure email templates for production

3. Set up database backups:
   - Go to **Settings** → **Database**
   - Enable daily backups

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Support

If you encounter issues:
1. Check the Supabase dashboard logs
2. Check your browser console for errors
3. Verify all environment variables are set correctly
4. Ensure the database schema was applied correctly


