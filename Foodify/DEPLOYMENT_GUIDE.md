# 🚀 Foodify Frontend Deployment Guide (Vercel + Railway Backend)

This guide provides step-by-step instructions to deploy the **Foodify** React + Vite frontend to **Vercel** and connect it to your Django backend hosted on **Railway**.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Configuring Environment Variables](#2-configuring-environment-variables)
3. [Deploying Frontend to Vercel](#3-deploying-frontend-to-vercel)
4. [Configuring CORS on Railway Backend](#4-configuring-cors-on-railway-backend)
5. [SPA Routing Setup (Already Handled)](#5-spa-routing-setup)
6. [Verification & Testing](#6-verification--testing)

---

## 1. Prerequisites

- A **GitHub / GitLab / Bitbucket** account with your `Foodify` repository pushed.
- A **Vercel** account ([https://vercel.com](https://vercel.com)).
- Your **Railway Backend URL** (e.g., `https://foodify-backend-production.up.railway.app`).

---

## 2. Configuring Environment Variables

In your local project, API calls use `import.meta.env.VITE_API_BASE_URL`.

When deploying on Vercel:
- **Variable Name:** `VITE_API_BASE_URL`
- **Value:** Your live Railway backend domain (e.g., `https://your-app-name.up.railway.app` without a trailing slash `/`).

---

## 3. Deploying Frontend to Vercel

### Method A: Via Vercel Dashboard (Recommended)

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** → **"Project"**.
2. Select your **GitHub repository** (`Foodify`).
3. In the **Configure Project** screen:
   - **Root Directory:** `./` *(leave default / empty, as `package.json` is at the root of the repository)*
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Expand the **Environment Variables** section:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend.up.railway.app` (Replace with your actual Railway backend URL)
   - Click **Add**.
5. Click **"Deploy"**.

---

### Method B: Via Vercel CLI

If you prefer using the command line:

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Log in to Vercel
vercel login

# 3. Deploy to production
vercel --prod
```

During CLI setup, supply the environment variable:
```bash
vercel env add VITE_API_BASE_URL production
```

---

## 4. Configuring CORS on Railway Backend

Since your frontend will run on a domain like `https://foodify-app.vercel.app` and your backend is on Railway, browser cross-origin security (CORS) requires backend permission.

In your **Django Backend** (`settings.py`):

```python
# 1. Make sure django-cors-headers is installed and enabled in INSTALLED_APPS & MIDDLEWARE

# 2. Add your Vercel URL to CORS_ALLOWED_ORIGINS:
CORS_ALLOWED_ORIGINS = [
    "https://foodify-app.vercel.app",  # Replace with your exact Vercel deployment URL
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Or for testing:
# CORS_ALLOW_ALL_ORIGINS = True
```

After modifying `settings.py`, push changes to GitHub so Railway automatically redeploys your backend.

---

## 5. SPA Routing Setup

Single Page Applications (SPAs) built with `react-router-dom` require all incoming paths (e.g., `/orders/track`, `/cart`, `/checkout`) to be redirected to `index.html`.

A `vercel.json` file has already been added to the root directory:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This prevents 404 errors when refreshing sub-routes directly in the browser.

---

## 6. Verification & Testing

Once deployment completes:

1. **Test Homepage & Data Fetching:** Verify restaurants and categories load from the Railway backend.
2. **Test Authentication:** Try Login / Signup modals to ensure JWT tokens are retrieved.
3. **Test Direct URL Navigation:** Refresh `/orders/track` or `/cart` to confirm `vercel.json` rewrites are routing properly.
4. **Test Error & 404 Pages:**
   - Visit an invalid route (`https://your-app.vercel.app/random-path`) to test the **404 Not Found Page**.
   - Visit `https://your-app.vercel.app/simulate-error` to test the **Error Boundary & 500 Error Page**.

---

🎉 **Congratulations! Your Foodify application is fully deployed and connected!**
