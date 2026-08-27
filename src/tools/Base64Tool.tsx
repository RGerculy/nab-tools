import { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decodeBase64(input: string): string {
  const binary = atob(input.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function Base64Tool() {
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
      setOutput(mode === 'encode' ? encodeBase64(value) : decodeBase64(value));
    } catch {
      setError(mode === 'decode'
        ? 'Invalid Base64 input — check the string for typos or padding.'
        : 'Could not encode — the string may contain characters outside the UTF-8 range.');
      setOutput('');
    }
  };

  const swap = () => {
    setMode(m => (m === 'encode' ? 'decode' : 'encode'));
    setInput('');
    setOutput('');
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
          <button className={`tab ${mode === 'encode' ? 'active' : ''}`} onClick={() => { setMode('encode'); setOutput(''); setError(''); }} role="tab" aria-selected={mode === 'encode'}>Encode → Base64</button>
          <button className={`tab ${mode === 'decode' ? 'active' : ''}`} onClick={() => { setMode('decode'); setOutput(''); setError(''); }} role="tab" aria-selected={mode === 'decode'}>Decode → Text</button>
        </div>
        <button className="btn secondary" onClick={swap} aria-label="Swap direction"><ArrowLeftRight size={16} /></button>
      </div>

      <div className="field">
        <label htmlFor="b64-in">{mode === 'encode' ? 'Plain text' : 'Base64 string'}</label>
        <textarea
          id="b64-in"
          className="input"
          value={input}
          onChange={e => convert(e.target.value)}
          placeholder={mode === 'encode' ? 'Hello, world…' : 'SGVsbG8sIHdvcmxk…'}
          spellCheck={false}
        />
      </div>

      {error && <div className="alert error">{error}</div>}

      {output && (
        <div className="field">
          <label>{mode === 'encode' ? 'Base64 output' : 'Decoded text'}</label>
          <div className="output">{output}</div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
