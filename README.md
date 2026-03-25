# Welcome to your Lovable project

## Deployment

The Vite base path is configurable through the `VITE_BASE_PATH` environment variable. It defaults to `./` so built assets load correctly whether the app is served at the domain root or a sub-path. Set `VITE_BASE_PATH=/tfi-on-the-go/` before building if you are deploying to GitHub Pages under `/tfi-on-the-go/`. For root or Capacitor-hosted deployments, keep the default and run `npm run build`.
