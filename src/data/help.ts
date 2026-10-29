import {
  Send, Download, PiggyBank, Store, ShieldCheck, User, CreditCard, AlertTriangle,
} from 'lucide-react';
import type { ProductId } from '@/types';
import type { LucideIcon } from 'lucide-react';

export interface HelpArticle {
  id: string;
  category: CategoryId;
  question: string;
  answer: string;
}

export type CategoryId = 'send' | 'receive' | 'save' | 'business' | 'account' | 'security';

export interface HelpCategory {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const categories: HelpCategory[] = [
  {
    id: 'account',
    label: 'Getting started',
    icon: User,
    color: 'bg-primary text-white',
    description: 'Set up your account and find your way around.',
  },
  {
    id: 'send',
    label: 'Sending money',
    icon: Send,
    color: 'bg-primary text-white',
    description: 'Transfer money to friends, family, and vendors.',
  },
  {
    id: 'receive',
    label: 'Receiving money',
    icon: Download,
    color: 'bg-accent text-ink',
    description: 'Get paid and track incoming payments.',
  },
  {
    id: 'save',
    label: 'Saving',
    icon: PiggyBank,
    color: 'bg-primary-400 text-white',
    description: 'Set goals and grow your money.',
  },
  {
    id: 'business',
    label: 'Business tools',
    icon: Store,
    color: 'bg-primary text-white',
    description: 'Accept payments and review your takings.',
  },
  {
    id: 'security',
    label: 'Account safety',
    icon: ShieldCheck,
    color: 'bg-primary text-white',
    description: 'Keep your account and money protected.',
  },
];

export const articles: HelpArticle[] = [
  // Account
  {
    id: 'a1',
    category: 'account',
    question: 'How do I create a PayNest account?',
    answer: 'Open the app, tap Get Started, and enter your phone number and name. You\'ll choose a @handle that others can use to pay you. The whole process takes about two minutes.',
  },
  {
    id: 'a2',
    category: 'account',
    question: 'What is a @handle and why do I need one?',
    answer: 'Your @handle is your PayNest address — like @adwoa. Instead of sharing long bank account numbers, you give people your handle and they can send you money instantly.',
  },
  {
    id: 'a3',
    category: 'account',
    question: 'Can I use PayNest without a bank account?',
    answer: 'Yes. You can send and receive money within PayNest using your phone number and @handle. Adding a bank account or card is optional for topping up or withdrawing.',
  },
  {
    id: 'a4',
    category: 'account',
    question: 'How do I add money to my PayNest balance?',
    answer: 'Tap Add money on your home screen, choose a top-up method (card or bank transfer), and confirm the amount. The money appears in your balance right away.',
  },

  // Send
  {
    id: 's1',
    category: 'send',
    question: 'How do I send money to someone?',
    answer: 'Tap Send, search for the person by name, @handle, or phone number, enter the amount in GHS, and confirm. You\'ll see a summary before the money moves.',
  },
  {
    id: 's2',
    category: 'send',
    question: 'Is sending money instant?',
    answer: 'Payments between PayNest users are designed to arrive instantly. Transfers to external banks or wallets depend on the receiving institution but typically settle in seconds to a few minutes.',
  },
  {
    id: 's3',
    category: 'send',
    question: 'Can I cancel a transfer after sending?',
    answer: 'Once you confirm a transfer it moves right away — that\'s why the confirmation screen shows every detail before you tap send. Always review the recipient and amount carefully.',
  },
  {
    id: 's4',
    category: 'send',
    question: 'What happens if I send to the wrong person?',
    answer: 'Double-check the recipient name and @handle on the confirmation screen before sending. If you believe you sent money to the wrong person, contact support immediately so we can look into it.',
  },

  // Receive
  {
    id: 'r1',
    category: 'receive',
    question: 'How do I receive money from someone?',
    answer: 'Share your @handle or phone number with the sender. They enter it in their PayNest app, confirm the amount, and the money lands in your balance. You\'ll get a notification when it arrives.',
  },
  {
    id: 'r2',
    category: 'receive',
    question: 'Can I request a specific amount from someone?',
    answer: 'Yes. Tap Receive, create a payment request with an amount and a note, then share the link with the person who owes you. They confirm and you\'re notified when it\'s paid.',
  },
  {
    id: 'r3',
    category: 'receive',
    question: 'Do I get notified when money arrives?',
    answer: 'Yes — you receive a notification the moment a payment lands in your balance. You can also review every incoming payment in your transaction history.',
  },

  // Save
  {
    id: 'sv1',
    category: 'save',
    question: 'How do I set a savings goal?',
    answer: 'Open the Save tab, tap New goal, give it a name (like "New phone"), and set a target amount in GHS. Your progress bar starts climbing as soon as you add money.',
  },
  {
    id: 'sv2',
    category: 'save',
    question: 'Can I have multiple savings goals at once?',
    answer: 'Yes. You can create separate goals for different things — for example, one for rent and one for a device — and track each one independently.',
  },
  {
    id: 'sv3',
    category: 'save',
    question: 'Can I withdraw money from a savings goal?',
    answer: 'Yes. Tap any goal and move money back to your main balance. The progress bar updates instantly to reflect the change.',
  },

  // Business
  {
    id: 'b1',
    category: 'business',
    question: 'How do I accept payments as a business?',
    answer: 'Turn on Business Tools in your app, then share a payment link or show a QR code to your customer. They confirm and the money lands in your balance.',
  },
  {
    id: 'b2',
    category: 'business',
    question: 'Can I see my daily takings?',
    answer: 'Yes. The business dashboard shows your total takings for the day, the number of payments, and your average sale. You can also view weekly trends.',
  },
  {
    id: 'b3',
    category: 'business',
    question: 'Can I see which products sold best?',
    answer: 'Yes. The merchant summary groups your payments by product or service so you can quickly spot what\'s moving and what isn\'t.',
  },

  // Security
  {
    id: 'sec1',
    category: 'security',
    question: 'How do I keep my account safe?',
    answer: 'Use a strong, unique password, turn on any extra sign-in checks available in your settings, and never share your password or one-time codes with anyone — not even someone claiming to be from PayNest.',
  },
  {
    id: 'sec2',
    category: 'security',
    question: 'What should I do if I see a payment I don\'t recognise?',
    answer: 'Review your transaction history regularly. If you spot something unfamiliar, contact support right away so we can investigate and help secure your account.',
  },
  {
    id: 'sec3',
    category: 'security',
    question: 'Will PayNest ever ask for my password?',
    answer: 'No. PayNest will never ask for your password, PIN, or one-time verification codes. If someone asks for these, they are not from PayNest — contact us immediately.',
  },
];

export const contactChannels = [
  {
    icon: AlertTriangle,
    label: 'Urgent help',
    value: '+233 30 123 4567',
    sub: 'Mon–Sat, 8am–8pm GMT',
    href: 'tel:+233301234567',
  },
  {
    icon: Send,
    label: 'Email us',
    value: 'hello@paynest.gh',
    sub: 'We reply within one business day',
    href: 'mailto:hello@paynest.gh',
  },
  {
    icon: CreditCard,
    label: 'Visit us',
    value: '14 Oxford Street, Osu, Accra',
    sub: 'Osu, Accra, Ghana',
    href: null,
  },
];

export const productIconMap: Record<ProductId, LucideIcon> = {
  send: Send,
  receive: Download,
  save: PiggyBank,
  business: Store,
};
