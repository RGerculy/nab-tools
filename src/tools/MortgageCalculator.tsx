import { useState } from 'react';
import { Calculator } from 'lucide-react';
import './tools.css';

const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
export function MortgageCalculator() {
  const [principal, setPrincipal] = useState('250000'); const [rate, setRate] = useState('6.5'); const [years, setYears] = useState('30'); const [deposit, setDeposit] = useState('20');
  const home = Number(principal); const loan = home * (1 - Number(deposit) / 100); const months = Number(years) * 12; const monthlyRate = Number(rate) / 100 / 12; const payment = monthlyRate ? loan * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1) : loan / months; const total = payment * months;
  const valid = [home, loan, months, payment].every(n => Number.isFinite(n) && n >= 0) && months > 0;
  return <div className="tool-ui">
    <div className="field"><label htmlFor="mortgage-home">Property price</label><input id="mortgage-home" className="input" type="number" min="0" value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
    <div className="field"><label htmlFor="mortgage-deposit">Deposit (%)</label><input id="mortgage-deposit" className="input" type="number" min="0" max="100" step="0.1" value={deposit} onChange={e => setDeposit(e.target.value)} /></div>
    <div className="field"><label htmlFor="mortgage-rate">Annual interest rate (%)</label><input id="mortgage-rate" className="input" type="number" min="0" step="0.01" value={rate} onChange={e => setRate(e.target.value)} /></div>
    <div className="field"><label htmlFor="mortgage-years">Term (years)</label><input id="mortgage-years" className="input" type="number" min="1" max="50" value={years} onChange={e => setYears(e.target.value)} /></div>
    {valid && <><div className="row"><div className="count-card" style={{ flex: 1 }}><div className="num">{money(payment)}</div><div className="label">Monthly payment</div></div></div><table className="result-table"><tbody><tr><th>Loan amount</th><td>{money(loan)}</td></tr><tr><th>Total paid</th><td>{money(total)}</td></tr><tr><th>Total interest</th><td>{money(Math.max(0, total - loan))}</td></tr></tbody></table></>}
    <div className="alert info"><Calculator size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />This estimates principal and interest only. Taxes, insurance, fees, overpayments, and changing rates are not included.</div>
  </div>;
}
