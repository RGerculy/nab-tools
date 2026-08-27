import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export function TemperatureConverter() {
  const [input, setInput] = useState('21');
  const [fromUnit, setFromUnit] = useState<'c' | 'f' | 'k'>('c');

  const value = parseFloat(input);

  const celsius = fromUnit === 'c' ? value : fromUnit === 'f' ? (value - 32) * 5 / 9 : value - 273.15;
  const fahrenheit = celsius * 9 / 5 + 32;
  const kelvin = celsius + 273.15;

  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (label: string, text: string) => {
    await copyText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1200);
  };

  const rows = [
    { label: 'Celsius', value: `${round(celsius)} °C` },
    { label: 'Fahrenheit', value: `${round(fahrenheit)} °F` },
    { label: 'Kelvin', value: `${round(kelvin)} K` },
  ];

  const sensible = !Number.isNaN(celsius);

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="temp-in">Value</label>
        <div className="num-row">
          <input id="temp-in" type="number" step="any" value={input} onChange={e => setInput(e.target.value)} />
          <div className="tabs" role="tablist" style={{ marginLeft: 8 }}>
            {([['c', '°C'], ['f', '°F'], ['k', 'K']] as const).map(([u, label]) => (
              <button key={u} className={`tab ${fromUnit === u ? 'active' : ''}`} onClick={() => setFromUnit(u)} role="tab" aria-selected={fromUnit === u}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {sensible && (
        <div className="field">
          <label>Converted</label>
          <table className="result-table">
            <tbody>
              {rows.map(r => (
                <tr key={r.label}>
                  <th>{r.label}</th>
                  <td style={{ fontWeight: 700, fontSize: '1.05rem' }}>{r.value}</td>
                  <td>
                    <button className="icon-btn" onClick={() => copy(r.label, r.value)} aria-label={`Copy ${r.label}`}>
                      {copied === r.label ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="alert info">
        Formulas: °F = °C × 9/5 + 32 · °C = (°F − 32) × 5/9 · K = °C + 273.15. Useful anchors: 0°C = 32°F (freezing), 100°C = 212°F (boiling), 21°C ≈ room temperature.
      </div>
    </div>
  );
}
