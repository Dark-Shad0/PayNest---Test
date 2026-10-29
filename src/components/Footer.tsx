import { Logo } from '@/components/Logo';
import type { Route } from '@/types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  navigate: (to: Route) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-primary-800 text-white/80">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Friendly payments for everyone in Accra and beyond. Send, receive, save, and grow — all from one app.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Product</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><button onClick={() => navigate('products')} className="hover:text-accent">Send</button></li>
              <li><button onClick={() => navigate('products')} className="hover:text-accent">Receive</button></li>
              <li><button onClick={() => navigate('products')} className="hover:text-accent">Save</button></li>
              <li><button onClick={() => navigate('products')} className="hover:text-accent">Business Tools</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><button onClick={() => navigate('home')} className="hover:text-accent">Home</button></li>
              <li><button onClick={() => navigate('products')} className="hover:text-accent">Products</button></li>
              <li><button onClick={() => navigate('products')} className="hover:text-accent">About</button></li>
              <li><button onClick={() => navigate('help')} className="hover:text-accent">Help</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>14 Oxford Street, Osu, Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span>+233 30 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span>hello@paynest.gh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} PayNest. A fictional company for demonstration purposes.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            <span className="cursor-pointer hover:text-accent">Privacy</span>
            <span className="cursor-pointer hover:text-accent">Terms</span>
            <span className="cursor-pointer hover:text-accent">Security</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-white/40">
          Contact details are fictional placeholders, not verified business information.
        </p>
      </div>
    </footer>
  );
}
