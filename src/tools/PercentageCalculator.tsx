import { useState } from 'react';
import { Copy, Check, Calculator } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

type Mode = 'of' | 'iswhat' | 'change';

function round(n: number, dp = 2): number {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
}

export function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('of');
  const [a, setA] = useState('15');
  const [b, setB] = useState('200');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y)) { setResult(''); return; }

    if (mode === 'of') {
      // What is X% of Y?
      setResult(`${x}% of ${y} = ${round((x / 100) * y)}`);
    } else if (mode === 'iswhat') {
      // X is what % of Y?
      if (y === 0) { setResult('Cannot divide by zero'); return; }
      setResult(`${x} is ${round((x / y) * 100)}% of ${y}`);
    } else {
      // Percentage change from X to Y
      if (x === 0) { setResult('Start value cannot be zero'); return; }
      const change = ((y - x) / Math.abs(x)) * 100;
      setResult(`${round(change)}% ${change >= 0 ? 'increase' : 'decrease'} (from ${x} to ${y})`);
    }
  };

  const copy = async () => {
    await copyText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="tabs" role="tablist">
        <button className={`tab ${mode === 'of' ? 'active' : ''}`} onClick={() => { setMode('of'); setResult(''); }} role="tab" aria-selected={mode === 'of'}>What is X% of Y?</button>
        <button className={`tab ${mode === 'iswhat' ? 'active' : ''}`} onClick={() => { setMode('iswhat'); setResult(''); }} role="tab" aria-selected={mode === 'iswhat'}>X is what % of Y?</button>
        <button className={`tab ${mode === 'change' ? 'active' : ''}`} onClick={() => { setMode('change'); setResult(''); }} role="tab" aria-selected={mode === 'change'}>% change</button>
      </div>

      <div className="row">
        <div className="field" style={{ flex: 1, minWidth: 140 }}>
          <label htmlFor="pct-a">{mode === 'change' ? 'Start value' : mode === 'of' ? 'Percentage' : 'First number'}</label>
          <input id="pct-a" className="input" type="number" step="any" value={a} onChange={e => setA(e.target.value)} />
        </div>
        <div className="field" style={{ flex: 1, minWidth: 140 }}>
          <label htmlFor="pct-b">{mode === 'change' ? 'End value' : mode === 'of' ? 'Number' : 'Second number'}</label>
          <input id="pct-b" className="input" type="number" step="any" value={b} onChange={e => setB(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <button className="btn" onClick={calculate}><Calculator size={16} /> Calculate</button>
      </div>

      {result && (
        <div className="field">
          <div className="output" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent)' }}>{result}</div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
