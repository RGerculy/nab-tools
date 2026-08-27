import { useMemo, useState } from 'react';
import { Brain, Check, RotateCcw } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import { FIVE_LETTER_WORDS } from '../data/wordlist';
import './tools.css';

type CellState = 'empty' | 'green' | 'yellow' | 'grey';

interface GuessRow {
  letters: string[];
  states: CellState[];
}

function matchesPattern(word: string, rows: GuessRow[]): boolean {
  for (const row of rows) {
    const remaining = word.split('');
    // Greens first
    for (let i = 0; i < 5; i++) {
      if (row.states[i] === 'green') {
        if (word[i] !== row.letters[i]) return false;
        remaining[i] = '';
      }
    }
    // Yellows: letter present but not at this position
    for (let i = 0; i < 5; i++) {
      if (row.states[i] === 'yellow') {
        const idx = remaining.indexOf(row.letters[i]);
        if (idx === -1 || idx === i) {
          // if only at same position, fail
          if (remaining.indexOf(row.letters[i]) === -1) return false;
          if (remaining.indexOf(row.letters[i]) === i && remaining.lastIndexOf(row.letters[i]) === i) return false;
        }
      }
    }
    // Greys: letter not present anywhere (excluding greens/yellows of same letter)
    for (let i = 0; i < 5; i++) {
      if (row.states[i] === 'grey') {
        const ch = row.letters[i];
        // if this letter is marked green/yellow elsewhere in the row, grey only excludes this position
        const hasOther = row.states.some((s, j) => j !== i && s !== 'grey' && row.letters[j] === ch);
        if (!hasOther) {
          if (remaining.includes(ch)) return false;
        } else {
          if (word[i] === ch) return false;
        }
      }
    }
  }
  return true;
}

export function WordleSolver() {
  const [rows, setRows] = useState<GuessRow[]>([
    { letters: ['', '', '', '', ''], states: ['empty', 'empty', 'empty', 'empty', 'empty'] },
  ]);
  const [copied, setCopied] = useState(false);

  const cycleState = (r: number, i: number) => {
    setRows(list => list.map((row, ri) => {
      if (ri !== r) return row;
      const order: CellState[] = ['empty', 'green', 'yellow', 'grey'];
      const next = order[(order.indexOf(row.states[i]) + 1) % order.length];
      return { ...row, states: row.states.map((s, li) => li === i ? next : s) };
    }));
  };

  const addRow = () => {
    if (rows.length < 6) setRows(list => [...list, { letters: ['', '', '', '', ''], states: ['empty', 'empty', 'empty', 'empty', 'empty'] }]);
  };

  const removeRow = () => {
    if (rows.length > 1) setRows(list => list.slice(0, -1));
  };

  const reset = () => {
    setRows([{ letters: ['', '', '', '', ''], states: ['empty', 'empty', 'empty', 'empty', 'empty'] }]);
  };

  const candidates = useMemo(() => {
    const filled = rows.filter(r => r.letters.every(l => l !== ''));
    return FIVE_LETTER_WORDS.filter(w => matchesPattern(w, filled));
  }, [rows]);

  const copy = async () => {
    await copyText(candidates.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const stateLabel: Record<CellState, string> = {
    empty: '?',
    green: 'G',
    yellow: 'Y',
    grey: 'X',
  };

  return (
    <div className="tool-ui">
      <div className="alert info" style={{ marginTop: 0 }}>
        Enter your guesses. Click each letter cell to cycle its state: <strong>green</strong> (correct spot) → <strong>yellow</strong> (wrong spot) → <strong>grey</strong> (not in word). Candidates update live.
      </div>

      {rows.map((row, r) => (
        <div key={r} className="row" style={{ justifyContent: 'flex-start', gap: 6 }}>
          {row.letters.map((ch, i) => (
            <button
              key={i}
              className="icon-btn"
              onClick={() => cycleState(r, i)}
              title={`State: ${stateLabel[row.states[i]]} — click to change`}
              style={{
                width: 48, height: 48, fontSize: '1.3rem', fontWeight: 800,
                background: row.states[i] === 'green' ? 'var(--accent)' : row.states[i] === 'yellow' ? 'var(--warning)' : row.states[i] === 'grey' ? '#3a3f47' : 'var(--bg)',
                color: row.states[i] === 'empty' ? 'var(--fg-muted)' : '#06251d',
                border: row.states[i] === 'empty' ? '1px solid var(--border)' : 'none',
              }}
            >
              {ch || stateLabel[row.states[i]]}
            </button>
          ))}
          <input
            aria-label={`Guess ${r + 1} letters`}
            value={row.letters.join('')}
            onChange={e => {
              const val = e.target.value.toLowerCase().replace(/[^a-z]/g, '').slice(0, 5);
              setRows(list => list.map((rr, ri) => ri === r ? { ...rr, letters: val.split('').concat(Array(5 - val.length).fill('')).slice(0, 5) } : rr));
            }}
            style={{ width: 0, height: 0, opacity: 0, position: 'absolute' }}
            autoFocus={r === rows.length - 1}
          />
          <span style={{ color: 'var(--fg-muted)', fontSize: '0.75rem', marginLeft: 4 }}>{r + 1}</span>
        </div>
      ))}

      <div className="row">
        {rows.length < 6 && <button className="btn secondary" onClick={addRow}>+ Add guess</button>}
        {rows.length > 1 && <button className="btn secondary" onClick={removeRow}>− Remove</button>}
        <button className="btn secondary" onClick={reset}><RotateCcw size={16} /> Reset</button>
      </div>

      <div className="field">
        <label>{candidates.length} possible answer{candidates.length === 1 ? '' : 's'}{candidates.length === 1 ? ' — that\u2019s your answer!' : ''}</label>
        <div className="output" style={{ maxHeight: 240 }}>
          {candidates.slice(0, 200).map(w => <div key={w}>{w}</div>)}
          {candidates.length > 200 && <div style={{ color: 'var(--fg-muted)' }}>…and {candidates.length - 200} more</div>}
        </div>
        {candidates.length > 0 && (
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={copy}><Brain size={16} /> Copy list</button>
            {copied && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}><Check size={14} style={{ verticalAlign: '-2px' }} /> Copied</span>}
          </div>
        )}
      </div>

      <div className="alert info">
        Dictionary: ~1,400 common 5-letter words. Uses official Wordle-style feedback logic (greens, yellows, greys). Runs entirely in your browser.
      </div>
    </div>
  );
}
