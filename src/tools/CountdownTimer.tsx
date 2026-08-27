import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import './tools.css';

const PRESETS = [
  { label: '1 min', s: 60 },
  { label: '3 min', s: 180 },
  { label: '5 min', s: 300 },
  { label: '10 min', s: 600 },
  { label: '15 min', s: 900 },
  { label: '25 min', s: 1500 },
];

function fmt(totalSeconds: number): string {
  const t = Math.max(0, Math.ceil(totalSeconds));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const p = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${p(h)}:${p(m)}:${p(s)}` : `${p(m)}:${p(s)}`;
}

export function CountdownTimer() {
  const [total, setTotal] = useState(300); // seconds remaining
  const [input, setInput] = useState('5:00');
  const [running, setRunning] = useState(false);
  const [sound, setSound] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setTotal(t => {
        if (t <= 1) {
          setRunning(false);
          if (sound) beep();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, sound]);

  const beep = () => {
    try {
      const ctx = audioRef.current ?? new AudioContext();
      audioRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio not available (e.g. autoplay restrictions) — fail silently
    }
  };

  const parseInput = (v: string): number | null => {
    const m = v.trim().match(/^(?:(\d+):)?(\d{1,2})(?::(\d{2}))?$/);
    if (!m) return null;
    const h = m[1] ? parseInt(m[1]) : 0;
    const min = parseInt(m[2]);
    const s = m[3] ? parseInt(m[3]) : 0;
    return h * 3600 + min * 60 + s;
  };

  const applyInput = () => {
    const parsed = parseInput(input);
    if (parsed !== null && parsed > 0) {
      setTotal(parsed);
      setRunning(false);
    }
  };

  const start = () => {
    if (total <= 0) return;
    setRunning(true);
  };

  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    const parsed = parseInput(input);
    setTotal(parsed !== null && parsed > 0 ? parsed : 300);
  };

  const applyPreset = (s: number) => {
    setRunning(false);
    setTotal(s);
    setInput(fmt(s));
  };

  const progress = (() => {
    const parsed = parseInput(input);
    const max = parsed !== null && parsed > 0 ? parsed : total;
    return max > 0 ? total / max : 0;
  })();

  return (
    <div className="tool-ui" style={{ alignItems: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color: total <= 10 && running ? 'var(--danger)' : 'var(--accent)', transition: 'color 300ms' }}>
        {fmt(total)}
      </div>

      <div className="strength" style={{ width: '100%', maxWidth: 320 }}>
        <div className="strength-seg on" style={{ height: 8, borderRadius: 4, background: 'var(--accent)', opacity: 0.25 + progress * 0.75, transition: 'opacity 300ms' }} />
      </div>

      <div className="field" style={{ width: '100%', maxWidth: 300 }}>
        <label htmlFor="ct-input">Set time (MM:SS or HH:MM:SS)</label>
        <div className="row">
          <input
            id="ct-input"
            className="input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') applyInput(); }}
            placeholder="5:00"
            spellCheck={false}
            style={{ flex: 1, textAlign: 'center', fontFamily: 'ui-monospace, Consolas, monospace' }}
          />
          <button className="btn secondary" onClick={applyInput}><RotateCcw size={16} /></button>
        </div>
      </div>

      <div className="field">
        <label>Presets</label>
        <div className="tabs" role="tablist" style={{ flexWrap: 'wrap' }}>
          {PRESETS.map(p => (
            <button key={p.s} className="tab" onClick={() => applyPreset(p.s)} role="tab">{p.label}</button>
          ))}
        </div>
      </div>

      <div className="row" style={{ justifyContent: 'center' }}>
        {!running ? (
          <button className="btn" onClick={start} disabled={total <= 0}><Play size={16} /> Start</button>
        ) : (
          <button className="btn" onClick={pause}><Pause size={16} /> Pause</button>
        )}
        <button className="btn secondary" onClick={reset}><RotateCcw size={16} /> Reset</button>
        <button className={`btn secondary ${sound ? '' : ''}`} onClick={() => setSound(s => !s)} aria-label={sound ? 'Mute alert' : 'Enable alert'}>
          <Volume2 size={16} style={{ opacity: sound ? 1 : 0.35 }} />
        </button>
      </div>

      <div className="alert info">
        When the countdown hits zero, an alert sound plays (if enabled and your browser allows it). The timer works offline and never sends anything anywhere.
      </div>
    </div>
  );
}
