import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

export function QrGenerator() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');
  const [ec, setEc] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [copiedSvg, setCopiedSvg] = useState(false);

  const downloadPng = () => {
    // Render QR to canvas at 4x for crisp output
    const canvas = document.createElement('canvas');
    canvas.width = size * 4;
    canvas.height = size * 4;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Use an off-DOM svg rendered via image for pixel-accurate modules
    const svg = document.getElementById('qr-svg') as unknown as SVGSVGElement;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'qrcode.png';
      a.click();
    };
    img.src = url;
  };

  const downloadSvg = () => {
    const svg = document.getElementById('qr-svg');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySvg = async () => {
    const svg = document.getElementById('qr-svg');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    await copyText(xml);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 1500);
  };

  const inputEmpty = text.trim().length === 0;

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="qr-text">Content — URL, text, WiFi, contact info…</label>
        <textarea
          id="qr-text"
          className="input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="https://… or any text"
          style={{ minHeight: 80 }}
        />
      </div>

      <div className="field">
        <label>Options</label>
        <div className="row">
          <div className="range-row" style={{ flex: 1, minWidth: 180 }}>
            <span style={{ fontSize: '0.85rem' }}>Size</span>
            <input type="range" min={128} max={512} step={16} value={size} onChange={e => setSize(Number(e.target.value))} />
            <span className="range-value">{size}</span>
          </div>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="kv" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label htmlFor="qr-fg" style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>Foreground</label>
            <input id="qr-fg" type="color" value={fg} onChange={e => setFg(e.target.value)} />
          </div>
          <div className="kv" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label htmlFor="qr-bg" style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>Background</label>
            <input id="qr-bg" type="color" value={bg} onChange={e => setBg(e.target.value)} />
          </div>
          <div className="tabs" role="tablist" aria-label="Error correction level">
            {(['L', 'M', 'Q', 'H'] as const).map(level => (
              <button
                key={level}
                className={`tab ${ec === level ? 'active' : ''}`}
                onClick={() => setEc(level)}
                role="tab"
                aria-selected={ec === level}
                title={`${level} — ${level === 'L' ? '7%' : level === 'M' ? '15%' : level === 'Q' ? '25%' : '30%'} recovery`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="field" style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            padding: 16,
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 8,
          }}
        >
          {inputEmpty ? (
            <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-muted)' }}>
              Enter content above
            </div>
          ) : (
            <QRCodeSVG id="qr-svg" value={text} size={size} fgColor={fg} bgColor={bg} level={ec} />
          )}
        </div>
        <div className="row" style={{ justifyContent: 'center', marginTop: 14 }}>
          <button className="btn" onClick={downloadPng} disabled={inputEmpty}><Download size={16} /> PNG</button>
          <button className="btn secondary" onClick={downloadSvg} disabled={inputEmpty}><Download size={16} /> SVG</button>
          <button className="btn secondary" onClick={copySvg} disabled={inputEmpty}>
            {copiedSvg ? <Check size={16} /> : null} {copiedSvg ? 'Copied!' : 'Copy SVG'}
          </button>
        </div>
      </div>
    </div>
  );
}
