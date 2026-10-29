interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink';
  return (
    <span className={`inline-flex items-center gap-2 font-display font-extrabold ${textColor} ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent shadow-soft" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#0E1A15" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h12" />
          <path d="M10 6l6 6-6 6" />
        </svg>
      </span>
      <span className="text-xl tracking-tight">PayNest</span>
    </span>
  );
}
