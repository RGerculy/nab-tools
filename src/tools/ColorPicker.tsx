import { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

interface RGB { r: number; g: number; b: number; }

function clamp(n: number, lo = 0, hi = 255): number { return Math.max(lo, Math.min(hi, n)); }

function hexToRgb(hex: string): RGB | null {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const to = (n: number) => clamp(Math.round(n)).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

function rgbToCmyk({ r, g, b }: RGB): { c: number; m: number; y: number; k: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

function luminance({ r, g, b }: RGB): number {
  const lin = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: RGB, b: RGB): number {
  const l1 = luminance(a), l2 = luminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

export function ColorPicker() {
  const [hex, setHex] = useState('#00D4AA');
  const [hsl, setHsl] = useState({ h: 166, s: 100, l: 42 });
  const [copied, setCopied] = useState('');

  const rgb = useMemo(() => hexToRgb(hex) ?? { r: 0, g: 0, b: 0 }, [hex]);
  const cmyk = useMemo(() => rgbToCmyk(rgb), [rgb]);
  const hslFromHex = useMemo(() => rgbToHsl(rgb), [rgb]);
  const blackContrast = useMemo(() => contrast(rgb, { r: 0, g: 0, b: 0 }), [rgb]);
  const whiteContrast = useMemo(() => contrast(rgb, { r: 255, g: 255, b: 255 }), [rgb]);
  const isDark = useMemo(() => luminance(rgb) < 0.5, [rgb]);

  const setFromHex = (value: string) => {
    const cleaned = value.trim().startsWith('#') ? value.trim() : `#${value.trim()}`;
    setHex(cleaned);
    const r = hexToRgb(cleaned);
    if (r) setHsl(rgbToHsl(r));
  };

  const setFromHsl = (h: number, s: number, l: number) => {
    const next = { h, s, l };
    setHsl(next);
    setHex(rgbToHex(hslToRgb(h, s, l)));
  };

  const setFromRgb = (r: number, g: number, b: number) => {
    const next = { r, g, b };
    setHex(rgbToHex(next));
    setHsl(rgbToHsl(next));
  };

  const copy = async (label: string, value: string) => {
    await copyText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 1200);
  };

  const rows: Array<{ label: string; value: string }> = [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hslFromHex.h}, ${hslFromHex.s}%, ${hslFromHex.l}%)` },
    { label: 'HSV', value: `hsv(${hslFromHex.h}, ${hslFromHex.s}%, ${Math.round(hslFromHex.l + (hslFromHex.s / 100) * Math.min(hslFromHex.l, 100 - hslFromHex.l))}%)` },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ];

  return (
    <div className="tool-ui">
      <div className="swatch-row">
        <div className="swatch" style={{ background: hex }} aria-label={`Current color ${hex}`} />
        <div className="color-inputs">
          <div className="kv">
            <label htmlFor="cp-picker">Pick</label>
            <input
              id="cp-picker"
              type="color"
              value={hex}
              onChange={e => setFromHex(e.target.value)}
              style={{ width: 56, height: 38, padding: 0, border: '1px solid var(--border)', borderRadius: 6, background: 'transparent', cursor: 'pointer' }}
              aria-label="Pick a color"
            />
          </div>
          <div className="kv">
            <label htmlFor="cp-hex">HEX</label>
            <input id="cp-hex" className="input" value={hex} onChange={e => setFromHex(e.target.value)} spellCheck={false} />
          </div>
          <div className="kv">
            <label htmlFor="cp-r">R</label>
            <input id="cp-r" className="input" type="number" min={0} max={255} value={rgb.r} onChange={e => setFromRgb(Number(e.target.value) || 0, rgb.g, rgb.b)} />
          </div>
          <div className="kv">
            <label htmlFor="cp-g">G</label>
            <input id="cp-g" className="input" type="number" min={0} max={255} value={rgb.g} onChange={e => setFromRgb(rgb.r, Number(e.target.value) || 0, rgb.b)} />
          </div>
          <div className="kv">
            <label htmlFor="cp-b">B</label>
            <input id="cp-b" className="input" type="number" min={0} max={255} value={rgb.b} onChange={e => setFromRgb(rgb.r, rgb.g, Number(e.target.value) || 0)} />
          </div>
          <div className="kv">
            <label htmlFor="cp-h">H</label>
            <input id="cp-h" className="input" type="number" min={0} max={359} value={hsl.h} onChange={e => setFromHsl(Number(e.target.value) || 0, hsl.s, hsl.l)} />
          </div>
          <div className="kv">
            <label htmlFor="cp-s">S%</label>
            <input id="cp-s" className="input" type="number" min={0} max={100} value={hsl.s} onChange={e => setFromHsl(hsl.h, Number(e.target.value) || 0, hsl.l)} />
          </div>
          <div className="kv">
            <label htmlFor="cp-l">L%</label>
            <input id="cp-l" className="input" type="number" min={0} max={100} value={hsl.l} onChange={e => setFromHsl(hsl.h, hsl.s, Number(e.target.value) || 0)} />
          </div>
        </div>
      </div>

      <div className="field">
        <label>Formats</label>
        {rows.map(row => (
          <div className="password-row" key={row.label}>
            <span className="badge">{row.label}</span>
            <code>{row.value}</code>
            <button className="icon-btn" onClick={() => copy(row.label, row.value)} aria-label={`Copy ${row.label}`}>
              {copied === row.label ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        ))}
      </div>

      <div className="field">
        <label>Text contrast</label>
        <div className="row">
          <div className="contrast-box" style={{ background: '#000000', color: hex, flex: 1 }}>
            Black text on {hex.toUpperCase()} — ratio {blackContrast.toFixed(2)}:1
            {blackContrast >= 7 && <span className="badge" style={{ marginLeft: 8 }}>AAA</span>}
            {blackContrast >= 4.5 && blackContrast < 7 && <span className="badge" style={{ marginLeft: 8 }}>AA</span>}
          </div>
          <div className="contrast-box" style={{ background: '#ffffff', color: hex, flex: 1 }}>
            White text on {hex.toUpperCase()} — ratio {whiteContrast.toFixed(2)}:1
            {whiteContrast >= 7 && <span className="badge" style={{ marginLeft: 8 }}>AAA</span>}
            {whiteContrast >= 4.5 && whiteContrast < 7 && <span className="badge" style={{ marginLeft: 8 }}>AA</span>}
          </div>
        </div>
      </div>

      <div className="alert info">
        WCAG AA requires 4.5:1 for normal text, 3:1 for large text. AAA requires 7:1.
        {isDark ? ' This color reads better with white text.' : ' This color reads better with black text.'}
      </div>
    </div>
  );
}
