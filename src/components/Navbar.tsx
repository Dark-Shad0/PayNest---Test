import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import type { Route } from '@/types';

interface NavbarProps {
  route: Route;
  navigate: (to: Route) => void;
}

const links: { label: string; to: Route }[] = [
  { label: 'Home', to: 'home' },
  { label: 'Products', to: 'products' },
  { label: 'Help', to: 'help' },
];

export function Navbar({ route, navigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (to: Route) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/95 backdrop-blur shadow-lift' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <button onClick={() => go('home')} className="shrink-0" aria-label="PayNest home">
          <Logo variant="light" />
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.to}
              onClick={() => go(l.to)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                route === l.to ? 'bg-white/15 text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => go('products')} className="text-white/80 hover:text-white rounded-full px-4 py-2 text-sm font-medium">
            About
          </button>
          <button onClick={() => go('products')} className="btn-accent ml-2 text-sm">
            Get Started
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden">
          <div className="mx-3 mb-3 rounded-3xl border border-white/10 bg-primary-700 p-3 shadow-lift">
            {links.map((l) => (
              <button
                key={l.to}
                onClick={() => go(l.to)}
                className={`block w-full rounded-2xl px-4 py-3 text-left text-base font-medium text-white transition-colors ${
                  route === l.to ? 'bg-white/15' : 'hover:bg-white/10'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => go('products')} className="block w-full rounded-2xl px-4 py-3 text-left text-base font-medium text-white/80 hover:bg-white/10 hover:text-white">
              About
            </button>
            <button onClick={() => go('products')} className="btn-accent mt-2 w-full">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
