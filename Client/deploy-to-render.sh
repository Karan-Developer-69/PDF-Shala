#!/bin/bash

# PDF-SHALA Render Deployment Script

echo "🚀 Preparing PDF-SHALA for Render deployment..."

# Clean up previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf dist
npm run lint

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building for production..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
  echo "✅ Build successful! Your app is ready for deployment."
  echo ""
  echo "To deploy to Render:"
  echo "1. Commit and push these changes to your Git repository"
  echo "2. Go to your Render dashboard (https://dashboard.render.com)"
  echo "3. Create a new static site and connect your repository"
  echo "4. Use 'npm install && npm run build' as the build command"
  echo "5. Set 'dist' as the publish directory"
  echo ""
  echo "Don't forget to set SERVER_API environment variable to your API URL"
  echo ""
else
  echo "❌ Build failed! Check the error messages above."
fi 