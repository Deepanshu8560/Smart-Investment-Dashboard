# Smart Investment Dashboard - Vercel Deployment Guide

## 🚀 Quick Deploy

### Prerequisites
- [Vercel account](https://vercel.com/signup)
- PostgreSQL database (recommended: [Neon](https://neon.tech/), [Supabase](https://supabase.com/))
- GitHub repository

### Deploy in 3 Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework will auto-detect as **Vite**

3. **Add Environment Variable**
   - In project settings, add:
     - `DATABASE_URL` = your PostgreSQL connection string
   - Click **Deploy**

## 📋 Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Example Value | Required |
|----------|---------------|----------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` | ✅ Yes |
| `NODE_ENV` | `production` | ⚠️ Auto-set |

## 🏗️ What Was Added for Vercel

### New Files Created:
1. **`vercel.json`** - Deployment configuration
2. **`api/index.js`** - Serverless API handler
3. **`.env.example`** - Environment template
4. **`.vercelignore`** - Files to exclude from deployment
5. **`DEPLOYMENT.md`** - This guide

### Updated Files:
- **`.gitignore`** - Added build outputs, env files, Vercel cache

## 🔧 How It Works

```
Frontend (React + Vite)
    ↓ builds to 'dist'
    ↓ served as static files
    
Backend (Express API)
    ↓ wrapped in api/index.js
    ↓ deployed as serverless functions
    ↓ routes: /api/*
```

## ✅ Verification Checklist

After deployment:
- [ ] Visit your deployment URL
- [ ] Test signup/login functionality
- [ ] Check market data loads
- [ ] Test portfolio features
- [ ] Verify trading works

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ETIMEDOUT
```
**Fix:** Verify `DATABASE_URL` in Vercel environment variables

### 404 on API Routes
```
404: /api/market-data not found
```
**Fix:** Ensure `vercel.json` exists with proper routing config

### Build Fails
```
npm ERR! missing script: build
```
**Fix:** Verify `package.json` has `"build": "vite build"`

## 🌐 Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `mydashboard.com`)
3. Update DNS records as instructed
4. Wait for verification (usually < 5 minutes)

## 📊 Free Tier Limits

Vercel Free Tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ✅ CDN globally

## 🔄 Auto-Deploy

After first deployment:
- Every `git push` to main → auto-deploys
- Pull requests → get preview URLs
- Rollback available in dashboard

## 📞 Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Neon Database](https://neon.tech/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html#vercel)

---

**Ready to deploy? Run `vercel` in your terminal or use the Vercel Dashboard!** 🚀
