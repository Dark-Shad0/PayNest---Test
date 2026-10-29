import { useEffect, useState } from 'react';
import {
  Send, Download, PiggyBank, Store, ArrowUpRight, ArrowDownLeft,
  Check, Search, Bell, Wifi, BatteryFull, Signal,
} from 'lucide-react';
import type { ProductId } from '@/types';

interface PhoneMockupProps {
  variant?: ProductId;
  floatNotifications?: boolean;
  className?: string;
}

const notifs = [
  { id: 'n1', name: 'Ama K.', text: 'Sent you GHS 50.00', amount: '+50.00', dir: 'in' as const, delay: '0s' },
  { id: 'n2', name: 'Kwame B.', text: 'You sent GHS 120.00', amount: '-120.00', dir: 'out' as const, delay: '1.2s' },
  { id: 'n3', name: 'Saving goal', text: 'Added GHS 30.00', amount: '+30.00', dir: 'in' as const, delay: '2.4s' },
];

export function PhoneMockup({ variant = 'send', floatNotifications = false, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Floating notifications for hero */}
      {floatNotifications && (
        <div className="absolute -left-4 top-20 z-20 hidden w-56 sm:block">
          {notifs.map((n, i) => (
            <FloatingNotif key={n.id} notif={n} index={i} />
          ))}
        </div>
      )}

      <div className="relative mx-auto w-[290px] sm:w-[320px]">
        {/* Phone frame */}
        <div className="relative rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-lift">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-ink" />
          {/* Screen */}
          <div className="relative h-[600px] overflow-hidden rounded-[2.1rem] bg-background">
            <StatusBar />
            <div className="h-full overflow-y-auto no-scrollbar pb-20">
              {variant === 'send' && <SendScreen />}
              {variant === 'receive' && <ReceiveScreen />}
              {variant === 'save' && <SaveScreen />}
              {variant === 'business' && <BusinessScreen />}
            </div>
            <BottomNav active={variant} />
          </div>
        </div>
        {/* Side buttons */}
        <div className="absolute -right-1 top-32 h-16 w-1 rounded-full bg-ink/80" />
        <div className="absolute -left-1 top-24 h-10 w-1 rounded-full bg-ink/80" />
        <div className="absolute -left-1 top-40 h-14 w-1 rounded-full bg-ink/80" />
      </div>

      {floatNotifications && (
        <div className="absolute -right-3 bottom-28 z-20 hidden w-52 sm:block">
          <BalanceCard />
        </div>
      )}
    </div>
  );
}

function FloatingNotif({ notif, index }: { notif: typeof notifs[number]; index: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 400 + index * 900 + parseFloat(notif.delay) * 500);
    return () => clearTimeout(t);
  }, [index, notif.delay]);

  return (
    <div
      className={`mb-3 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/95 p-3 shadow-lift backdrop-blur">
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${notif.dir === 'in' ? 'bg-primary-50 text-primary' : 'bg-amber-50 text-amber-600'}`}>
          {notif.dir === 'in' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">{notif.name}</p>
          <p className="truncate text-[11px] text-muted">{notif.text}</p>
        </div>
      </div>
    </div>
  );
}

function BalanceCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-lift animate-float-in">
      <p className="text-xs font-medium text-muted">Available balance</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink">GHS 3,240.50</p>
      <div className="mt-3 flex gap-2">
        <div className="flex flex-1 items-center justify-center gap-1 rounded-full bg-primary-50 py-1.5 text-xs font-semibold text-primary">
          <ArrowUpRight className="h-3 w-3" /> Send
        </div>
        <div className="flex flex-1 items-center justify-center gap-1 rounded-full bg-accent py-1.5 text-xs font-semibold text-ink">
          <Download className="h-3 w-3" /> Add
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-ink">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <BatteryFull className="h-4 w-4" />
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: ProductId }) {
  const items: { id: ProductId; icon: typeof Send }[] = [
    { id: 'send', icon: Send },
    { id: 'receive', icon: Download },
    { id: 'save', icon: PiggyBank },
    { id: 'business', icon: Store },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-surface px-4 py-3">
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.id;
        return (
          <div key={it.id} className="flex flex-col items-center gap-1">
            <div className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${isActive ? 'bg-primary text-white' : 'text-muted'}`}>
              <Icon className="h-4 w-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-3">
      <div>
        <p className="text-xs text-muted">{subtitle}</p>
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      </div>
      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-50 text-primary">
        <Bell className="h-4 w-4" />
      </div>
    </div>
  );
}

/* ---------- Send screen ---------- */
function SendScreen() {
  return (
    <div className="px-5 pt-2">
      <AppHeader title="Send money" subtitle="Hi, Adwoa" />
      <div className="mt-4 rounded-2xl bg-primary p-4 text-white">
        <p className="text-xs text-white/70">Available balance</p>
        <p className="font-display text-2xl font-bold">GHS 3,240.50</p>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2.5">
        <Search className="h-4 w-4 text-muted" />
        <span className="text-sm text-muted">Search name or @handle</span>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Recent</p>
      <div className="mt-2 space-y-2">
        {[
          { name: 'Ama Kofi', handle: '@amak', initials: 'AK', color: 'bg-primary' },
          { name: 'Kwame Boateng', handle: '@kboat', initials: 'KB', color: 'bg-accent-dark' },
          { name: 'Akos Mensah', handle: '@akos', initials: 'AM', color: 'bg-primary-400' },
        ].map((r) => (
          <div key={r.handle} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-2.5">
            <div className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white ${r.color}`}>
              {r.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{r.name}</p>
              <p className="truncate text-xs text-muted">{r.handle}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted" />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-surface p-4">
        <p className="text-xs text-muted">Amount</p>
        <p className="font-display text-2xl font-bold text-ink">GHS 150.00</p>
        <p className="mt-1 text-xs text-muted">To @amak · Ama Kofi</p>
        <button className="btn-accent mt-3 w-full text-sm">Confirm & send</button>
      </div>
    </div>
  );
}

/* ---------- Receive screen ---------- */
function ReceiveScreen() {
  return (
    <div className="px-5 pt-2">
      <AppHeader title="Receive" subtitle="Your handle" />
      <div className="mt-4 rounded-2xl border border-border bg-surface p-4 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-primary">
          <span className="font-display text-xl font-bold text-white">@adwoa</span>
        </div>
        <p className="mt-3 text-xs text-muted">Show this handle to get paid</p>
        <button className="btn-primary mt-3 w-full text-sm">Share handle</button>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Recent payments</p>
      <div className="mt-2 space-y-2">
        {[
          { name: 'Yaw Serw.', note: 'Rent split', amt: '75.00', time: '2h ago' },
          { name: 'Mensima A.', note: 'Lunch', amt: '40.00', time: '5h ago' },
          { name: 'Kofi A.', note: 'Service', amt: '300.00', time: '1d ago' },
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-50 text-primary">
              <ArrowDownLeft className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
              <p className="truncate text-xs text-muted">{p.note}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">+{p.amt}</p>
              <p className="text-[10px] text-muted">{p.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface p-4">
        <p className="text-xs font-semibold text-ink">Request payment</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 rounded-full border border-border px-3 py-2 text-sm text-muted">GHS amount</div>
          <button className="btn-accent px-4 py-2 text-sm">Request</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Save screen ---------- */
function SaveScreen() {
  const goal = 2400;
  const saved = 1450;
  const pct = Math.round((saved / goal) * 100);
  return (
    <div className="px-5 pt-2">
      <AppHeader title="Savings" subtitle="Your goals" />
      <div className="mt-4 rounded-2xl bg-primary p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70">New phone</p>
            <p className="font-display text-xl font-bold">GHS {saved.toLocaleString()}</p>
            <p className="text-xs text-white/70">of GHS {goal.toLocaleString()} goal</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-ink">
            <PiggyBank className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-right text-xs text-white/70">{pct}% there</p>
      </div>

      <button className="btn-accent mt-3 w-full text-sm">Add GHS 50 to goal</button>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Other goals</p>
      <div className="mt-2 space-y-2">
        {[
          { name: 'Rent fund', saved: 1200, goal: 3000 },
          { name: 'Holiday', saved: 800, goal: 2000 },
        ].map((g) => {
          const p = Math.round((g.saved / g.goal) * 100);
          return (
            <div key={g.name} className="rounded-xl border border-border bg-surface p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">{g.name}</p>
                <p className="text-xs text-muted">{p}%</p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-50">
                <div className="h-full rounded-full bg-primary" style={{ width: `${p}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted">GHS {g.saved.toLocaleString()} of {g.goal.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Business screen ---------- */
function BusinessScreen() {
  return (
    <div className="px-5 pt-2">
      <AppHeader title="Business" subtitle="Today" />
      <div className="mt-4 rounded-2xl bg-primary p-4 text-white">
        <p className="text-xs text-white/70">Today's takings</p>
        <p className="font-display text-2xl font-bold">GHS 1,840.00</p>
        <p className="mt-1 text-xs text-accent">+12% vs yesterday</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-xs text-muted">Payments</p>
          <p className="font-display text-lg font-bold text-ink">24</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-xs text-muted">Avg sale</p>
          <p className="font-display text-lg font-bold text-ink">GHS 76</p>
        </div>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Recent sales</p>
      <div className="mt-2 space-y-2">
        {[
          { item: 'Hair product', cust: 'Walk-in', amt: '120.00' },
          { item: 'Phone repair', cust: '@yaw', amt: '250.00' },
          { item: 'Soft drinks', cust: 'Walk-in', amt: '35.00' },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-ink">
              <Check className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{s.item}</p>
              <p className="truncate text-xs text-muted">{s.cust}</p>
            </div>
            <p className="text-sm font-bold text-primary">+{s.amt}</p>
          </div>
        ))}
      </div>
      <button className="btn-primary mt-3 w-full text-sm">Share payment link</button>
    </div>
  );
}
