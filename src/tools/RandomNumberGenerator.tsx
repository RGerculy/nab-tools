import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function randInt(min: number, max: number): number {
  const range = max - min + 1;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return min + (buf[0] % range);
}

export function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [unique, setUnique] = useState(false);
  const [sort, setSort] = useState(false);
  const [numbers, setNumbers] = useState<number[]>(() => Array.from({ length: 5 }, () => randInt(1, 100)));
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setError('');
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const n = Math.max(1, Math.min(10000, count));
    if (unique && hi - lo + 1 < n) {
      setError(`Cannot generate ${n} unique numbers in a range of only ${hi - lo + 1}.`);
      return;
    }
    if (unique) {
      const pool = new Set<number>();
      while (pool.size < n) pool.add(randInt(lo, hi));
      let list = Array.from(pool);
      if (sort) list.sort((a, b) => a - b);
      setNumbers(list);
    } else {
      let list = Array.from({ length: n }, () => randInt(lo, hi));
      if (sort) list.sort((a, b) => a - b);
      setNumbers(list);
    }
  };

  const copy = async () => {
    await copyText(numbers.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="row">
        <div className="field" style={{ flex: 1, minWidth: 100 }}>
          <label htmlFor="rng-min">Min</label>
          <div className="num-row">
            <input id="rng-min" type="number" value={min} onChange={e => setMin(Number(e.target.value) || 0)} />
          </div>
        </div>
        <div className="field" style={{ flex: 1, minWidth: 100 }}>
          <label htmlFor="rng-max">Max</label>
          <div className="num-row">
            <input id="rng-max" type="number" value={max} onChange={e => setMax(Number(e.target.value) || 0)} />
          </div>
        </div>
        <div className="field" style={{ flex: 1, minWidth: 100 }}>
          <label htmlFor="rng-count">How many</label>
          <div className="num-row">
            <input id="rng-count" type="number" min={1} max={10000} value={count} onChange={e => setCount(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))} />
          </div>
        </div>
      </div>

      <div className="check-grid">
        <label className="check"><input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} /> Unique numbers</label>
        <label className="check"><input type="checkbox" checked={sort} onChange={e => setSort(e.target.checked)} /> Sort ascending</label>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="row">
        <button className="btn" onClick={generate}><RefreshCw size={16} /> Generate</button>
        <button className="btn secondary" onClick={copy} disabled={numbers.length === 0}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy all</button>
      </div>

      {numbers.length > 0 && (
        <div className="output" style={{ maxHeight: 300, fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent)', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {numbers.map((n, i) => <span key={i}>{n.toLocaleString()}</span>)}
        </div>
      )}
    </div>
  );
}
