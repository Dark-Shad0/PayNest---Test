import { useMemo, useState } from 'react';
import {
  Search, ChevronDown, ArrowRight, MessageSquare, X, Mail, Phone, MapPin,
} from 'lucide-react';
import type { Route } from '@/types';
import {
  articles, categories, contactChannels, type HelpArticle, type CategoryId,
} from '@/data/help';

interface HelpProps {
  navigate: (to: Route) => void;
}

const popularIds = ['a1', 's1', 'r1', 'sv1', 'sec1'];

export function Help({ navigate }: HelpProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = activeCategory === 'all' || a.category === activeCategory;
      const matchesQuery =
        q === '' ||
        a.question.toLowerCase().includes(q) ||
        a.answer.toLowerCase().includes(q) ||
        categories.find((c) => c.id === a.category)?.label.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCategory]);

  const popular = articles.filter((a) => popularIds.includes(a.id));
  const hasQuery = query.trim().length > 0;
  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-primary pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
            Help Center
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/75">
            Search our support topics or browse by category. We've got answers to the questions we hear most.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-7 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for help — e.g. 'send money', 'reset password'"
                aria-label="Search help topics"
                className="w-full rounded-full border border-border bg-surface py-3.5 pl-12 pr-12 text-ink shadow-lift outline-none transition-colors focus:border-primary"
              />
              {hasQuery && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-primary-50 hover:text-primary"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular (only when no search) */}
      {!hasQuery && activeCategory === 'all' && (
        <section className="py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="font-display text-xl font-bold text-ink">Popular questions</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((a) => (
                <ArticleCard key={a.id} article={a} onOpen={() => setOpenId(a.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category filter + results */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2.5">
            <CategoryChip
              label="All topics"
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c.id}
                label={c.label}
                active={activeCategory === c.id}
                onClick={() => setActiveCategory(c.id)}
              />
            ))}
          </div>

          {/* Category description */}
          {activeCat && (
            <p className="mt-4 text-sm text-muted animate-fade-in">{activeCat.description}</p>
          )}

          {/* Results count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-muted">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
              {hasQuery && ` for "${query.trim()}"`}
            </p>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="mt-4 space-y-3">
              {filtered.map((a) => (
                <FaqRow
                  key={a.id}
                  article={a}
                  open={openId === a.id}
                  onToggle={() => setOpenId((prev) => (prev === a.id ? null : a.id))}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              query={query}
              onReset={() => {
                setQuery('');
                setActiveCategory('all');
              }}
            />
          )}
        </div>
      </section>

      {/* Contact channels */}
      <section className="bg-primary-50/60 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <span className="section-eyebrow">Still stuck?</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Talk to us
            </h2>
            <p className="mx-auto mt-3 max-w-md text-lg text-muted">
              Can't find what you need? Our team is here to help.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {contactChannels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div key={ch.label} className="card p-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">{ch.label}</h3>
                  {ch.href ? (
                    <a
                      href={ch.href}
                      className="mt-1 block text-lg font-semibold text-primary hover:underline"
                    >
                      {ch.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-lg font-semibold text-ink">{ch.value}</p>
                  )}
                  <p className="mt-1 text-sm text-muted">{ch.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Contact details card */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="rounded-3xl bg-primary p-7 text-white sm:p-9">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent text-ink">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">PayNest Support</h3>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm text-white/80">14 Oxford Street, Osu, Accra, Ghana</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm text-white/80">+233 30 123 4567</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm text-white/80">hello@paynest.gh</span>
                </div>
              </div>
              <p className="mt-5 text-xs text-white/40">
                Contact details are fictional placeholders, not verified business information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary-400/30 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-lg text-white/75">
                Explore everything PayNest can do for you.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button onClick={() => navigate('products')} className="btn-accent w-full sm:w-auto">
                  Explore products
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => navigate('home')} className="btn-outline w-full border-white/20 text-white hover:border-white hover:text-white sm:w-auto">
                  Back to home
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== Category chip ===== */
function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-[0.97] ${
        active
          ? 'border-transparent bg-primary text-white shadow-soft'
          : 'border-border bg-surface text-ink hover:border-primary hover:text-primary'
      }`}
    >
      {label}
    </button>
  );
}

/* ===== Article card (popular) ===== */
function ArticleCard({ article, onOpen }: { article: HelpArticle; onOpen: () => void }) {
  const cat = categories.find((c) => c.id === article.category);
  return (
    <button
      onClick={onOpen}
      className="card group p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <span className="chip">{cat?.label}</span>
      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink group-hover:text-primary">
        {article.question}
      </h3>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Read answer
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}

/* ===== Expandable FAQ row ===== */
function FaqRow({
  article,
  open,
  onToggle,
}: {
  article: HelpArticle;
  open: boolean;
  onToggle: () => void;
}) {
  const cat = categories.find((c) => c.id === article.category);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          {cat && (
            <span className="mt-0.5 hidden shrink-0 sm:inline-flex">
              <span className="chip whitespace-nowrap">{cat.label}</span>
            </span>
          )}
          <span className="font-display text-base font-semibold text-ink">{article.question}</span>
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
          <p className="px-5 pb-5 pl-5 text-sm leading-relaxed text-muted sm:pl-[4.5rem]">
            {article.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== Empty state ===== */
function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="mt-6 rounded-3xl border border-dashed border-border bg-surface p-12 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 text-primary">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">No results found</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
        We couldn't find any articles matching{query ? ` "${query}"` : ' your filter'}. Try a different search term or browse all topics.
      </p>
      <button onClick={onReset} className="btn-outline mt-5 text-sm">
        Clear and show all
      </button>
    </div>
  );
}
