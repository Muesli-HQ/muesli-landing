import React from 'react';
import { renderToString } from 'react-dom/server';
import { App, prerenderRoutes, routeMeta } from './App.jsx';

export { prerenderRoutes };

export function render(pathname = '/') {
  return renderToString(<App pathname={pathname} />);
}

export function getMeta(pathname = '/') {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return routeMeta[normalized] || routeMeta['/'];
}
