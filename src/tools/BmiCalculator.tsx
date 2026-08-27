import { useState } from 'react';
import { HeartPulse, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

type Unit = 'metric' | 'imperial';

function bmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: '#f5a623' };
  if (bmi < 25) return { label: 'Normal weight', color: 'var(--accent)' };
  if (bmi < 30) return { label: 'Overweight', color: '#f5a623' };
  return { label: 'Obese', color: 'var(--danger)' };
}

function healthyRange(heightCm: number): string {
  // BMI 18.5-24.9
  const lo = 18.5 * Math.pow(heightCm / 100, 2);
  const hi = 24.9 * Math.pow(heightCm / 100, 2);
  return `${lo.toFixed(0)}–${hi.toFixed(0)} kg`;
}

export function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>('metric');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [copied, setCopied] = useState(false);

  const h = parseFloat(height);
  const w = parseFloat(weight);

  const heightCm = unit === 'metric' ? h : h * 2.54;
  const weightKg = unit === 'metric' ? w : w * 0.453592;

  const bmi = heightCm > 0 && weightKg > 0 ? weightKg / Math.pow(heightCm / 100, 2) : null;
  const cat = bmi ? bmiCategory(bmi) : null;

  const copy = async () => {
    if (bmi === null || !cat) return;
    await copyText(`BMI: ${bmi.toFixed(1)} (${cat.label})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="tabs" role="tablist">
        <button className={`tab ${unit === 'metric' ? 'active' : ''}`} onClick={() => setUnit('metric')} role="tab" aria-selected={unit === 'metric'}>Metric</button>
        <button className={`tab ${unit === 'imperial' ? 'active' : ''}`} onClick={() => setUnit('imperial')} role="tab" aria-selected={unit === 'imperial'}>Imperial</button>
      </div>

      <div className="row">
        <div className="field" style={{ flex: 1, minWidth: 140 }}>
          <label htmlFor="bmi-h">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
          <div className="num-row">
            <input id="bmi-h" type="number" step="any" value={height} onChange={e => setHeight(e.target.value)} />
          </div>
        </div>
        <div className="field" style={{ flex: 1, minWidth: 140 }}>
          <label htmlFor="bmi-w">Weight ({unit === 'metric' ? 'kg' : 'lb'})</label>
          <div className="num-row">
            <input id="bmi-w" type="number" step="any" value={weight} onChange={e => setWeight(e.target.value)} />
          </div>
        </div>
      </div>

      {bmi !== null && cat && (
        <>
          <div className="count-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
            <div className="count-card">
              <div className="num" style={{ color: cat.color }}>{bmi.toFixed(1)}</div>
              <div className="label">BMI</div>
            </div>
            <div className="count-card">
              <div className="num" style={{ fontSize: '1.2rem', color: cat.color }}>{cat.label}</div>
              <div className="label">Category</div>
            </div>
            <div className="count-card">
              <div className="num" style={{ fontSize: '1.2rem' }}>{healthyRange(heightCm)}</div>
              <div className="label">Healthy weight</div>
            </div>
          </div>
          <div className="row">
            <button className="btn secondary" onClick={copy}><HeartPulse size={16} /> Copy</button>
            {copied && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}><Check size={14} style={{ verticalAlign: '-2px' }} /> Copied</span>}
          </div>
        </>
      )}

      <div className="alert info">
        BMI = weight ÷ height² (kg/m²). Categories: &lt;18.5 underweight · 18.5–24.9 normal · 25–29.9 overweight · 30+ obese. BMI is a population screening tool — it does not account for muscle mass, age, or body composition.
      </div>
    </div>
  );
}
