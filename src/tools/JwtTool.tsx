import { useState } from 'react';
import { Copy, Check, WandSparkles } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const encode = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const decode = (value: string) => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
  const binary = atob(padded);
  return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)));
};

export function JwtTool() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [builderPayload, setBuilderPayload] = useState('{\n  "sub": "1234567890",\n  "name": "Jane Doe",\n  "iat": 1516239022\n}');
  const [generated, setGenerated] = useState('');

  const inspect = (value: string) => {
    setToken(value);
    setError('');
    setHeader('');
    setPayload('');
    if (!value.trim()) return;
    const parts = value.trim().split('.');
    if (parts.length !== 3) { setError('A JWT must contain three dot-separated parts.'); return; }
    try {
      setHeader(JSON.stringify(JSON.parse(decode(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(decode(parts[1])), null, 2));
    } catch { setError('The header or payload is not valid Base64url JSON.'); }
  };

  const build = () => {
    setError('');
    try {
      const payloadObject = JSON.parse(builderPayload);
      setGenerated(`${encode(JSON.stringify({ alg: 'none', typ: 'JWT' }))}.${encode(JSON.stringify(payloadObject))}.`);
    } catch { setError('Builder payload must be valid JSON.'); setGenerated(''); }
  };

  const copy = async () => { await copyText(generated || payload); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return <div className="tool-ui">
    <div className="field"><label htmlFor="jwt-token">JWT token</label><textarea id="jwt-token" className="input" value={token} onChange={e => inspect(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." spellCheck={false} /></div>
    {error && <div className="alert error">{error}</div>}
    {(header || payload) && <div className="row" style={{ alignItems: 'flex-start' }}>
      <div className="field" style={{ flex: 1 }}><label>Decoded header</label><pre className="output">{header}</pre></div>
      <div className="field" style={{ flex: 1 }}><label>Decoded payload</label><pre className="output">{payload}</pre></div>
    </div>}
    <div className="field"><label htmlFor="jwt-builder">Unsigned JWT payload builder</label><textarea id="jwt-builder" className="input" value={builderPayload} onChange={e => setBuilderPayload(e.target.value)} spellCheck={false} /></div>
    <div className="row"><button className="btn" onClick={build}><WandSparkles size={16} /> Build JWT</button>{generated && <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>}</div>
    {generated && <><div className="alert info" style={{ marginTop: 12 }}>This builder creates an unsigned <code>alg: none</code> token for testing only. It is not suitable for authentication.</div><div className="output" style={{ marginTop: 12, wordBreak: 'break-all' }}>{generated}</div></>}
    <div className="alert info" style={{ marginTop: 16 }}>JWT decoding happens locally. Never paste production tokens into tools you do not trust, and remember that decoded JWT payloads are not encrypted.</div>
  </div>;
}
