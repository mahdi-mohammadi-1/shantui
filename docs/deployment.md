# Deployment notes

This prototype uses locale-prefixed client routes such as `/en-af/` and `/fa-af/equipment/`. Configure the host to serve `index.html` for unknown paths so browser refreshes and direct links reach the client router. Keep static asset requests, including `/images/`, served normally.

The preview remains `noindex, nofollow` by default. For a deliberate production build, set both `VITE_SITE_URL` to the real HTTPS origin and `VITE_PUBLISH_READY=true`, then run `npm run build` and `npm run seo:generate` (PowerShell: `$env:VITE_SITE_URL='https://your-real-domain.example'; $env:VITE_PUBLISH_READY='true'; npm run build; npm run seo:generate`). The generator writes `public/sitemap.xml` and an allowlisting `public/robots.txt` only when both values are valid. With either value absent or invalid it removes the sitemap and writes a disallowing robots file.
