import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
  'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui',
  'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
];

type Mode = 'paragraphs' | 'sentences' | 'words';

function rand(max: number): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

function sentence(): string {
  const len = 8 + rand(10); // 8-17 words
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(WORDS[rand(WORDS.length)]);
  return words.join(' ') + '.';
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generate(mode: Mode, count: number): string {
  if (mode === 'words') {
    const words: string[] = [];
    for (let i = 0; i < count; i++) words.push(WORDS[rand(WORDS.length)]);
    return words.join(' ');
  }
  if (mode === 'sentences') {
    return Array.from({ length: count }, () => capitalize(sentence())).join(' ');
  }
  // paragraphs: 3-6 sentences each
  return Array.from({ length: count }, () =>
    Array.from({ length: 3 + rand(4) }, () => capitalize(sentence())).join(' '),
  ).join('\n\n');
}

export function LoremIpsum() {
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [count, setCount] = useState(3);
  const [text, setText] = useState(() => generate('paragraphs', 3));
  const [copied, setCopied] = useState(false);

  const regen = () => setText(generate(mode, count));

  const copy = async () => {
    await copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="tabs" role="tablist">
          {(['paragraphs', 'sentences', 'words'] as Mode[]).map(m => (
            <button key={m} className={`tab ${mode === m ? 'active' : ''}`} onClick={() => { setMode(m); }} role="tab" aria-selected={mode === m}>{m[0].toUpperCase() + m.slice(1)}</button>
          ))}
        </div>
        <div className="num-row">
          <input type="number" min={1} max={1000} value={count} onChange={e => setCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))} />
        </div>
      </div>

      <div className="row">
        <button className="btn" onClick={regen}><RefreshCw size={16} /> Generate</button>
        <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
      </div>

      <div className="field">
        <label>Output ({text.split(/\s+/).filter(Boolean).length.toLocaleString()} words)</label>
        <div className="output" style={{ maxHeight: 320 }}>{text}</div>
      </div>

      <div className="alert info">
        Lorem ipsum is placeholder text derived from a scrambled passage of Cicero. It has been the design world&apos;s stand-in for real copy since the 1500s. Generated locally in your browser.
      </div>
    </div>
  );
}
