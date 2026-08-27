import { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function shift(text: string, n: number): string {
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch === ch.toLowerCase() ? 97 : 65;
    const code = ch.charCodeAt(0) - base;
    return String.fromCharCode(((code + n) % 26 + 26) % 26 + base);
  });
}

export function CaesarCipher() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('The quick brown fox jumps over the lazy dog');
  const [shiftBy, setShiftBy] = useState(3);
  const [copied, setCopied] = useState(false);

  const output = shift(input, mode === 'encode' ? shiftBy : -shiftBy);

  const copy = async () => {
    await copyText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="tabs" role="tablist">
          <button className={`tab ${mode === 'encode' ? 'active' : ''}`} onClick={() => setMode('encode')} role="tab" aria-selected={mode === 'encode'}>Encode</button>
          <button className={`tab ${mode === 'decode' ? 'active' : ''}`} onClick={() => setMode('decode')} role="tab" aria-selected={mode === 'decode'}>Decode</button>
        </div>
        <button className="btn secondary" onClick={() => { setMode(m => (m === 'encode' ? 'decode' : 'encode')); }} aria-label="Swap direction"><ArrowLeftRight size={16} /></button>
      </div>

      <div className="field">
        <label htmlFor="caesar-in">{mode === 'encode' ? 'Plain text' : 'Encoded text'}</label>
        <textarea id="caesar-in" className="input" value={input} onChange={e => setInput(e.target.value)} spellCheck={false} />
      </div>

      <div className="field">
        <label htmlFor="caesar-shift">Shift — {shiftBy}{mode === 'decode' ? ` (decoding = −${shiftBy})` : ''}</label>
        <div className="range-row">
          <input id="caesar-shift" type="range" min={1} max={25} value={shiftBy} onChange={e => setShiftBy(Number(e.target.value))} />
          <span className="range-value">{shiftBy}</span>
        </div>
        <div className="tabs" role="tablist" style={{ marginTop: 8 }}>
          {[3, 13, 15, 21].map(s => (
            <button key={s} className={`tab ${shiftBy === s ? 'active' : ''}`} onClick={() => setShiftBy(s)} role="tab" aria-selected={shiftBy === s}>Shift {s}{s === 13 ? ' (ROT13)' : ''}</button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Output</label>
        <div className="output" style={{ maxHeight: 'none' }}>{output}</div>
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
        </div>
      </div>

      <div className="alert info">
        The Caesar cipher shifts each letter by N positions. ROT13 (shift 13) is its own inverse — encoding and decoding are identical. Letters only; digits and punctuation pass through unchanged. This is a toy cipher for fun, never for real security.
      </div>
    </div>
  );
}
