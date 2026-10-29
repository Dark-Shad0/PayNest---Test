import { useEffect, useRef, useState } from 'react';
import {
  Send, Download, PiggyBank, RotateCcw, Check, MessageSquare, AlertCircle, Loader2,
} from 'lucide-react';
import type { ProductId } from '@/types';

type ChatRole = 'paynest' | 'user';
interface Bubble {
  id: string;
  role: ChatRole;
  text: string;
  kind?: 'text' | 'success' | 'error';
}

type DemoId = 'send' | 'receive' | 'save';
type Phase =
  | 'idle'
  | 'send-recipient'
  | 'send-amount'
  | 'send-confirm'
  | 'send-loading'
  | 'send-success'
  | 'receive-amount'
  | 'receive-note'
  | 'receive-loading'
  | 'receive-success'
  | 'save-name'
  | 'save-amount'
  | 'save-loading'
  | 'save-success';

const demos: { id: DemoId; label: string; icon: typeof Send; color: string }[] = [
  { id: 'send', label: 'Send', icon: Send, color: 'bg-primary text-white' },
  { id: 'receive', label: 'Receive', icon: Download, color: 'bg-accent text-ink' },
  { id: 'save', label: 'Save', icon: PiggyBank, color: 'bg-primary-400 text-white' },
];

let bubbleId = 0;
const nextId = () => `b${++bubbleId}`;

