# Deployment Guide

This guide will help you deploy your React application to Vercel or Netlify.

## Prerequisites

1. **Environment Variables**: You'll need to set up the following environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon key
   - `VITE_PBI_OWNER_ORG_URL`: Power BI Owner dashboard URL
   - `VITE_PBI_MARKETING_ORG_URL`: Power BI Marketing dashboard URL
   - `VITE_PBI_FRANCHISE_ORG_URL`: Power BI Franchise dashboard URL

## Option 1: Deploy to Vercel (Recommended)

### Steps:
1. **Install Vercel CLI** (optional but recommended):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect it's a Vite project

3. **Set Environment Variables**:
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add all the required environment variables listed above

4. **Deploy**:
   - Vercel will automatically build and deploy your app
   - Your app will be available at `https://your-project-name.vercel.app`

### Manual Deploy with CLI:
```bash
cd org-embed-dash
vercel
# Follow the prompts
vercel --prod
```

## Option 2: Deploy to Netlify

### Steps:
1. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "New site from Git"
   - Connect your repository

2. **Build Settings** (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Set Environment Variables**:
   - Go to Site settings → Environment variables
   - Add all the required environment variables

4. **Deploy**:
   - Netlify will automatically build and deploy
   - Your app will be available at `https://your-site-name.netlify.app`

### Manual Deploy with CLI:
```bash
cd org-embed-dash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod --dir=dist
```

## Configuration Files

The following configuration files have been created for optimal deployment:

- **`vercel.json`**: Vercel-specific configuration with SPA routing
- **`netlify.toml`**: Netlify-specific configuration with redirects and headers

## Important Notes

1. **Environment Variables**: Make sure to set all environment variables in your deployment platform
2. **Power BI URLs**: Ensure your Power BI embedded URLs are publicly accessible
3. **Supabase**: Verify your Supabase project is properly configured for production
4. **CORS**: If you encounter CORS issues, check your Supabase and Power BI CORS settings

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check that all dependencies are in `package.json`
2. **Environment Variables**: Ensure all required variables are set
3. **Routing Issues**: The configuration files handle SPA routing automatically
4. **Power BI Issues**: Verify your Power BI URLs are correct and accessible

### Build Commands:
```bash
# Test build locally
npm run build

# Preview production build
npm run preview
```

## Security Considerations

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Ensure your Supabase RLS policies are properly configured
- Verify Power BI security settings

## Support

If you encounter issues:
1. Check the build logs in your deployment platform
2. Verify all environment variables are set correctly
3. Test the build locally with `npm run build`
4. Check the browser console for client-side errors
