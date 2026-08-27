import { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Volume2 } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const MORSE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
};

const REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k]),
);

function toMorse(text: string): string {
  return text.toUpperCase().split('').map(ch => {
    if (ch === ' ') return '/';
    return MORSE[ch] ?? ch;
  }).join(' ');
}

function fromMorse(text: string): string {
  return text.trim().split(/\s+/).map(code => {
    if (code === '/') return ' ';
    return REVERSE[code] ?? code;
  }).join('');
}

export function MorseCode() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('SOS');
  const [copied, setCopied] = useState(false);

  const output = mode === 'encode' ? toMorse(input) : fromMorse(input);

  const copy = async () => {
    await copyText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const play = () => {
    try {
      const ctx = new AudioContext();
      const codes = (mode === 'encode' ? output : input).split(/\s+/);
      let t = ctx.currentTime + 0.1;
      for (const code of codes) {
        if (code === '/') { t += 0.6; continue; }
        for (const ch of code) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 700;
          const dur = ch === '.' ? 0.08 : 0.24;
          gain.gain.setValueAtTime(0.25, t);
          gain.gain.setValueAtTime(0.0001, t + dur);
          osc.start(t);
          osc.stop(t + dur + 0.02);
          t += dur + 0.08;
        }
        t += 0.16;
      }
    } catch {
      // Audio unavailable — ignore
    }
  };

  return (
    <div className="tool-ui">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="tabs" role="tablist">
          <button className={`tab ${mode === 'encode' ? 'active' : ''}`} onClick={() => setMode('encode')} role="tab" aria-selected={mode === 'encode'}>Text → Morse</button>
          <button className={`tab ${mode === 'decode' ? 'active' : ''}`} onClick={() => setMode('decode')} role="tab" aria-selected={mode === 'decode'}>Morse → Text</button>
        </div>
        <button className="btn secondary" onClick={() => { setMode(m => (m === 'encode' ? 'decode' : 'encode')); setInput(output); }} aria-label="Swap direction"><ArrowLeftRight size={16} /></button>
      </div>

      <div className="field">
        <label htmlFor="morse-in">{mode === 'encode' ? 'Text' : 'Morse code'}</label>
        <textarea
          id="morse-in"
          className="input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'SOS' : '... --- ...'}
          spellCheck={false}
        />
      </div>

      <div className="field">
        <label>{mode === 'encode' ? 'Morse code' : 'Text'}</label>
        <div className="output" style={{ maxHeight: 'none' }}>{output}</div>
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          {mode === 'encode' && <button className="btn secondary" onClick={play}><Volume2 size={16} /> Play</button>}
        </div>
      </div>

      <div className="alert info">
        Spaces separate letters, / separates words. Morse supports letters, digits, and common punctuation. The Play button sounds out the code at ~700 Hz.
      </div>
    </div>
  );
}