export function ChatDemo() {
  const [active, setActive] = useState<DemoId | null>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [bubbles, phase]);

  const reset = () => {
    setActive(null);
    setBubbles([]);
    setPhase('idle');
    setInput('');
    setError('');
    setRecipient('');
    setAmount('');
  };

  const push = (role: ChatRole, text: string, kind?: Bubble['kind']) => {
    setBubbles((prev) => [...prev, { id: nextId(), role, text, kind }]);
  };

  const startDemo = (id: DemoId) => {
    setActive(id);
    setBubbles([]);
    setError('');
    setInput('');
    setRecipient('');
    setAmount('');
    if (id === 'send') {
      setPhase('send-recipient');
      push('paynest', "Let's send some money. Who would you like to send to? Type a name or @handle (e.g. @amak).");
    } else if (id === 'receive') {
      setPhase('receive-amount');
      push('paynest', "Let's create a payment request. How much would you like to request in GHS? (e.g. 75)");
    } else {
      setPhase('save-name');
      push('paynest', "Let's set up a savings goal. What are you saving for? (e.g. New phone)");
    }
  };

  const validateAmount = (val: string): boolean => {
    const n = parseFloat(val);
    return !isNaN(n) && n > 0 && n <= 100000;
  };

  const handleSendFlow = (val: string) => {
    if (phase === 'send-recipient') {
      const trimmed = val.trim();
      if (trimmed.length < 2) {
        setError('Please enter a name or @handle.');
        return;
      }
      setRecipient(trimmed);
      push('user', trimmed);
      setInput('');
      setError('');
      setPhase('send-amount');
      push('paynest', `Great, sending to ${trimmed}. How much in GHS? (e.g. 150)`);
    } else if (phase === 'send-amount') {
      if (!validateAmount(val)) {
        setError('Enter a valid amount in GHS (greater than 0).');
        return;
      }
      setAmount(val);
      push('user', `GHS ${val}`);
      setInput('');
      setError('');
      setPhase('send-confirm');
      push('paynest', `You're sending GHS ${val} to ${recipient}. Type "yes" to confirm.`);
    } else if (phase === 'send-confirm') {
      if (val.trim().toLowerCase() !== 'yes') {
        setError('Type "yes" to confirm, or restart the demo.');
        return;
      }
      push('user', 'yes');
      setInput('');
      setError('');
      setPhase('send-loading');
      push('paynest', 'Sending...', 'text');
      setTimeout(() => {
        setBubbles((prev) => prev.slice(0, -1));
        setPhase('send-success');
        push('paynest', `Done! GHS ${amount} sent to ${recipient}. You'll see it in your history.`, 'success');
      }, 1400);
    }
  };

  const handleReceiveFlow = (val: string) => {
    if (phase === 'receive-amount') {
      if (!validateAmount(val)) {
        setError('Enter a valid amount in GHS (greater than 0).');
        return;
      }
      setAmount(val);
      push('user', `GHS ${val}`);
      setInput('');
      setError('');
      setPhase('receive-note');
      push('paynest', 'What is this request for? (e.g. Rent split)');
    } else if (phase === 'receive-note') {
      const trimmed = val.trim();
      if (trimmed.length < 2) {
        setError('Please add a short note.');
        return;
      }
      push('user', trimmed);
      setInput('');
      setError('');
      setPhase('receive-loading');
      push('paynest', 'Creating your payment request...', 'text');
      setTimeout(() => {
        setBubbles((prev) => prev.slice(0, -1));
        setPhase('receive-success');
        push('paynest', `Your request for GHS ${amount} (${trimmed}) is ready. Share it with your @handle and you'll be notified when paid.`, 'success');
      }, 1400);
    }
  };

  const handleSaveFlow = (val: string) => {
    if (phase === 'save-name') {
      const trimmed = val.trim();
      if (trimmed.length < 2) {
        setError('Give your goal a name.');
        return;
      }
      setRecipient(trimmed);
      push('user', trimmed);
      setInput('');
      setError('');
      setPhase('save-amount');
      push('paynest', `Nice — "${trimmed}". What's your target amount in GHS? (e.g. 2400)`);
    } else if (phase === 'save-amount') {
      if (!validateAmount(val)) {
        setError('Enter a valid target amount in GHS (greater than 0).');
        return;
      }
      setAmount(val);
      push('user', `GHS ${val}`);
      setInput('');
      setError('');
      setPhase('save-loading');
      push('paynest', 'Setting up your goal...', 'text');
      setTimeout(() => {
        setBubbles((prev) => prev.slice(0, -1));
        setPhase('save-success');
        push('paynest', `Your "${recipient}" goal is set for GHS ${val}. Start adding money any time and watch the bar climb!`, 'success');
      }, 1400);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!active || phase === 'idle' || phase.endsWith('-loading') || phase.endsWith('-success')) return;
    const val = input;
    if (active === 'send') handleSendFlow(val);
    else if (active === 'receive') handleReceiveFlow(val);
    else if (active === 'save') handleSaveFlow(val);
  };

  const isDone = phase.endsWith('success');
  const isLoading = phase.endsWith('loading');
  const isWaiting = active !== null && !isDone && !isLoading;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Demo label */}
      <div className="mb-4 flex items-center justify-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
        <AlertCircle className="h-4 w-4" />
        Interactive demo — no real money is transferred.
      </div>

      {/* Action selector */}
      <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
        {demos.map((d) => {
          const Icon = d.icon;
          const isActive = active === d.id;
          return (
            <button
              key={d.id}
              onClick={() => startDemo(d.id)}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.97] disabled:opacity-50 ${
                isActive
                  ? `${d.color} border-transparent shadow-soft`
                  : 'border-border bg-surface text-ink hover:border-primary hover:text-primary'
              }`}
            >
              <Icon className="h-4 w-4" />
              {d.label}
            </button>
          );
        })}
        {active && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </button>
        )}
      </div>

      {/* Chat window */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-primary px-5 py-3.5 text-white">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-ink">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold">PayNest Assistant</p>
            <p className="text-xs text-white/60">{active ? `Demo: ${active}` : 'Choose an action to start'}</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-[340px] space-y-3 overflow-y-auto bg-background px-4 py-5 no-scrollbar sm:px-5">
          {!active && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm text-muted">Pick Send, Receive, or Save above to start a quick demo conversation.</p>
            </div>
          )}

          {bubbles.map((b) => (
            <div
              key={b.id}
              className={`flex ${b.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  b.role === 'user'
                    ? 'rounded-br-md bg-primary text-white'
                    : b.kind === 'success'
                    ? 'rounded-bl-md bg-accent font-medium text-ink'
                    : b.kind === 'error'
                    ? 'rounded-bl-md bg-red-50 text-red-700'
                    : 'rounded-bl-md border border-border bg-surface text-ink'
                }`}
              >
                {b.role === 'paynest' && b.kind === 'success' && (
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b.text}</span>
                  </div>
                )}
                {b.role === 'paynest' && b.kind === 'text' && (
                  <span className="inline-flex items-center gap-2 text-muted">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {b.text}
                  </span>
                )}
                {(b.role === 'user' || (b.role === 'paynest' && !b.kind)) && b.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        {isWaiting && (
          <form onSubmit={handleSubmit} className="border-t border-border bg-surface p-3">
            {error && (
              <p className="mb-2 flex items-center gap-1.5 px-1 text-xs font-medium text-red-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </p>
            )}
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                placeholder="Type your answer..."
                aria-label="Chat input"
                aria-invalid={!!error}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
              />
              <button type="submit" className="btn-primary px-5 py-2.5 text-sm">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {isDone && (
          <div className="border-t border-border bg-surface px-4 py-4 text-center">
            <button onClick={reset} className="btn-outline text-sm">
              <RotateCcw className="h-4 w-4" />
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
