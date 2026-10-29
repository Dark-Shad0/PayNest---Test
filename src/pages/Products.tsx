import { useEffect, useState } from 'react';
import {
  Send, Download, PiggyBank, Store, ArrowRight, Check, ChevronDown, HelpCircle,
} from 'lucide-react';
import { PhoneMockup } from '@/components/PhoneMockup';
import { ChatDemo } from '@/components/ChatDemo';
import { products, getProduct } from '@/data/products';
import type { ProductId, Route } from '@/types';

interface ProductsProps {
  navigate: (to: Route) => void;
}

const iconMap: Record<ProductId, typeof Send> = {
  send: Send,
  receive: Download,
  save: PiggyBank,
  business: Store,
};

export function Products({ navigate }: ProductsProps) {
  const [activeId, setActiveId] = useState<ProductId>('send');
  const product = getProduct(activeId);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-primary pt-24 pb-16 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
            Products
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            One app. More ways to move.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
            Explore each feature below. Switch between products and watch the preview, steps, and details update instantly.
          </p>
        </div>
      </section>

      {/* Interactive selector + preview */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {products.map((p) => {
              const Icon = iconMap[p.id];
              const isActive = activeId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.97] ${
                    isActive
                      ? 'border-transparent bg-primary text-white shadow-soft'
                      : 'border-border bg-surface text-ink hover:border-primary hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Main content */}
          <div key={activeId} className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            {/* Description + benefits */}
            <div className="order-2 lg:order-1">
              <span className="section-eyebrow">{product.tagline}</span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{product.label}</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{product.description}</p>

              <ul className="mt-6 space-y-3">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 animate-fade-up">
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-ink">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-ink">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button className="btn-accent">
                  Try {product.label}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => navigate('home')} className="btn-outline">
                  Back to home
                </button>
              </div>

              {/* Steps */}
              <div className="mt-10">
                <h3 className="font-display text-lg font-semibold text-ink">How {product.label.toLowerCase()} works</h3>
                <div className="mt-4 space-y-3">
                  {product.steps.map((s, i) => (
                    <div key={s.title} className="flex gap-4 rounded-2xl border border-border bg-surface p-4 transition-shadow hover:shadow-soft animate-fade-up">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-display text-base font-semibold text-ink">{s.title}</h4>
                        <p className="mt-0.5 text-sm text-muted">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="order-1 lg:order-2">
              <div key={`mockup-${activeId}`} className="animate-pop">
                <PhoneMockup variant={activeId} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversational demo */}
      <section className="bg-primary-50/60 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Try it yourself</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Have a quick chat with PayNest
            </h2>
            <p className="mt-3 text-lg text-muted">
              Pick Send, Receive, or Save and walk through a short conversation. We'll guide you each step of the way.
            </p>
          </div>
          <div className="mt-10">
            <ChatDemo />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Questions, answered
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {product.faq.map((item, i) => (
              <FaqItem key={`${activeId}-${i}`} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary-400/30 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Start with {product.label} today
              </h2>
              <p className="mx-auto mt-3 max-w-md text-lg text-white/75">
                Get going in minutes — no paperwork, no waiting.
              </p>
              <button onClick={() => navigate('home')} className="btn-accent mt-7">
                Get started for free
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
          <span className="font-display text-base font-semibold text-ink">{q}</span>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 pl-14 text-sm leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}
