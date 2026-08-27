import { useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Copy, Check, ScanLine, AlertCircle } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

interface Decoded {
  text: string;
  type: string;
}

export function QrDecoder() {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<Decoded | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError('');
    setResult(null);
    if (!file.type.startsWith('image/')) { setError('Please choose an image file (PNG, JPG, etc.).'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setPreview(reader.result as string);
        // Draw to canvas and decode
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, 2048 / Math.max(img.width, img.height));
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) { setError('Could not process image'); return; }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(data.data, data.width, data.height);
        if (code) {
          setResult({ text: code.data, type: code.location ? 'QR Code' : 'QR Code' });
        } else {
          setError('No QR code found in that image. Try a clearer, more cropped image.');
        }
      };
      img.onerror = () => setError('Could not load that image.');
      img.src = reader.result as string;
    };
    reader.onerror = () => setError('Could not read the file.');
    reader.readAsDataURL(file);
  };

  const copy = async () => {
    if (!result) return;
    await copyText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <label className="file-drop">
        <ScanLine size={20} style={{ display: 'block', margin: '0 auto 8px' }} />
        {preview ? 'Choose another image…' : 'Click to choose a QR code image — it never leaves your device'}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </label>

      {preview && (
        <div style={{ textAlign: 'center' }}>
          <img src={preview} alt="QR code preview" style={{ maxWidth: 220, maxHeight: 220, borderRadius: 8, border: '1px solid var(--border)' }} />
        </div>
      )}

      {error && <div className="alert error"><AlertCircle size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />{error}</div>}

      {result && (
        <div className="field">
          <label>Decoded content</label>
          <div className="output" style={{ maxHeight: 'none' }}>{result.text}</div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
            {result.text.startsWith('http') && (
              <a href={result.text} target="_blank" rel="noopener noreferrer" className="btn secondary">Open link</a>
            )}
          </div>
        </div>
      )}

      <div className="alert info">
        Decoding uses jsQR entirely in your browser — the image is never uploaded. Works with screenshots, photos, and downloaded QR images. For best results, crop tightly around the code.
      </div>
    </div>
  );
}
