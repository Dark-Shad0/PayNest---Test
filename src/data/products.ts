import type { ProductDef } from '@/types';

export const products: ProductDef[] = [
  {
    id: 'send',
    label: 'Send',
    tagline: 'Pay anyone in seconds',
    description:
      'Send money to friends, family, or vendors across Ghana with a few taps. Confirm the details, and the money lands instantly — no long account numbers to wrestle with.',
    icon: 'send',
    benefits: [
      'Instant transfers to any PayNest user',
      'Pay by phone number or @handle',
      'Clear confirmation before every send',
      'Full history of every transfer',
    ],
    steps: [
      { title: 'Pick a recipient', detail: 'Search by name, @handle, or phone number.' },
      { title: 'Enter an amount', detail: 'Type the GHS amount and add an optional note.' },
      { title: 'Confirm & send', detail: 'Review the summary, confirm, and the money moves instantly.' },
    ],
    faq: [
      { q: 'Is sending money really instant?', a: 'In this demo, yes — the confirmation appears immediately. Real transfers depend on the recipient\'s bank or wallet, but PayNest is designed to settle most transfers in seconds.' },
      { q: 'Do I need the recipient\'s account number?', a: 'No. You can send to a phone number or PayNest @handle. No long bank digits required.' },
      { q: 'Can I cancel a transfer after sending?', a: 'Once a transfer is confirmed it moves right away. That\'s why the confirmation step shows every detail before you tap send.' },
    ],
  },
  {
    id: 'receive',
    label: 'Receive',
    tagline: 'Get paid without the hassle',
    description:
      'Request a payment or share your handle so anyone can pay you. Track incoming money as it arrives and keep a tidy record of every collection.',
    icon: 'receive',
    benefits: [
      'Send payment requests with an amount',
      'Share your @handle to get paid',
      'See incoming payments in real time',
      'Auto-organise collections by sender',
    ],
    steps: [
      { title: 'Create a request', detail: 'Set the amount and a short note for who owes you.' },
      { title: 'Share the link', detail: 'Send the request by link or @handle in one tap.' },
      { title: 'Get notified', detail: 'You\'re told the moment the payment lands in your balance.' },
    ],
    faq: [
      { q: 'How do people pay me?', a: 'Share your PayNest @handle or a payment request link. The payer confirms and the money arrives in your balance.' },
      { q: 'Can I request money from someone without PayNest?', a: 'They\'ll get a link to pay you. In this demo the payment is simulated, so you\'ll see the success state without a real transfer.' },
      { q: 'Do I see who paid me?', a: 'Yes — every incoming payment shows the sender, amount, and timestamp in your transaction history.' },
    ],
  },
  {
    id: 'save',
    label: 'Save',
    tagline: 'Grow money without thinking about it',
    description:
      'Set a savings goal, watch the progress bar climb, and add money whenever you like. Saving becomes a small, satisfying habit instead of a chore.',
    icon: 'save',
    benefits: [
      'Set a personal savings goal',
      'Track progress with a live bar',
      'Add to your goal in one tap',
      'See how close you are to the finish',
    ],
    steps: [
      { title: 'Name your goal', detail: 'Give your savings goal a name and a target amount in GHS.' },
      { title: 'Add money', detail: 'Top up your goal any time with a quick tap.' },
      { title: 'Reach the target', detail: 'Watch the progress bar fill until you hit your goal.' },
    ],
    faq: [
      { q: 'Can I have more than one goal?', a: 'Yes. You can set separate goals — for example, one for rent and one for a new phone — and track each one independently.' },
      { q: 'Is my savings balance separate?', a: 'In the app, money in a savings goal is set aside from your spendable balance so you don\'t accidentally spend it.' },
      { q: 'Can I withdraw from a goal?', a: 'Yes, you can move money back to your main balance any time. The progress bar updates instantly.' },
    ],
  },
  {
    id: 'business',
    label: 'Business Tools',
    tagline: 'Run your trade from your pocket',
    description:
      'Accept payments from customers, review your daily takings, and understand your business at a glance. A simple dashboard built for traders and small businesses.',
    icon: 'business',
    benefits: [
      'Accept payments by link or QR',
      'Daily and weekly takings summary',
      'See your top customers',
      'Track payments by product or service',
    ],
    steps: [
      { title: 'Share a payment link', detail: 'Send a customer a link or show a QR to collect payment.' },
      { title: 'Collect the payment', detail: 'The customer confirms and the amount lands in your balance.' },
      { title: 'Review your takings', detail: 'Open the dashboard to see your daily summary and trends.' },
    ],
    faq: [
      { q: 'Do I need a separate business account?', a: 'No. Business tools live inside the same PayNest app. Toggle them on when you\'re ready to start collecting from customers.' },
      { q: 'Can I see what sold best?', a: 'Yes. The merchant summary shows your payments grouped by product or service so you can spot what\'s moving.' },
      { q: 'How fast do customer payments arrive?', a: 'Payments are designed to settle instantly so you can close a sale and see the money without waiting.' },
    ],
  },
];

export function getProduct(id: string): ProductDef {
  return products.find((p) => p.id === id) ?? products[0];
}
