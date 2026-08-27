import { useRef, useState } from 'react';
import { FileCheck, AlertCircle, Check } from 'lucide-react';
import { md5, sha1Hex, sha256Hex, sha512Hex } from './md5';
import { copyText } from '../utils/clipboard';
import './tools.css';

type Algo = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

async function hashFile(file: File, algo: Algo): Promise<string> {
  const buf = await file.arrayBuffer();
  const data = new Uint8Array(buf);
  switch (algo) {
    case 'MD5': return md5(data);
    case 'SHA-1': return sha1Hex(data);
    case 'SHA-256': return sha256Hex(data);
    case 'SHA-512': return sha512Hex(data);
  }
}

export function FileHash() {
  const [algo, setAlgo] = useState<Algo>('SHA-256');
  const [result, setResult] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const run = async (algoOverride?: Algo) => {
    const a = algoOverride ?? algo;
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    setResult('');
    setFileName(file.name);
    setFileSize(`${(file.size / 1048576).toFixed(2)} MB`);
    try {
      const h = await hashFile(file, a);
      setResult(h);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to hash file');
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    await copyText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label>File</label>
        <label className="file-drop">
          {fileName ? `${fileName} (${fileSize})` : 'Click to choose a file — it never leaves your device'}
          <input
            ref={fileRef}
            type="file"
            style={{ display: 'none' }}
            onChange={() => { setResult(''); run(); }}
          />
        </label>
      </div>

      <div className="field">
        <label>Algorithm</label>
        <div className="tabs" role="tablist">
          {(['MD5', 'SHA-1', 'SHA-256', 'SHA-512'] as Algo[]).map(a => (
            <button key={a} className={`tab ${algo === a ? 'active' : ''}`} onClick={() => { setAlgo(a); if (fileName) run(a); }} role="tab" aria-selected={algo === a}>{a}</button>
          ))}
        </div>
      </div>

      {busy && <div className="alert info">Hashing…</div>}
      {error && <div className="alert error"><AlertCircle size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />{error}</div>}

      {result && (
        <div className="field">
          <label>{algo} checksum</label>
          <div className="output" style={{ maxHeight: 'none' }}>{result}</div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={copy}><FileCheck size={16} /> Copy</button>
            {copied && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}><Check size={14} style={{ verticalAlign: '-2px' }} /> Copied</span>}
          </div>
        </div>
      )}

      <div className="alert info">
        Hashing runs entirely in your browser — files are read locally and never uploaded. Use SHA-256 to verify downloads against the checksum on the publisher&apos;s site; MD5/SHA-1 are fine for non-security integrity checks.
      </div>
    </div>
  );
}
