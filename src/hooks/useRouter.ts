import { useEffect, useState, useCallback } from 'react';
import type { Route } from '@/types';

function parseHash(): { route: Route; hash: string } {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [route] = raw.split('?');
  if (route === 'products') return { route: 'products', hash: raw };
  if (route === 'help') return { route: 'help', hash: raw };
  return { route: 'home', hash: raw };
}

export function useRouter() {
  const [state, setState] = useState(() => parseHash());

  useEffect(() => {
    const onChange = () => setState(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((to: Route) => {
    const target = to === 'home' ? '#/' : `#/${to}`;
    if (window.location.hash === target) {
      setState(parseHash());
    } else {
      window.location.hash = target;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route: state.route, navigate };
}
