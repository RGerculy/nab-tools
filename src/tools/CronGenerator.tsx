import { useState } from 'react';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const DEFAULTS = { minute: '0', hour: '9', day: '*', month: '*', weekday: '1-5' };
function explain(fields: typeof DEFAULTS): string { return `At minute ${fields.minute} of hour ${fields.hour}, on day ${fields.day} of month ${fields.month}, on weekday ${fields.weekday}.`; }

export function CronGenerator() {
  const [fields, setFields] = useState(DEFAULTS); const [copied, setCopied] = useState(false);
  const expression = `${fields.minute} ${fields.hour} ${fields.day} ${fields.month} ${fields.weekday}`;
  const update = (key: keyof typeof DEFAULTS, value: string) => setFields(prev => ({ ...prev, [key]: value }));
  const copy = async () => { await copyText(expression); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return <div className="tool-ui">
    <div className="field"><label>Schedule fields</label><div className="check-grid">{([['minute', 'Minute (0-59)'], ['hour', 'Hour (0-23)'], ['day', 'Day (1-31)'], ['month', 'Month (1-12)'], ['weekday', 'Weekday (0-7)']] as const).map(([key, label]) => <div key={key}><label htmlFor={`cron-${key}`}>{label}</label><input id={`cron-${key}`} className="input" value={fields[key]} onChange={e => update(key, e.target.value)} /></div>)}</div></div>
    <div className="alert info" style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '1.15rem', letterSpacing: '0.04em' }}>{expression}</div>
    <div className="row"><button className="btn" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy expression</button><button className="btn secondary" onClick={() => setFields(DEFAULTS)}><RefreshCw size={16} /> Reset</button></div>
    <p><strong>Plain English:</strong> {explain(fields)}</p>
    <p style={{ color: 'var(--fg-muted)', fontSize: '0.82rem' }}>Cron fields are separated by spaces. Use * for every value, */5 for every five units, and comma or hyphen ranges where your scheduler supports them.</p>
  </div>;
}
