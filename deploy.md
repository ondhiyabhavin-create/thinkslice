# Deploying ThinSLICE (static export)

This project is designed to be exported as a static site using `next export`.

Build and export:

```bash
npm run build
npm run export
```

The `out/` directory produced by `next export` contains the static site. You can deploy the `out/` folder to Netlify, GitHub Pages, or any static host.

Netlify

- Connect your repo to Netlify and set build command: `npm run build && npm run export` and publish directory: `out`.

Vercel (static)

- Vercel supports Next.js apps directly. If you want a static export, set the build command to `npm run build && npm run export` and output directory to `out`.

Notes

- Many UI features (3D viewer, Framer Motion animations) rely on client-side libraries. If `node_modules` are not present on the server, the static `out/` will still serve the pre-built client JS bundles created at build time.
- To re-add 3D and animation dependencies (removed locally to simplify test installation), run:

```bash
npm install three @react-three/fiber @react-three/drei framer-motion lucide-react --save
```

If you have CI or hosting that requires exact versions, pin versions in `package.json` before deploy.
# Deploying ThinSLICE (static)

ThinSLICE is built as a static export. After `npm run build` and `npm run export` an `out/` directory is produced that can be deployed to any static hosting provider.

Netlify

- Create a new site and point the deploy directory to `out/`.
- Build command: `npm run build && npm run export`.

Vercel

- Vercel supports Next.js directly; set the framework to "Next.js" and set the output directory to `out` or use the static export option.

That's it — this is a static-only frontend with no server-side APIs.
