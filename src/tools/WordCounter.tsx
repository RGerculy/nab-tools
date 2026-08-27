import { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

interface Counts {
  words: number;
  chars: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingMinutes: number;
  speakingMinutes: number;
}

function countWords(text: string): number {
  const m = text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu);
  return m ? m.length : 0;
}

function countSentences(text: string): number {
  const m = text.match(/[^.!?…]+[.!?…]+["')\]]*|\S[^.!?…]*$/gu);
  return m ? m.length : 0;
}

function analyze(text: string): Counts {
  const words = countWords(text);
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = countSentences(text);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  const lines = text.length ? text.split('\n').length : 0;
  const readingMinutes = words / 238; // avg adult reading speed
  const speakingMinutes = words / 130; // avg speaking speed
  return { words, chars, charsNoSpaces, sentences, paragraphs, lines, readingMinutes, speakingMinutes };
}

export function WordCounter() {
  const [text, setText] = useState('');

  const counts = useMemo(() => analyze(text), [text]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const cards: Array<{ label: string; value: string }> = [
    { label: 'Words', value: counts.words.toLocaleString() },
    { label: 'Characters', value: counts.chars.toLocaleString() },
    { label: 'Chars (no spaces)', value: counts.charsNoSpaces.toLocaleString() },
    { label: 'Sentences', value: counts.sentences.toLocaleString() },
    { label: 'Paragraphs', value: counts.paragraphs.toLocaleString() },
    { label: 'Lines', value: counts.lines.toLocaleString() },
    { label: 'Reading time', value: counts.readingMinutes < 1 ? '<1 min' : `${Math.ceil(counts.readingMinutes)} min` },
    { label: 'Speaking time', value: counts.speakingMinutes < 1 ? '<1 min' : `${Math.ceil(counts.speakingMinutes)} min` },
  ];

  return (
    <div className="tool-ui">
      <div className="field">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <label htmlFor="wc-text">Your text</label>
          <button className="btn secondary" onClick={copy} disabled={!text}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
        </div>
        <textarea
          id="wc-text"
          className="input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or paste your text here — the counts update live…"
          style={{ minHeight: 220 }}
        />
      </div>

      <div className="count-grid">
        {cards.map(c => (
          <div className="count-card" key={c.label}>
            <div className="num">{c.value}</div>
            <div className="label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="alert info">
        Reading time assumes ~238 words per minute (adult average). Speaking time assumes ~130 wpm.
        All counting happens locally — nothing is transmitted.
      </div>
    </div>
  );
}
