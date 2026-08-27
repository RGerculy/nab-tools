import { useState } from 'react';
import { Check, Clock, Copy } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const ZONES = [
  ['Europe/London', 'London'],
  ['Europe/Paris', 'Paris / Berlin'],
  ['America/New_York', 'New York'],
  ['America/Los_Angeles', 'Los Angeles'],
  ['America/Chicago', 'Chicago'],
  ['Asia/Tokyo', 'Tokyo'],
  ['Asia/Shanghai', 'Shanghai'],
  ['Asia/Kolkata', 'India'],
  ['Australia/Sydney', 'Sydney'],
  ['UTC', 'UTC'],
] as const;

function localValue(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parts(date: Date, timeZone: string) {
  const values = new Intl.DateTimeFormat('en-GB', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  return Object.fromEntries(values.filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
}

function zonedToUtc(value: string, timeZone: string): Date {
  const [datePart, timePart] = value.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const p = parts(guess, timeZone);
  const displayed = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return new Date(guess.getTime() - (displayed - guess.getTime()));
}

function format(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat(undefined, { timeZone, dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export function TimezoneConverter() {
  const [value, setValue] = useState(localValue());
  const [from, setFrom] = useState('Europe/London');
  const [to, setTo] = useState('America/New_York');
  const [copied, setCopied] = useState(false);
  const utc = value ? zonedToUtc(value, from) : null;
  const result = utc && !Number.isNaN(utc.getTime()) ? format(utc, to) : '';

  const copy = async () => {
    await copyText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="tool-ui">
      <div className="field"><label htmlFor="tz-date">Date and time</label><input id="tz-date" className="input" type="datetime-local" value={value} onChange={e => setValue(e.target.value)} /></div>
      <div className="field"><label htmlFor="tz-from">From time zone</label><select id="tz-from" className="input" value={from} onChange={e => setFrom(e.target.value)}>{ZONES.map(([id, name]) => <option key={id} value={id}>{name} ({id})</option>)}</select></div>
      <div className="field"><label htmlFor="tz-to">Convert to</label><select id="tz-to" className="input" value={to} onChange={e => setTo(e.target.value)}>{ZONES.map(([id, name]) => <option key={id} value={id}>{name} ({id})</option>)}</select></div>
      {result && <div className="field"><label>Converted time</label><div className="alert info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}><span><Clock size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />{result}</span><button className="icon-btn" onClick={copy} aria-label="Copy converted time">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div></div>}
      <p style={{ color: 'var(--fg-muted)', fontSize: '0.82rem' }}>Daylight-saving rules are applied using your browser's time-zone database.</p>
    </div>
  );
}
