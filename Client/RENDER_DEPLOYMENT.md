# Deploying PDF-SHALA to Render

This guide explains how to deploy the PDF-SHALA application to Render.

## Prerequisites

- A Render account (sign up at [render.com](https://render.com))
- Your project code pushed to a Git repository (GitHub, GitLab, etc.)

## Frontend Deployment (React App)

### Option 1: Deploy via the Render Dashboard

1. Log in to your Render dashboard
2. Click on "New" and select "Static Site"
3. Connect your Git repository
4. Configure your site with the following settings:
   - **Name**: `pdf-shala-client` (or any name you prefer)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add the environment variable:
   - `SERVER_API` = `https://pdf-shala-api.onrender.com` (or your API URL)
6. Click "Create Static Site"

### Option 2: Deploy via render.yaml (Recommended)

1. Ensure the `render.yaml` file is in your repository
2. In your Render dashboard, click "New" and select "Blueprint"
3. Connect your Git repository
4. Render will automatically detect the YAML configuration and deploy your services
5. Review the settings and click "Apply"

## Backend Deployment (API Server)

If you haven't already deployed your backend API:

1. In your Render dashboard, click "New" and select "Web Service"
2. Connect your API repository
3. Configure the service:
   - **Name**: `pdf-shala-api`
   - **Runtime**: Node.js (or whatever your backend uses)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or your start command)
4. Add necessary environment variables for your backend
5. Click "Create Web Service"

## Configuring Custom Domain (Optional)

1. In your Render dashboard, select your deployed service
2. Go to the "Settings" tab
3. Under "Custom Domain", click "Add Custom Domain"
4. Follow the instructions to configure your domain with Render

## Troubleshooting

### Common Issues:

1. **Build failures**: Check the build logs in Render for specific errors
2. **API connection errors**: Verify the `SERVER_API` is correctly set and your API is running
3. **Page not found errors**: Ensure your routes configuration is correct in `render.yaml`

### CORS Issues:

If you encounter CORS errors, ensure your backend allows requests from your frontend domain:

```javascript
// In your backend API
app.use(cors({
  origin: 'https://your-render-frontend-url.onrender.com'
}));
```

## Continuous Deployment

Render automatically deploys new changes when you push to your repository. To manually deploy:

1. Go to your service in the Render dashboard
2. Click the "Manual Deploy" button
3. Select "Deploy latest commit" or "Clear build cache & deploy"

## Monitoring

Render provides logs and metrics for your deployed services:

1. Go to your service in the Render dashboard
2. Click the "Logs" tab to view application logs
3. Use the "Metrics" tab to monitor performance and resource usage 