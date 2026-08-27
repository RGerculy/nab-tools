import { useMemo, useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
// Minimal symbol set accepted by nearly every password policy.
const SIMPLE_SYMBOLS = '!@#$%&?';
// Full symbol set — only for sites that accept everything.
// Excluded from the simple set because some sites reject them:
// ^ * ( ) - _ = + [ ] { } ; : , . < > / | ~ \ " ' and backtick.
const EXTENDED_SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>?/|~';

function randomInt(max: number): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

function generatePassword(length: number, chars: string): string {
  let out = '';
  for (let i = 0; i < length; i++) out += chars[randomInt(chars.length)];
  return out;
}

function entropy(length: number, poolSize: number): number {
  return Math.round(length * Math.log2(poolSize));
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [extendedSymbols, setExtendedSymbols] = useState(false);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>(() => ['']);
  const [copied, setCopied] = useState<string | null>(null);

  const pool = useMemo(() => {
    let p = '';
    if (useUpper) p += UPPER;
    if (useLower) p += LOWER;
    if (useDigits) p += DIGITS;
    if (useSymbols) p += extendedSymbols ? EXTENDED_SYMBOLS : SIMPLE_SYMBOLS;
    return p;
  }, [useUpper, useLower, useDigits, useSymbols, extendedSymbols]);

  const strength = useMemo(() => {
    if (!pool) return { label: '—', bits: 0, score: 0 };
    const bits = entropy(length, pool.length);
    let label = 'Very weak';
    let score = 1;
    if (bits >= 128) { label = 'Very strong'; score = 5; }
    else if (bits >= 100) { label = 'Strong'; score = 4; }
    else if (bits >= 72) { label = 'Good'; score = 3; }
    else if (bits >= 48) { label = 'Weak'; score = 2; }
    return { label, bits, score };
  }, [length, pool]);

  const generate = () => {
    if (!pool) return;
    const list: string[] = [];
    for (let i = 0; i < count; i++) list.push(generatePassword(length, pool));
    setPasswords(list);
  };

  const copy = async (pw: string) => {
    await copyText(pw);
    setCopied(pw);
    setTimeout(() => setCopied(null), 1500);
  };

  const canGenerate = pool.length > 0;

  return (
    <div className="tool-ui">
      <div className="field">
        <div className="range-row">
          <label htmlFor="pw-length">Length</label>
          <input
            id="pw-length"
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={e => setLength(Number(e.target.value))}
          />
          <span className="range-value">{length}</span>
        </div>
        <div className="strength">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`strength-seg ${i <= strength.score ? 'on' : ''}`} />
          ))}
        </div>
        <div className="strength-label">
          {strength.label} · ~{strength.bits.toLocaleString()} bits of entropy
        </div>
      </div>

      <div className="field">
        <label>Character sets</label>
        <div className="check-grid">
          <label className="check"><input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> Uppercase (A-Z)</label>
          <label className="check"><input type="checkbox" checked={useLower} onChange={e => setUseLower(e.target.checked)} /> Lowercase (a-z)</label>
          <label className="check"><input type="checkbox" checked={useDigits} onChange={e => setUseDigits(e.target.checked)} /> Digits (0-9)</label>
          <label className="check"><input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} /> Symbols (!@#$…)</label>
        </div>
        {useSymbols && (
          <label className="check" style={{ marginTop: 10 }}>
            <input type="checkbox" checked={extendedSymbols} onChange={e => setExtendedSymbols(e.target.checked)} />
            I have trust issues: use the extended symbol set ({EXTENDED_SYMBOLS})
          </label>
        )}
      </div>

      <div className="field">
        <label htmlFor="pw-count">Number of passwords</label>
        <div className="num-row">
          <input
            id="pw-count"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={e => setCount(Math.min(50, Math.max(1, Number(e.target.value) || 1)))}
          />
        </div>
      </div>

      <div className="row">
        <button className="btn" onClick={generate} disabled={!canGenerate}>
          <RefreshCw size={16} /> Generate
        </button>
      </div>

      {passwords.some(p => p) && (
        <div className="password-list">
          {passwords.map((pw, i) => (
            <div className="password-row" key={i}>
              <code>{pw}</code>
              <button className="icon-btn" onClick={() => copy(pw)} aria-label="Copy password">
                {copied === pw ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          ))}
        </div>
      )}

      {!canGenerate && (
        <div className="alert error">Select at least one character set.</div>
      )}
    </div>
  );
}
