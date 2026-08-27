import { useState } from 'react';
import { Copy, Check, CalendarDays } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function fmtDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function parseDateInput(s: string): Date | null {
  const m = s.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  if (d.getDate() !== Number(m[1]) || d.getMonth() !== Number(m[2]) - 1 || d.getFullYear() !== Number(m[3])) return null;
  return d;
}

function diffParts(birth: Date, now: Date) {
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function nextBirthday(birth: Date, now: Date) {
  const next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (next < now) next.setFullYear(next.getFullYear() + 1);
  const ms = next.getTime() - now.getTime();
  return { days: Math.ceil(ms / 86400000), date: next };
}

export function AgeCalculator() {
  const [birthday, setBirthday] = useState('01/01/2000');
  const [result, setResult] = useState<{ parts: ReturnType<typeof diffParts>; totalDays: number; next: ReturnType<typeof nextBirthday> } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    setError('');
    const birth = parseDateInput(birthday);
    if (!birth) { setError('Enter a valid date in DD/MM/YYYY format'); setResult(null); return; }
    const now = new Date();
    if (birth > now) { setError('Birth date cannot be in the future'); setResult(null); return; }
    const parts = diffParts(birth, now);
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    setResult({ parts, totalDays, next: nextBirthday(birth, now) });
  };

  const copy = async () => {
    if (!result) return;
    const text = `Age: ${result.parts.years} years, ${result.parts.months} months, ${result.parts.days} days (${result.totalDays.toLocaleString()} total days)`;
    await copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="age-birth">Date of birth <span className="hint">(DD/MM/YYYY)</span></label>
        <input
          id="age-birth"
          className="input"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          placeholder="17/08/1992"
          spellCheck={false}
          style={{ maxWidth: 220 }}
        />
      </div>

      <div className="row">
        <button className="btn" onClick={calculate}><CalendarDays size={16} /> Calculate age</button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {result && (
        <>
          <div className="count-grid">
            <div className="count-card"><div className="num">{result.parts.years}</div><div className="label">Years</div></div>
            <div className="count-card"><div className="num">{result.parts.months}</div><div className="label">Months</div></div>
            <div className="count-card"><div className="num">{result.parts.days}</div><div className="label">Days</div></div>
            <div className="count-card"><div className="num">{result.totalDays.toLocaleString()}</div><div className="label">Total days</div></div>
          </div>
          <div className="alert info">
            Your next birthday is in <strong>{result.next.days}</strong> day{result.next.days === 1 ? '' : 's'} ({fmtDate(result.next.date)}) — you'll turn {result.parts.years + 1}.
          </div>
          <div className="row">
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy result</button>
          </div>
        </>
      )}
    </div>
  );
}
