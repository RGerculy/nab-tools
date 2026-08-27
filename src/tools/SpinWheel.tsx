import { useState } from 'react';
import { CircleDot, RotateCw } from 'lucide-react';
import './tools.css';

function randomIndex(max: number): number { const values = new Uint32Array(1); crypto.getRandomValues(values); return values[0] % max; }

export function SpinWheel() {
  const [text, setText] = useState('Pizza\nTacos\nCurry\nBurgers\nSurprise me'); const [winner, setWinner] = useState(''); const [spinning, setSpinning] = useState(false);
  const items = text.split(/\r?\n/).map(v => v.trim()).filter(Boolean);
  const spin = () => { if (!items.length || spinning) return; setSpinning(true); window.setTimeout(() => { setWinner(items[randomIndex(items.length)]); setSpinning(false); }, 700); };
  const colours = items.map((_, i) => `hsl(${Math.round(i * 360 / Math.max(items.length, 1))} 65% 45%)`).join(', ');
  return <div className="tool-ui">
    <div className="field"><label htmlFor="wheel-items">Choices — one per line</label><textarea id="wheel-items" className="input" value={text} onChange={e => setText(e.target.value)} style={{ minHeight: 150 }} /></div>
    <div style={{ textAlign: 'center' }}><div style={{ width: 220, height: 220, borderRadius: '50%', margin: '0 auto 18px', background: items.length ? `conic-gradient(${colours})` : 'var(--border)', border: '8px solid var(--surface)', boxShadow: '0 0 0 2px var(--border)', display: 'grid', placeItems: 'center', transition: 'transform 700ms cubic-bezier(.2,.8,.2,1)', transform: spinning ? 'rotate(720deg)' : 'rotate(0deg)' }}><CircleDot size={40} color="#fff" /></div><button className="btn" onClick={spin} disabled={!items.length || spinning}><RotateCw size={16} /> {spinning ? 'Spinning…' : 'Spin the wheel'}</button></div>
    {winner && <div className="alert info" style={{ textAlign: 'center', fontSize: '1.2rem' }}>The wheel picked <strong>{winner}</strong>!</div>}
    <p style={{ color: 'var(--fg-muted)', fontSize: '0.82rem' }}>{items.length} choice{items.length === 1 ? '' : 's'} loaded. Random selection happens locally in your browser.</p>
  </div>;
}
