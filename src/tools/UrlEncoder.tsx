import { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

export function UrlEncoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = (value: string) => {
    setInput(value);
    setError('');
    if (!value) { setOutput(''); return; }
    try {
      setOutput(mode === 'encode' ? encodeURIComponent(value) : decodeURIComponent(value.trim()));
    } catch {
      setError(mode === 'decode' ? 'Invalid percent-encoding — check the input for malformed % sequences.' : 'Encoding failed.');
      setOutput('');
    }
  };

  const swap = () => {
    setMode(m => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output || '');
    setOutput(input);
    setError('');
  };

  const copy = async () => {
    await copyText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="tabs" role="tablist">
          <button className={`tab ${mode === 'encode' ? 'active' : ''}`} onClick={() => { setMode('encode'); setOutput(''); setError(''); }} role="tab" aria-selected={mode === 'encode'}>Encode</button>
          <button className={`tab ${mode === 'decode' ? 'active' : ''}`} onClick={() => { setMode('decode'); setOutput(''); setError(''); }} role="tab" aria-selected={mode === 'decode'}>Decode</button>
        </div>
        <button className="btn secondary" onClick={swap} aria-label="Swap direction"><ArrowLeftRight size={16} /></button>
      </div>

      <div className="field">
        <label htmlFor="url-in">{mode === 'encode' ? 'Text / URL to encode' : 'Percent-encoded string'}</label>
        <textarea
          id="url-in"
          className="input"
          value={input}
          onChange={e => convert(e.target.value)}
          placeholder={mode === 'encode' ? 'hello world & more? yes!' : 'hello%20world%20%26%20more%3F%20yes%21'}
          spellCheck={false}
        />
      </div>

      {error && <div className="alert error">{error}</div>}

      {output && (
        <div className="field">
          <label>{mode === 'encode' ? 'Encoded' : 'Decoded'}</label>
          <div className="output">{output}</div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
