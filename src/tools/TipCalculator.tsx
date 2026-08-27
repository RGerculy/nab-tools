import { useState } from 'react';
import { Copy, Check, Receipt } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const QUICK_TIPS = [10, 12.5, 15, 18, 20, 25];

function money(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function TipCalculator() {
  const [bill, setBill] = useState('45.00');
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(2);
  const [result, setResult] = useState<{ tip: number; total: number; perPerson: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const b = parseFloat(bill);
    if (Number.isNaN(b) || b < 0) return;
    const tip = (b * tipPct) / 100;
    const total = b + tip;
    const perPerson = total / people;
    setResult({ tip, total, perPerson });
  };

  const copy = async () => {
    if (!result) return;
    await copyText(`Bill: ${money(parseFloat(bill))}\nTip (${tipPct}%): ${money(result.tip)}\nTotal: ${money(result.total)}\nPer person (${people}): ${money(result.perPerson)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="tip-bill">Bill amount</label>
        <input id="tip-bill" className="input" type="number" step="0.01" min="0" value={bill} onChange={e => setBill(e.target.value)} style={{ maxWidth: 200 }} />
      </div>

      <div className="field">
        <label>Tip percentage — {tipPct}%</label>
        <div className="tabs" role="tablist">
          {QUICK_TIPS.map(t => (
            <button key={t} className={`tab ${tipPct === t ? 'active' : ''}`} onClick={() => setTipPct(t)} role="tab" aria-selected={tipPct === t}>{t}%</button>
          ))}
        </div>
        <input type="range" min={0} max={40} value={tipPct} onChange={e => setTipPct(Number(e.target.value))} style={{ width: '100%', marginTop: 10, accentColor: 'var(--accent)' }} aria-label="Custom tip percentage" />
      </div>

      <div className="field">
        <label htmlFor="tip-people">Split between</label>
        <div className="num-row">
          <input id="tip-people" type="number" min={1} max={50} value={people} onChange={e => setPeople(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} />
          <span style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>people</span>
        </div>
      </div>

      <div className="row">
        <button className="btn" onClick={calculate}><Receipt size={16} /> Calculate</button>
      </div>

      {result && (
        <div className="field">
          <table className="result-table">
            <tbody>
              <tr><th>Tip ({tipPct}%)</th><td>{money(result.tip)}</td></tr>
              <tr><th>Total</th><td>{money(result.total)}</td></tr>
              <tr><th>Per person ({people})</th><td style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.1rem' }}>{money(result.perPerson)}</td></tr>
            </tbody>
          </table>
          <div className="row" style={{ marginTop: 10 }}>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
