import { useState } from 'react';
import { Copy, Check, CalendarDays } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function parseDate(s: string): Date | null {
  const m = s.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  if (d.getDate() !== Number(m[1]) || d.getMonth() !== Number(m[2]) - 1 || d.getFullYear() !== Number(m[3])) return null;
  return d;
}

function fmtDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function DateDifference() {
  const [dateA, setDateA] = useState('01/01/2026');
  const [dateB, setDateB] = useState('17/08/2026');
  const [offsetDays, setOffsetDays] = useState(90);
  const [result, setResult] = useState<{ days: number; weeks: number; months: number; years: number; isNegative: boolean } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    setError('');
    const a = parseDate(dateA);
    const b = parseDate(dateB);
    if (!a || !b) { setError('Enter both dates in DD/MM/YYYY format'); setResult(null); return; }
    const ms = b.getTime() - a.getTime();
    const days = Math.round(ms / 86400000);
    const sign = days < 0 ? -1 : 1;
    const abs = Math.abs(days);
    setResult({
      days: days,
      weeks: sign * (abs / 7),
      months: sign * (abs / 30.44),
      years: sign * (abs / 365.25),
      isNegative: days < 0,
    });
  };

  const copy = async () => {
    if (!result) return;
    await copyText(`${fmtDate(parseDate(dateA)!)} to ${fmtDate(parseDate(dateB)!)}: ${result.days} days`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const offsetResult = parseDate(dateA) ? fmtDate(addDays(parseDate(dateA)!, offsetDays)) : '—';

  return (
    <div className="tool-ui">
      <div className="row">
        <div className="field" style={{ flex: 1, minWidth: 150 }}>
          <label htmlFor="dd-a">Date A <span className="hint">(DD/MM/YYYY)</span></label>
          <input id="dd-a" className="input" value={dateA} onChange={e => setDateA(e.target.value)} placeholder="01/01/2026" spellCheck={false} />
        </div>
        <div className="field" style={{ flex: 1, minWidth: 150 }}>
          <label htmlFor="dd-b">Date B <span className="hint">(DD/MM/YYYY)</span></label>
          <input id="dd-b" className="input" value={dateB} onChange={e => setDateB(e.target.value)} placeholder="17/08/2026" spellCheck={false} />
        </div>
      </div>

      <div className="row">
        <button className="btn" onClick={calculate}><CalendarDays size={16} /> Calculate</button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {result && (
        <div className="field">
          <div className="count-grid">
            <div className="count-card"><div className="num">{result.days.toLocaleString()}</div><div className="label">Days</div></div>
            <div className="count-card"><div className="num">{result.weeks.toFixed(1)}</div><div className="label">Weeks</div></div>
            <div className="count-card"><div className="num">{result.months.toFixed(1)}</div><div className="label">Months</div></div>
            <div className="count-card"><div className="num">{result.years.toFixed(2)}</div><div className="label">Years</div></div>
          </div>
          {result.isNegative && <div className="alert error">Date A is after Date B — the difference is negative (counting backwards).</div>}
          <div className="row" style={{ marginTop: 10 }}>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          </div>
        </div>
      )}

      <div className="field" style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <label htmlFor="dd-offset">Date arithmetic — add days to Date A</label>
        <div className="row">
          <div className="num-row">
            <input id="dd-offset" type="number" value={offsetDays} onChange={e => setOffsetDays(Number(e.target.value) || 0)} />
            <span style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>days</span>
          </div>
        </div>
        {parseDate(dateA) && (
          <div className="output" style={{ maxHeight: 'none', marginTop: 10 }}>
            {fmtDate(parseDate(dateA)!)} + {offsetDays} days = <strong>{offsetResult}</strong>
          </div>
        )}
      </div>

      <div className="alert info">
        Months use the average month length (30.44 days) and years use 365.25 — the exact calendar-day count is what matters, shown in the Days card.
      </div>
    </div>
  );
}
