import { useEffect, useRef, useState } from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';
import './tools.css';

export function ImageResizer() {
  const [source, setSource] = useState(''); const [name, setName] = useState('resized-image'); const [width, setWidth] = useState(800); const [height, setHeight] = useState(600); const [locked, setLocked] = useState(true); const [quality, setQuality] = useState(0.85); const [format, setFormat] = useState('image/jpeg'); const [ratio, setRatio] = useState(800 / 600); const imageRef = useRef<HTMLImageElement>(null); const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => () => { if (source) URL.revokeObjectURL(source); }, [source]);
  const file = (event: React.ChangeEvent<HTMLInputElement>) => { const picked = event.target.files?.[0]; if (!picked) return; if (source) URL.revokeObjectURL(source); const url = URL.createObjectURL(picked); setSource(url); setName(picked.name.replace(/\.[^.]+$/, '') || 'resized-image'); const img = new window.Image(); img.onload = () => { setWidth(img.naturalWidth); setHeight(img.naturalHeight); setRatio(img.naturalWidth / img.naturalHeight); }; img.src = url; };
  const resizeWidth = (value: number) => { setWidth(value); if (locked && ratio) setHeight(Math.max(1, Math.round(value / ratio))); }; const resizeHeight = (value: number) => { setHeight(value); if (locked && ratio) setWidth(Math.max(1, Math.round(value * ratio))); };
  const download = () => { const img = imageRef.current; const canvas = canvasRef.current; if (!img || !canvas) return; canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d'); if (!ctx) return; ctx.drawImage(img, 0, 0, width, height); const a = document.createElement('a'); a.href = canvas.toDataURL(format, quality); a.download = `${name}.${format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg'}`; a.click(); };
  return <div className="tool-ui">
    <div className="field"><label htmlFor="image-file">Image file</label><input id="image-file" className="input" type="file" accept="image/*" onChange={file} /></div>
    {source && <><img ref={imageRef} src={source} alt="Selected preview" style={{ maxWidth: '100%', maxHeight: 260, objectFit: 'contain', borderRadius: 8 }} /><canvas ref={canvasRef} hidden />
      <div className="field"><label>Output size</label><div className="num-row"><input type="number" min="1" value={width} onChange={e => resizeWidth(Number(e.target.value))} /><span>×</span><input type="number" min="1" value={height} onChange={e => resizeHeight(Number(e.target.value))} /><label className="check"><input type="checkbox" checked={locked} onChange={e => setLocked(e.target.checked)} /> Keep ratio</label></div></div>
      <div className="field"><label htmlFor="image-format">Format</label><select id="image-format" className="input" value={format} onChange={e => setFormat(e.target.value)}><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div>
      {format !== 'image/png' && <div className="field"><label htmlFor="image-quality">Quality — {Math.round(quality * 100)}%</label><input id="image-quality" type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} /></div>}
      <button className="btn" onClick={download}><Download size={16} /> Resize and download</button>
    </>}
    {!source && <div className="alert info"><ImageIcon size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />Choose an image to preview and resize it locally.</div>}
  </div>;
}
