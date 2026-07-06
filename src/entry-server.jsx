import React from 'react';
import { renderToString } from 'react-dom/server';
import { App, prerenderRoutes, routeMeta } from './App.jsx';
import { siteData } from './siteData.js';

export { prerenderRoutes };

export function render(pathname = '/') {
  return renderToString(<App pathname={pathname} />);
}

export function getMeta(pathname = '/') {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const meta = routeMeta[normalized] || routeMeta['/'];
  const isHome = normalized === '/';

  return {
    ...meta,
    ogTitle: meta.ogTitle || meta.title,
    ogDescription: meta.ogDescription || meta.description,
    ogUrl: meta.ogUrl || meta.canonical,
    ogImage: meta.ogImage || (isHome ? `${siteData.ogImageUrl}?v=20260513-2` : siteData.homebrewOgImageUrl),
    ogImageAlt: meta.ogImageAlt || (isHome
      ? 'Muesli: Speech that is free. Speech that is yours.'
      : 'Muesli Homebrew install command over a watercolor Golden Gate Bridge scene.'),
  };
}
