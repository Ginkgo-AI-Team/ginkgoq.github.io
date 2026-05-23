import { siteConfig } from "../config/site.config";

const pageModules = import.meta.glob('../pages/**/*.astro', { eager: true });

type NavLink = {
  href: string;
  label: string;
};

function slugToLabel(route: string) {
  const override = siteConfig.nav.labels[route as keyof typeof siteConfig.nav.labels];
  if (override) return override;

  const label = route
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .split('/')
    .map((segment) =>
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join(' / ');

  return label || 'Home';
}

function normalizeRoute(filePath: string) {
  let route = filePath
    .replace('../pages', '')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '/');
  
  // Ensure all routes except root have trailing slashes
  if (route !== '/' && !route.endsWith('/')) {
    route += '/';
  }
  
  return route || '/';
}

const order = siteConfig.nav.order;

export const navLinks: NavLink[] = Object.keys(pageModules)
  .map((filePath) => ({
    href: normalizeRoute(filePath),
    label: slugToLabel(normalizeRoute(filePath)),
  }))
  .filter((page) => page.href !== '/' && !page.href.includes('[') && !page.href.includes('404'))
  .sort((a, b) => {
    const aIndex = order.indexOf(a.href);
    const bIndex = order.indexOf(b.href);
    if (aIndex !== bIndex) return aIndex - bIndex;
    return a.label.localeCompare(b.label);
  });
