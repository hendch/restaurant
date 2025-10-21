# Supabase Database Setup Guide

This guide will help you set up Supabase for your restaurant dashboard application.

## Step 1: Create Supabase Project

1. **Go to Supabase**: Visit [supabase.com](https://supabase.com)
2. **Sign up/Login**: Create an account or sign in
3. **Create New Project**:
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - **Name**: `restaurant-dashboard` (or your preferred name)
     - **Database Password**: Create a strong password (save this!)
     - **Region**: Choose closest to your users
   - Click "Create new project"

## Step 2: Get Your Project Credentials

Once your project is created:

1. **Go to Settings** → **API**
2. **Copy these values** (you'll need them for environment variables):
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 3: Set Up Database Schema

### Option A: Use SQL Editor (Recommended)

1. **Go to SQL Editor** in your Supabase dashboard
2. **Create a new query** and run this SQL:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('owner', 'marketing', 'franchise', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create restaurants table (if needed)
CREATE TABLE public.restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on restaurants
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Create policies for restaurants
CREATE POLICY "Users can view restaurants they own" ON public.restaurants
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert restaurants they own" ON public.restaurants
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update restaurants they own" ON public.restaurants
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete restaurants they own" ON public.restaurants
  FOR DELETE USING (auth.uid() = owner_id);
```

### Option B: Use Table Editor

1. **Go to Table Editor** in your Supabase dashboard
2. **Create tables manually**:
   - `profiles` table with columns: id, email, full_name, role, created_at, updated_at
   - `restaurants` table with columns: id, name, owner_id, location, created_at, updated_at

## Step 4: Configure Authentication

1. **Go to Authentication** → **Settings**
2. **Configure Site URL**:
   - Add your deployment URL (e.g., `https://your-app.vercel.app`)
   - Add local development URL: `http://localhost:8080`
3. **Configure Redirect URLs**:
   - Add: `https://your-app.vercel.app/auth/callback`
   - Add: `http://localhost:8080/auth/callback`

## Step 5: Set Up Environment Variables

### For Local Development:
Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
VITE_PBI_OWNER_ORG_URL=your_powerbi_owner_dashboard_url
VITE_PBI_MARKETING_ORG_URL=your_powerbi_marketing_dashboard_url
VITE_PBI_FRANCHISE_ORG_URL=your_powerbi_franchise_dashboard_url
```

### For Production (Vercel/Netlify):
Add these environment variables in your deployment platform dashboard.

## Step 6: Test Your Setup

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test authentication**:
   - Go to `/auth` page
   - Try signing up with a new account
   - Check if the user appears in your Supabase dashboard

3. **Check database**:
   - Go to Supabase dashboard → Table Editor
   - Verify that new users appear in the `profiles` table

## Step 7: Update Your App (if needed)

Your app should work with the current setup, but you might want to:

1. **Update user roles** in the database
2. **Add more tables** for your specific use case
3. **Customize authentication** settings

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your environment variables
2. **"User not found"**: Check if the user was created in the profiles table
3. **"Permission denied"**: Check your RLS policies
4. **CORS errors**: Make sure your site URL is configured in Supabase

### Useful Commands:

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- View all policies
SELECT * FROM pg_policies;

-- Check user profiles
SELECT * FROM public.profiles;
```

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Configure database schema
3. ✅ Set up authentication
4. ✅ Configure environment variables
5. ✅ Test locally
6. ✅ Deploy to production
7. ✅ Configure production environment variables

Your restaurant dashboard should now be fully functional with Supabase!
