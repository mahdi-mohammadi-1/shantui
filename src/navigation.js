import { useEffect, useLayoutEffect, useState } from 'react';

function readLocation(fallback) {
  const match = location.pathname.match(/^\/(en|fa)-af(?:\/|$)/);
  const locale = match?.[1] || fallback;
  const path = match ? location.pathname.slice(match[0].length) : location.pathname.slice(1);
  const segments = path.split('/').filter(Boolean);
  return { locale, page: segments[0] || 'home', slug: segments[1] || '', segments, pathname: location.pathname, search: location.search, hash: location.hash };
}

export function useSiteNavigation(fallback) {
  const [route, setRoute] = useState(() => readLocation(fallback));
  function navigate(url, replace = false) {
    const target = new URL(url, location.origin);
    if (target.origin !== location.origin) return;
    if (target.pathname + target.search + target.hash === location.pathname + location.search + location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    history[replace ? 'replaceState' : 'pushState']({}, '', target.pathname + target.search + target.hash);
    setRoute(readLocation(fallback));
  }
  useEffect(() => {
    if (location.pathname === '/') {
      history.replaceState({}, '', `/${fallback}-af/${location.search}${location.hash}`);
      setRoute(readLocation(fallback));
    }
    const pop = () => setRoute(readLocation(fallback));
    const click = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const target = new URL(anchor.href, location.origin);
      if (target.origin !== location.origin || !/^\/(en|fa)-af(?:\/|$)/.test(target.pathname)) return;
      if (target.pathname === location.pathname && target.search === location.search && target.hash) return;
      event.preventDefault();
      navigate(target.href);
    };
    window.addEventListener('popstate', pop);
    document.addEventListener('click', click);
    return () => { window.removeEventListener('popstate', pop); document.removeEventListener('click', click); };
  }, []);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = route.hash && document.getElementById(route.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      document.querySelector('main')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [route.pathname, route.search]);
  const href = (path = '', params) => `/${route.locale}-af/${path ? `${path.replace(/^\/+|\/+$/g, '')}/` : ''}${params ? `?${new URLSearchParams(params)}` : ''}`;
  return { route, navigate, href };
}
