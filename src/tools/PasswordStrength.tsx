import { useMemo, useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import './tools.css';

interface CheckResult {
  label: string;
  ok: boolean;
}

function estimateBits(pw: string): number {
  if (!pw) return 0;
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 33;
  return Math.round(pw.length * Math.log2(pool || 1));
}

function crackTime(bits: number): string {
  if (bits <= 0) return '—';
  if (bits < 28) return 'Instant';
  if (bits < 36) return 'Minutes';
  if (bits < 44) return 'Hours';
  if (bits < 52) return 'Days';
  if (bits < 60) return 'Months';
  if (bits < 68) return 'Years';
  if (bits < 76) return 'Centuries';
  return 'Effectively forever';
}

export function PasswordStrength() {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);

  const checks: CheckResult[] = useMemo(() => [
    { label: 'At least 8 characters', ok: pw.length >= 8 },
    { label: 'At least 12 characters', ok: pw.length >= 12 },
    { label: 'Uppercase (A-Z)', ok: /[A-Z]/.test(pw) },
    { label: 'Lowercase (a-z)', ok: /[a-z]/.test(pw) },
    { label: 'Number (0-9)', ok: /[0-9]/.test(pw) },
    { label: 'Symbol (!@#$…)', ok: /[^a-zA-Z0-9]/.test(pw) },
    { label: 'No repeated characters', ok: !/(.)\1{2,}/.test(pw) },
    { label: 'No common words / sequences', ok: !/(password|123456|qwerty|letmein|admin|iloveyou|abc123|111111)/i.test(pw) },
  ], [pw]);

  const bits = useMemo(() => estimateBits(pw), [pw]);
  const passed = checks.filter(c => c.ok).length;
  const score = pw ? Math.min(5, Math.max(1, Math.round((passed / checks.length) * 5))) : 0;
  const labels = ['', 'Very weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="ps-pw">Password to test</label>
        <div className="row">
          <input
            id="ps-pw"
            className="input"
            type={show ? 'text' : 'password'}
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Type a password…"
            style={{ flex: 1, minWidth: 200, fontFamily: 'ui-monospace, Consolas, monospace' }}
          />
          <button className="btn secondary" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="field">
        <label>Score</label>
        <div className="strength">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`strength-seg ${i <= score ? 'on' : ''}`} />
          ))}
        </div>
        <div className="strength-label">
          {pw ? (
            <>
              <strong>{labels[score]}</strong> · {bits.toLocaleString()} bits of entropy · estimated crack time: <strong>{crackTime(bits)}</strong>
            </>
          ) : 'Type a password to see its strength.'}
        </div>
      </div>

      {pw && (
        <div className="field">
          <label>Checks</label>
          <div className="check-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {checks.map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: c.ok ? 'var(--accent)' : 'var(--fg-muted)' }}>
                {c.ok ? <Check size={15} /> : <X size={15} />}
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="alert info">
        Entropy estimates assume an offline attacker using common guessing techniques — not a targeted attack. Your password is analyzed entirely in your browser and never transmitted or stored.
      </div>
    </div>
  );
}
