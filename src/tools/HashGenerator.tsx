import { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { md5, sha1Hex, sha256Hex, sha512Hex } from './md5';
import { copyText } from '../utils/clipboard';
import './tools.css';

type Algo = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

const TEST_VECTORS: Record<Algo, { input: string; expected: string }> = {
  'MD5': { input: 'abc', expected: '900150983cd24fb0d6963f7d28e17f72' },
  'SHA-1': { input: 'abc', expected: 'a9993e364706816aba3e25717850c26c9cd0d89d' },
  'SHA-256': { input: 'abc', expected: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' },
  'SHA-512': { input: 'abc', expected: 'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f' },
};

async function compute(algo: Algo, data: Uint8Array): Promise<string> {
  switch (algo) {
    case 'MD5': return md5(data);
    case 'SHA-1': return sha1Hex(data);
    case 'SHA-256': return sha256Hex(data);
    case 'SHA-512': return sha512Hex(data);
  }
}

export function HashGenerator() {
  const [mode, setMode] = useState<'text' | 'file'>('text');
  const [text, setText] = useState('');
  const [algo, setAlgo] = useState<Algo>('SHA-256');
  const [result, setResult] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const run = async (algoOverride?: Algo) => {
    const a = algoOverride ?? algo;
    setError('');
    setBusy(true);
    try {
      if (mode === 'text') {
        if (!text) { setResult(''); setBusy(false); return; }
        const data = new TextEncoder().encode(text);
        setResult(await compute(a, data));
      } else {
        const file = fileRef.current?.files?.[0];
        if (!file) { setResult(''); setBusy(false); return; }
        setFileName(file.name);
        setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
        const buf = await file.arrayBuffer();
        setResult(await compute(a, new Uint8Array(buf)));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to compute hash');
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
      <div className="tabs" role="tablist">
        <button className={`tab ${mode === 'text' ? 'active' : ''}`} onClick={() => setMode('text')} role="tab" aria-selected={mode === 'text'}>Text</button>
        <button className={`tab ${mode === 'file' ? 'active' : ''}`} onClick={() => setMode('file')} role="tab" aria-selected={mode === 'file'}>File</button>
      </div>

      {mode === 'text' ? (
        <div className="field">
          <label htmlFor="hash-text">Input text</label>
          <textarea
            id="hash-text"
            className="input"
            value={text}
            onChange={e => { setText(e.target.value); }}
            placeholder="Type or paste text to hash…"
          />
        </div>
      ) : (
        <div className="field">
          <label>Input file</label>
          <label className="file-drop">
            {fileName ? `${fileName} (${fileSize})` : 'Click to choose a file — it never leaves your device'}
            <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={() => { setResult(''); run(); }} />
          </label>
        </div>
      )}

      <div className="field">
        <label>Algorithm</label>
        <div className="tabs" role="tablist" aria-label="Hash algorithm">
          {(Object.keys(TEST_VECTORS) as Algo[]).map(a => (
            <button key={a} className={`tab ${algo === a ? 'active' : ''}`} onClick={() => { setAlgo(a); if (result) run(a); }} role="tab" aria-selected={algo === a}>{a}</button>
          ))}
        </div>
      </div>

      <div className="row">
        <button className="btn" onClick={() => run()} disabled={busy || (mode === 'text' && !text)}>
          {busy ? 'Hashing…' : 'Hash it'}
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {result && (
        <div className="field">
          <label>{algo} hash</label>
          <div className="output">{result}</div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          </div>
        </div>
      )}

      <div className="alert info">
        Verify: the {algo} hash of <code>"abc"</code> should be{' '}
        <code>{TEST_VECTORS[algo].expected}</code>
      </div>
    </div>
  );
}
