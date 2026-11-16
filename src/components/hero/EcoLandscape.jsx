// Keep the legacy extension as a compatibility entry point. Vite resolves
// `.jsx` before `.tsx` for extensionless imports, so this must forward to the
// new organic SVG illustration instead of rendering the old geometric scene.
export { default } from "./EcoLandscape.tsx";
