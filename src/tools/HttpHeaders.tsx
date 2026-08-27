import { useMemo, useState } from 'react';
import './tools.css';

const checks = [
  ['strict-transport-security', 'HSTS', 'Forces HTTPS in supporting browsers.'],
  ['content-security-policy', 'Content-Security-Policy', 'Restricts scripts and other content sources.'],
  ['x-content-type-options', 'X-Content-Type-Options', 'Helps prevent MIME-type sniffing.'],
  ['x-frame-options', 'X-Frame-Options', 'Controls whether the page can be embedded in a frame.'],
  ['referrer-policy', 'Referrer-Policy', 'Controls how much referrer information is shared.'],
  ['permissions-policy', 'Permissions-Policy', 'Restricts access to browser features.'],
];

export function HttpHeaders() {
  const [raw, setRaw] = useState('HTTP/2 200\ncontent-type: text/html; charset=utf-8\nstrict-transport-security: max-age=31536000; includeSubDomains\ncontent-security-policy: default-src \'self\'\nx-content-type-options: nosniff\nreferrer-policy: strict-origin-when-cross-origin');
  const rows = useMemo(() => raw.split(/\r?\n/).map(line => { const split = line.indexOf(':'); return split > 0 ? [line.slice(0, split).trim().toLowerCase(), line.slice(split + 1).trim()] as const : null; }).filter(Boolean) as [string, string][], [raw]);
  const headerMap = new Map(rows);
  return <div className="tool-ui">
    <div className="field"><label htmlFor="headers-input">Raw HTTP response headers</label><textarea id="headers-input" className="input" value={raw} onChange={e => setRaw(e.target.value)} spellCheck={false} placeholder="content-security-policy: default-src 'self'" /></div>
    <div className="field"><label>Security header checks</label><div className="result-table-wrap"><table className="result-table"><thead><tr><th>Status</th><th>Header</th><th>Purpose</th><th>Value</th></tr></thead><tbody>{checks.map(([key, name, purpose]) => <tr key={key}><td><span className={`badge ${headerMap.has(key) ? '' : 'warning'}`}>{headerMap.has(key) ? 'Present' : 'Missing'}</span></td><td>{name}</td><td>{purpose}</td><td>{headerMap.get(key) ?? '—'}</td></tr>)}</tbody></table></div></div>
    <div className="field"><label>Parsed headers ({rows.length})</label><pre className="output">{rows.map(([key, value]) => `${key}: ${value}`).join('\n') || 'No header lines detected.'}</pre></div>
    <div className="alert info">This analyzer works on text you paste locally. Browsers restrict cross-origin access to arbitrary response headers, so no URL is fetched and no header data leaves your device.</div>
  </div>;
}
