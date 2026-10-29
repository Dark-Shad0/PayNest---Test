export type ProductId = 'send' | 'receive' | 'save' | 'business';

export type Route = 'home' | 'products' | 'help';

export interface ProductDef {
  id: ProductId;
  label: string;
  tagline: string;
  description: string;
  icon: 'send' | 'receive' | 'save' | 'business';
  benefits: string[];
  steps: { title: string; detail: string }[];
  faq: { q: string; a: string }[];
}

export interface ChatMessage {
  id: string;
  from: 'paynest' | 'user';
  text?: string;
  kind?: 'text' | 'action' | 'success' | 'error' | 'input';
}
