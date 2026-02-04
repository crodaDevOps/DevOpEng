<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1OUyuOr6qSFMQW8HFlGhfv18ArY80FU7b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

This project is prepared for deployment on Vercel.

1. Connect your repository to Vercel.
2. In the Vercel project settings, add the following Environment Variable:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
3. Vercel will automatically detect the Vite configuration and deploy the app.

The `vercel.json` file is configured to handle client-side routing for Single Page Applications.
