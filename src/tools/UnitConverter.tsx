import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import './tools.css';

type Unit = { id: string; label: string; factor?: number };
const GROUPS: Record<string, Unit[]> = {
  length: [{ id: 'mm', label: 'Millimetres', factor: 0.001 }, { id: 'cm', label: 'Centimetres', factor: 0.01 }, { id: 'm', label: 'Metres', factor: 1 }, { id: 'km', label: 'Kilometres', factor: 1000 }, { id: 'in', label: 'Inches', factor: 0.0254 }, { id: 'ft', label: 'Feet', factor: 0.3048 }, { id: 'mi', label: 'Miles', factor: 1609.344 }],
  weight: [{ id: 'g', label: 'Grams', factor: 1 }, { id: 'kg', label: 'Kilograms', factor: 1000 }, { id: 'oz', label: 'Ounces', factor: 28.349523125 }, { id: 'lb', label: 'Pounds', factor: 453.59237 }],
  volume: [{ id: 'ml', label: 'Millilitres', factor: 1 }, { id: 'l', label: 'Litres', factor: 1000 }, { id: 'tsp', label: 'Teaspoons', factor: 4.92892159375 }, { id: 'tbsp', label: 'Tablespoons', factor: 14.78676478125 }, { id: 'cup', label: 'US cups', factor: 236.5882365 }, { id: 'gal', label: 'US gallons', factor: 3785.411784 }],
  area: [{ id: 'sqm', label: 'Square metres', factor: 1 }, { id: 'sqft', label: 'Square feet', factor: 0.09290304 }, { id: 'sqyd', label: 'Square yards', factor: 0.83612736 }, { id: 'acre', label: 'Acres', factor: 4046.8564224 }, { id: 'hectare', label: 'Hectares', factor: 10000 }],
  data: [{ id: 'byte', label: 'Bytes', factor: 1 }, { id: 'kb', label: 'Kilobytes', factor: 1000 }, { id: 'mb', label: 'Megabytes', factor: 1000000 }, { id: 'gb', label: 'Gigabytes', factor: 1000000000 }, { id: 'kib', label: 'Kibibytes', factor: 1024 }, { id: 'mib', label: 'Mebibytes', factor: 1048576 }],
};
function convert(value: number, category: string, from: string, to: string): number { if (category === 'temperature') { const c = from === 'c' ? value : from === 'f' ? (value - 32) * 5 / 9 : value - 273.15; return to === 'c' ? c : to === 'f' ? c * 9 / 5 + 32 : c + 273.15; } const units = GROUPS[category]; return value * (units.find(u => u.id === from)?.factor ?? 1) / (units.find(u => u.id === to)?.factor ?? 1); }
const TEMP: Unit[] = [{ id: 'c', label: 'Celsius' }, { id: 'f', label: 'Fahrenheit' }, { id: 'k', label: 'Kelvin' }];

export function UnitConverter() {
  const [category, setCategory] = useState('length'); const [from, setFrom] = useState('m'); const [to, setTo] = useState('ft'); const [input, setInput] = useState('1');
  const units = category === 'temperature' ? TEMP : GROUPS[category]; const value = Number(input); const result = Number.isFinite(value) ? convert(value, category, from, to) : NaN;
  const changeCategory = (next: string) => { const nextUnits = next === 'temperature' ? TEMP : GROUPS[next]; setCategory(next); setFrom(nextUnits[0].id); setTo(nextUnits[1]?.id ?? nextUnits[0].id); };
  return <div className="tool-ui">
    <div className="field"><label>Category</label><div className="tabs">{[['length', 'Length'], ['weight', 'Weight'], ['volume', 'Volume'], ['area', 'Area'], ['data', 'Data'], ['temperature', 'Temperature']].map(([id, label]) => <button key={id} className={`tab ${category === id ? 'active' : ''}`} onClick={() => changeCategory(id)}>{label}</button>)}</div></div>
    <div className="field"><label htmlFor="unit-value">Value</label><input id="unit-value" className="input" type="number" step="any" value={input} onChange={e => setInput(e.target.value)} /></div>
    <div className="field"><label htmlFor="unit-from">From</label><select id="unit-from" className="input" value={from} onChange={e => setFrom(e.target.value)}>{units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}</select></div>
    <div className="field"><label htmlFor="unit-to">To</label><select id="unit-to" className="input" value={to} onChange={e => setTo(e.target.value)}>{units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}</select></div>
    {Number.isFinite(result) && <div className="alert info" style={{ fontSize: '1.15rem' }}><ArrowRightLeft size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />{value} {units.find(u => u.id === from)?.label} = <strong>{result.toLocaleString(undefined, { maximumFractionDigits: 8 })} {units.find(u => u.id === to)?.label}</strong></div>}
  </div>;
}
