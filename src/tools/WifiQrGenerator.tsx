import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Check, Wifi } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const ENCRYPTIONS = [
  { value: 'WPA', label: 'WPA / WPA2 / WPA3 (most common)' },
  { value: 'WEP', label: 'WEP (legacy, avoid)' },
  { value: 'nopass', label: 'Open network (no password)' },
] as const;

export function WifiQrGenerator() {
  const [ssid, setSsid] = useState('MyHomeWiFi');
  const [password, setPassword] = useState('correct-horse-battery');
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [hidden, setHidden] = useState(false);
  const size = 256;
  const [copied, setCopied] = useState(false);

  // Build the WIFI: URI per the de-facto standard used by phones and cameras.
  const wifiString =
    `WIFI:T:${encryption};S:${escapeField(ssid)};` +
    (encryption !== 'nopass' ? `P:${escapeField(password)};` : '') +
    (hidden ? 'H:true;' : '') +
    ';';

  const valid = ssid.trim().length > 0 && (encryption === 'nopass' || password.length > 0);

  const downloadPng = () => {
    const svg = document.getElementById('wifi-qr-svg') as unknown as SVGSVGElement;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.width = size * 4;
    canvas.height = size * 4;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'wifi-qr.png';
      a.click();
    };
    img.src = url;
  };

  const copy = async () => {
    await copyText(wifiString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="wifi-ssid">Network name (SSID)</label>
        <input id="wifi-ssid" className="input" type="text" value={ssid} onChange={e => setSsid(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="wifi-pass">Password</label>
        <input id="wifi-pass" className="input" type="text" value={password} onChange={e => setPassword(e.target.value)} disabled={encryption === 'nopass'} placeholder={encryption === 'nopass' ? 'No password needed' : ''} />
      </div>

      <div className="field">
        <label>Security type</label>
        <div className="tabs" role="tablist">
          {ENCRYPTIONS.map(e => (
            <button key={e.value} className={`tab ${encryption === e.value ? 'active' : ''}`} onClick={() => setEncryption(e.value)} role="tab" aria-selected={encryption === e.value}>{e.label}</button>
          ))}
        </div>
      </div>

      <div className="field">
        <label className="check" style={{ display: 'inline-flex' }}>
          <input type="checkbox" checked={hidden} onChange={e => setHidden(e.target.checked)} />
          Hidden network (don't broadcast SSID)
        </label>
      </div>

      {!valid && <div className="alert info">Enter a network name (and a password, unless it's open) to generate the QR code.</div>}

      {valid && (
        <div className="field" style={{ textAlign: 'center' }}>
          <div style={{ background: '#fff', padding: 16, borderRadius: 12, display: 'inline-block' }}>
            <QRCodeSVG id="wifi-qr-svg" value={wifiString} size={size} level="M" fgColor="#000000" bgColor="#ffffff" />
          </div>
          <div className="row" style={{ justifyContent: 'center', marginTop: 12 }}>
            <button className="btn" onClick={downloadPng}><Download size={16} /> PNG</button>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Wifi size={16} />} Copy WiFi string</button>
          </div>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', marginTop: 8 }}>
            Scan with any phone camera to join. No app needed.
          </p>
        </div>
      )}
    </div>
  );
}

/** Escape special characters (\, ; , : ") in a WIFI: field per the convention. */
function escapeField(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1');
}
