import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/** FAQ accordion item (shared by tool pages and blog posts). */
export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <ChevronDown size={18} className="faq-chevron" aria-hidden="true" />
      </button>
      <div className="faq-answer">
        <p>{a}</p>
      </div>
    </div>
  );
}
