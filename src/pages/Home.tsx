import {
  Send, Download, PiggyBank, Store, ArrowRight, ShieldCheck, Zap, Receipt,
  CheckCircle2, MousePointerClick, ListChecks, ArrowUpRight, TrendingUp,
  Lock, Smartphone, Eye,
} from 'lucide-react';
import { PhoneMockup } from '@/components/PhoneMockup';
import type { Route } from '@/types';

interface HomeProps {
  navigate: (to: Route) => void;
}

export function Home({ navigate }: HomeProps) {
  return (
    <div className="overflow-hidden">
      <Hero navigate={navigate} />
      <TrustStrip />
      <ProductIntro navigate={navigate} />
      <HowItWorks />
      <BusinessFeature />
      <Security />
      <FinalCTA navigate={navigate} />
    </div>
  );
}

/* ===== 1. Hero ===== */
function Hero({ navigate }: { navigate: (to: Route) => void }) {
  return (
    <section className="relative bg-primary pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-10 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Now live in Accra
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Money moves better with PayNest.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-white/75 lg:mx-0">
            Send money, receive payments, save for what matters, and run your business — all from one friendly app. No long forms. No stress.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <button onClick={() => navigate('products')} className="btn-accent w-full sm:w-auto">
              Get started for free
            </button>
            <button onClick={() => navigate('products')} className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white">
              Explore our products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="relative">
          <PhoneMockup variant="send" floatNotifications />
        </div>
      </div>
    </section>
  );
}

/* ===== 2. Trust strip ===== */
function TrustStrip() {
  const items = [
    { icon: Zap, title: 'Fast transfers', text: 'Money arrives in seconds, not hours.' },
    { icon: Receipt, title: 'Clear history', text: 'Every transaction, neatly organised.' },
    { icon: Store, title: 'Tools for business', text: 'Collect and review your daily takings.' },
  ];
  return (
    <section className="border-b border-border bg-background py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className="flex items-start gap-3.5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">{it.title}</h3>
                  <p className="mt-0.5 text-sm text-muted">{it.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== 3. Product introduction ===== */
function ProductIntro({ navigate }: { navigate: (to: Route) => void }) {
  const cards = [
    { id: 'send', icon: Send, title: 'Send', text: 'Pay anyone by @handle or phone in seconds.' },
    { id: 'receive', icon: Download, title: 'Receive', text: 'Share your handle and get paid instantly.' },
    { id: 'save', icon: PiggyBank, title: 'Save', text: 'Set a goal and watch it grow, one tap at a time.' },
    { id: 'business', icon: Store, title: 'Business Tools', text: 'Accept payments and review your takings.' },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Products</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Everything you need, in one app
          </h2>
          <p className="mt-3 text-lg text-muted">
            Four ways to move money. Each one designed to feel simple and fast.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => navigate('products')}
                className="group card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== 4. How it works ===== */
function HowItWorks() {
  const steps = [
    { icon: MousePointerClick, title: 'Choose an action', text: 'Tap Send, Receive, Save, or Business from the home screen.' },
    { icon: ListChecks, title: 'Confirm the details', text: 'Enter the amount and recipient. Review a clear summary.' },
    { icon: CheckCircle2, title: 'Review your transaction', text: 'Get a confirmation and a tidy record in your history.' },
  ];
  return (
    <section className="bg-primary-50/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <span className="section-eyebrow">How it works</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Three steps, every time
          </h2>
        </div>

        {/* Visual progression */}
        <div className="relative mt-14">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-border md:block" />
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 md:block">
            <div className="h-full w-1/2 bg-primary" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative text-center">
                  <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary text-white shadow-lift">
                    <Icon className="h-7 w-7" />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-accent font-display text-xs font-bold text-ink">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted">{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== 5. Business feature ===== */
function BusinessFeature() {
  const bars = [60, 80, 45, 95, 70, 110, 85];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow">For business</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Run your trade from your pocket
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Traders and small businesses can accept payments by link or QR, then review daily takings and top customers in a simple dashboard. No spreadsheets, no fuss.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Collect payments with a shareable link',
                'See your takings for the day at a glance',
                'Know your best-selling products',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-ink">{t}</span>
                </li>
              ))}
            </ul>
            <button className="btn-primary mt-7">Learn about Business Tools</button>
          </div>

          {/* Dashboard preview */}
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">This week</p>
                <h3 className="font-display text-lg font-bold text-ink">Takings summary</h3>
              </div>
              <span className="chip"><Store className="h-3.5 w-3.5 text-primary" /> Demo data</span>
            </div>

            <div className="mt-4 rounded-2xl bg-primary p-4 text-white">
              <p className="text-xs text-white/70">Total this week</p>
              <p className="font-display text-2xl font-bold">GHS 12,480</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-accent">
                <TrendingUp className="h-3.5 w-3.5" /> 18% up on last week
              </p>
            </div>

            {/* Bar chart */}
            <div className="mt-5 flex h-28 items-end justify-between gap-2">
              {bars.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-lg bg-primary-100 transition-all duration-500"
                    style={{ height: `${h}%`, backgroundColor: i === 5 ? '#0B6B4F' : '#D2E9E1' }}
                  />
                  <span className="text-[10px] font-medium text-muted">{days[i]}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              {[
                { item: 'Hair products', amt: 'GHS 4,200', pct: '34%' },
                { item: 'Phone repair', amt: 'GHS 3,150', pct: '25%' },
                { item: 'Soft drinks', amt: 'GHS 1,830', pct: '15%' },
              ].map((r) => (
                <div key={r.item} className="flex items-center gap-3 rounded-xl border border-border p-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{r.item}</p>
                    <p className="text-xs text-muted">{r.amt}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{r.pct}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted">Fictional data shown for demonstration.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== 6. Security and trust ===== */
function Security() {
  const items = [
    { icon: Lock, title: 'Protect your account', text: 'Use a strong, unique password and turn on extra sign-in checks where available.' },
    { icon: Eye, title: 'Review your activity', text: 'Check your transaction history regularly and flag anything you don\'t recognise.' },
    { icon: Smartphone, title: 'Keep your app updated', text: 'Install updates so you always have the latest protections.' },
    { icon: ShieldCheck, title: 'Never share your details', text: 'PayNest will never ask for your password or one-time codes.' },
  ];
  return (
    <section className="bg-primary-700 py-20 sm:py-24 text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-accent">
            Safety
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Keep your money safe
          </h2>
          <p className="mt-3 text-lg text-white/70">
            A few simple habits go a long way. Here are everyday practices we recommend.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{it.text}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-white/40">
          General safety practices, not verified security certifications or regulatory endorsements.
        </p>
      </div>
    </section>
  );
}

/* ===== 7. Final CTA ===== */
function FinalCTA({ navigate }: { navigate: (to: Route) => void }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary-400/30 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to move money the easy way?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-lg text-white/75">
              Join PayNest and start sending, receiving, and saving in minutes.
            </p>
            <button onClick={() => navigate('products')} className="btn-accent mt-7">
              Get started for free
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
