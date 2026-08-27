import { useState } from 'react';
import { Copy, Check, Clock } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function fmtDateTime(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function parseDateTimeInput(s: string): Date | null {
  const t = s.trim();
  const m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (!m) return null;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), Number(m[4] || 0), Number(m[5] || 0), Number(m[6] || 0));
  if (d.getDate() !== Number(m[1]) || d.getMonth() !== Number(m[2]) - 1) return null;
  return d;
}

export function TimestampConverter() {
  const [ts, setTs] = useState('');
  const [tsError, setTsError] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [dateError, setDateError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const fromTs = (value: string) => {
    setTs(value);
    setTsError('');
    if (!value.trim()) return;
    const n = Number(value.trim());
    if (Number.isNaN(n)) { setTsError('Not a number'); return; }
    // Heuristic: 13-digit = milliseconds, 10-digit = seconds
    const ms = Math.abs(n) > 100000000000 ? n : n * 1000;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) { setTsError('Invalid timestamp'); return; }
    setTsError('');
    setDateStr(fmtDateTime(d));
  };

  const fromDate = (value: string) => {
    setDateStr(value);
    setDateError('');
    if (!value.trim()) return;
    const d = parseDateTimeInput(value);
    if (!d) { setDateError('Invalid date — use DD/MM/YYYY or DD/MM/YYYY HH:MM:SS'); return; }
    setDateError('');
    setTs(String(Math.floor(d.getTime() / 1000)));
  };

  const copy = async (label: string, text: string) => {
    await copyText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="ts-now">Right now</label>
        <div className="output" style={{ maxHeight: 'none' }}>{fmtDateTime(new Date(now))} <span className="badge">{(now / 1000) | 0}</span></div>
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn secondary" onClick={() => setNow(Date.now())}><Clock size={16} /> Refresh now</button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="ts-in">Unix timestamp (seconds or milliseconds)</label>
        <div className="row">
          <input id="ts-in" className="input" style={{ flex: 1, minWidth: 180 }} value={ts} onChange={e => fromTs(e.target.value)} placeholder="1786672800" spellCheck={false} />
        </div>
        {tsError && <div className="alert error">{tsError}</div>}
        {dateStr && !tsError && (
          <div className="output" style={{ maxHeight: 'none' }}>{dateStr}</div>
        )}
        {dateStr && !tsError && (
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={() => copy('ts', dateStr)}>{copied === 'ts' ? <Check size={16} /> : <Copy size={16} />} Copy date</button>
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="ts-date">Date → timestamp <span className="hint">(DD/MM/YYYY [HH:MM:SS])</span></label>
        <div className="row">
          <input id="ts-date" className="input" style={{ flex: 1, minWidth: 180 }} value={dateStr} onChange={e => fromDate(e.target.value)} placeholder="17/08/2026 18:00:00" spellCheck={false} />
        </div>
        {dateError && <div className="alert error">{dateError}</div>}
        {ts && !dateError && (
          <>
            <div className="output" style={{ maxHeight: 'none' }}>{ts} <span className="badge">seconds</span></div>
            <div className="row" style={{ marginTop: 8 }}>
              <button className="btn secondary" onClick={() => copy('date', ts)}>{copied === 'date' ? <Check size={16} /> : <Copy size={16} />} Copy</button>
            </div>
          </>
        )}
      </div>

      <div className="alert info">
        All times are shown in <strong>DD/MM/YYYY HH:MM:SS</strong> format, in your local timezone. Seconds (10 digits) and milliseconds (13 digits) are auto-detected. Nothing is sent anywhere.
      </div>
    </div>
  );
}
