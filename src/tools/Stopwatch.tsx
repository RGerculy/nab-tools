import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Flag, Download } from 'lucide-react';
import './tools.css';

function fmt(ms: number): string {
  const total = Math.floor(ms);
  const h = Math.floor(total / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const cs = Math.floor((total % 1000) / 10);
  const p = (n: number, w = 2) => String(n).padStart(w, '0');
  return h > 0 ? `${p(h)}:${p(m)}:${p(s)}.${p(cs)}` : `${p(m)}:${p(s)}.${p(cs)}`;
}

export function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const baseRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setElapsed(baseRef.current + (Date.now() - startRef.current));
    }, 33);
    return () => window.clearInterval(id);
  }, [running]);

  const start = () => {
    startRef.current = Date.now();
    setRunning(true);
  };

  const pause = () => {
    baseRef.current += Date.now() - startRef.current;
    setRunning(false);
  };

  const reset = () => {
    baseRef.current = 0;
    setElapsed(0);
    setRunning(false);
    setLaps([]);
  };

  const lap = () => {
    setLaps(l => [elapsed, ...l]);
  };

  const exportCsv = () => {
    const header = 'lap,time';
    // laps are stored newest-first; reverse to chronological
    const rows = laps.map((l, i) => `${laps.length - i},${fmt(l)}`).join('\n');
    const blob = new Blob([`${header}\n${rows}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stopwatch-laps.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-ui" style={{ alignItems: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: '3.2rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color: 'var(--accent)' }}>
        {fmt(elapsed)}
      </div>

      <div className="row" style={{ justifyContent: 'center' }}>
        {!running ? (
          <button className="btn" onClick={start}><Play size={16} /> Start</button>
        ) : (
          <button className="btn" onClick={pause}><Pause size={16} /> Pause</button>
        )}
        <button className="btn secondary" onClick={lap} disabled={!running}><Flag size={16} /> Lap</button>
        <button className="btn secondary" onClick={reset}><RotateCcw size={16} /> Reset</button>
        <button className="btn secondary" onClick={exportCsv} disabled={laps.length === 0}><Download size={16} /> Export CSV</button>
      </div>

      {laps.length > 0 && (
        <div className="field" style={{ width: '100%', maxWidth: 360 }}>
          <label>Laps ({laps.length})</label>
          <div className="output" style={{ maxHeight: 240, textAlign: 'left' }}>
            {laps.map((l, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontVariantNumeric: 'tabular-nums' }}>
                <span style={{ color: 'var(--fg-muted)' }}>Lap {laps.length - i}</span>
                <span style={{ fontWeight: 700 }}>{fmt(l)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
