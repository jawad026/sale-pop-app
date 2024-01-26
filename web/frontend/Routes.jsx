import React, { lazy, Suspense } from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/blog/[id].jsx` matches `/blog/123`
 * * `/pages/[...catchAll].jsx` matches any URL not explicitly matched
 *
 * @param {object} pages value of import.meta.globEager(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
export default function Routes({ pages }) {
  const routes = useRoutes(pages);

  const routeComponents = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

  const NotFound = routes.find(({ path }) => path === '/notFound')?.component;

  return (
    <ReactRouterRoutes>
      {routeComponents}
      {NotFound && <Route path="*" element={<NotFound />} />}
    </ReactRouterRoutes>
  );
}

function useRoutes(pages) {
  const routes = Object.keys(pages).map((key) => {
    const path = normalizePath(key);

    if (!pages[key].default) {
      console.warn(`${key} doesn't export a default React component`);
      return null;
    }

    return {
      path,
      component: pages[key].default,
    };
  }).filter(Boolean); // Filter out null values

  return routes;
}

function normalizePath(key) {
  let path = key
    .replace('./pages', '')
    .replace(/\.(t|j)sx?$/, '')
    .replace(/\/index$/i, '/')
    .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
    .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

  if (path.endsWith('/') && path !== '/') {
    path = path.substring(0, path.length - 1);
  }

  return path;
}
