import { useMemo, useState } from 'react';
import { Shuffle, Copy, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import { WORDS } from '../data/wordlist';
import './tools.css';

function signature(word: string): string {
  return word.split('').sort().join('');
}

export function WordScramble() {
  const [input, setInput] = useState('letters');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [scrambleInput, setScrambleInput] = useState('adventure');
  const [scrambled, setScrambled] = useState('');

  // Precompute an index: signature -> words (built once, client-side)
  const index = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const w of WORDS) {
      const sig = signature(w);
      const list = map.get(sig);
      if (list) list.push(w);
      else map.set(sig, [w]);
    }
    return map;
  }, []);

  const solve = () => {
    setError('');
    const letters = input.toLowerCase().replace(/[^a-z]/g, '');
    if (letters.length < 2) { setError('Enter at least 2 letters (a–z only).'); setResults([]); return; }
    const sig = signature(letters);
    const exact = index.get(sig) ?? [];
    // Also find words that can be formed from a subset of the letters (anagrams of subsets)
    const subsets = new Set<string>();
    const n = letters.length;
    for (let mask = 1; mask < (1 << Math.min(n, 12)); mask++) {
      let s = '';
      for (let i = 0; i < n; i++) if (mask & (1 << i)) s += letters[i];
      if (s.length >= 3) subsets.add(signature(s));
    }
    const matches = new Set<string>(exact);
    for (const sig2 of subsets) {
      const ws = index.get(sig2);
      if (ws) for (const w of ws) if (w.length >= 3) matches.add(w);
    }
    const sorted = Array.from(matches).sort((a, b) => b.length - a.length || a.localeCompare(b));
    setResults(sorted);
  };

  const scramble = (word: string): string => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };

  const doScramble = () => {
    const w = scrambleInput.trim().toLowerCase().replace(/[^a-z]/g, '') || 'adventure';
    setScrambled(scramble(w));
  };

  const copyScrambled = async () => {
    await copyText(scrambled);
    setCopied('scrambled');
    setTimeout(() => setCopied(null), 1200);
  };

  const copy = async (w: string) => {
    await copyText(w);
    setCopied(w);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="ws-in">Letters (scrambled or not)</label>
        <div className="row">
          <input id="ws-in" className="input" style={{ flex: 1, minWidth: 180 }} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') solve(); }} placeholder="letters" spellCheck={false} />
          <button className="btn" onClick={solve}><Shuffle size={16} /> Solve</button>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      {results.length > 0 && (
        <div className="field">
          <label>{results.length} word{results.length === 1 ? '' : 's'} found</label>
          <div className="output" style={{ maxHeight: 260 }}>
            {results.map(w => (
              <div key={w} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0' }}>
                <span style={{ fontWeight: 600 }}>{w}</span>
                <button className="icon-btn" onClick={() => copy(w)} aria-label={`Copy ${w}`}>
                  {copied === w ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && input.length >= 2 && !error && (
        <div className="alert info">No words found for those letters. Try a different combination.</div>
      )}

      <div className="field" style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <label htmlFor="ws-scramble">Word scrambler — make a puzzle from any word</label>
        <div className="row">
          <input id="ws-scramble" className="input" style={{ flex: 1, minWidth: 160 }} value={scrambleInput} onChange={e => setScrambleInput(e.target.value)} placeholder="adventure" spellCheck={false} />
          <button className="btn secondary" onClick={doScramble}><Shuffle size={16} /> Scramble</button>
          {scrambled && (
            <button className="icon-btn" onClick={copyScrambled} aria-label="Copy scrambled word">
              {copied === 'scrambled' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          )}
        </div>
        {scrambled && <div className="output" style={{ maxHeight: 'none', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em' }}>{scrambled}</div>}
      </div>

      <div className="alert info">
        The dictionary contains ~7,000 common English words (3–8 letters). Matches include the exact anagram plus any 3+ letter words formable from subsets of your letters. All lookup happens locally in your browser.
      </div>
    </div>
  );
}
