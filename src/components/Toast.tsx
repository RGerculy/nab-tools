import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import './Toast.css';

export function ToastHost() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ message: string }>).detail;
      setMessage(detail.message);
      setVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), 2000);
    };
    window.addEventListener('app:toast', handler);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('app:toast', handler);
    };
  }, []);

  return (
    <div className={`toast-host ${visible ? 'visible' : ''}`} role="status" aria-live="polite">
      <Check size={16} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
