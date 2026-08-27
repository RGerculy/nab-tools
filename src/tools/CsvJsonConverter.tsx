import { useState } from 'react';
import { ArrowRightLeft, Check, Copy } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function parseCsv(input: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let cell = ''; let quoted = false;
  for (let i = 0; i < input.length; i += 1) { const c = input[i];
    if (c === '"' && quoted && input[i + 1] === '"') { cell += '"'; i += 1; }
    else if (c === '"') quoted = !quoted;
    else if (c === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) { if (c === '\r' && input[i + 1] === '\n') i += 1; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim() !== ''));
}

function quoteCsv(value: unknown): string { const text = String(value ?? ''); return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; }
function csvToJson(input: string, headers: boolean): string {
  const rows = parseCsv(input); if (!rows.length) return '[]';
  const keys = headers ? rows[0].map((v, i) => v || `column_${i + 1}`) : rows[0].map((_, i) => `column_${i + 1}`);
  const data = (headers ? rows.slice(1) : rows).map(row => Object.fromEntries(keys.map((key, i) => [key, row[i] ?? ''])));
  return JSON.stringify(data, null, 2);
}
function jsonToCsv(input: string): string {
  const data = JSON.parse(input); if (!Array.isArray(data)) throw new Error('JSON must be an array of objects.');
  const keys = [...new Set(data.flatMap(item => item && typeof item === 'object' ? Object.keys(item) : []))];
  if (!keys.length) return '';
  return [keys.map(quoteCsv).join(','), ...data.map(item => keys.map(k => quoteCsv(item?.[k])).join(','))].join('\n');
}

export function CsvJsonConverter() {
  const [direction, setDirection] = useState<'csv-json' | 'json-csv'>('csv-json');
  const [input, setInput] = useState('name,score\nAlice,10\nBob,8');
  const [headers, setHeaders] = useState(true); const [output, setOutput] = useState(''); const [error, setError] = useState(''); const [copied, setCopied] = useState(false);
  const convert = () => { try { setOutput(direction === 'csv-json' ? csvToJson(input, headers) : jsonToCsv(input)); setError(''); } catch (e) { setOutput(''); setError(e instanceof Error ? e.message : 'Could not convert this input.'); } };
  const copy = async () => { await copyText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return <div className="tool-ui">
    <div className="field"><label>Conversion</label><div className="tabs"><button className={`tab ${direction === 'csv-json' ? 'active' : ''}`} onClick={() => setDirection('csv-json')}>CSV to JSON</button><button className={`tab ${direction === 'json-csv' ? 'active' : ''}`} onClick={() => setDirection('json-csv')}>JSON to CSV</button></div></div>
    {direction === 'csv-json' && <label className="check"><input type="checkbox" checked={headers} onChange={e => setHeaders(e.target.checked)} /> First CSV row contains column names</label>}
    <div className="field"><label htmlFor="csv-json-input">Input</label><textarea id="csv-json-input" className="input" value={input} onChange={e => setInput(e.target.value)} style={{ minHeight: 180, fontFamily: 'ui-monospace, Consolas, monospace' }} /></div>
    <div className="row"><button className="btn" onClick={convert}><ArrowRightLeft size={16} /> Convert</button></div>
    {error && <div className="alert error">{error}</div>}
    {output && <div className="field"><label>Output</label><textarea className="input" readOnly value={output} style={{ minHeight: 180, fontFamily: 'ui-monospace, Consolas, monospace' }} /><button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy output</button></div>}
  </div>;
}
