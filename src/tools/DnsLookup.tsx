import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import './tools.css';

type RecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SOA';

const DOH_ENDPOINTS: Record<string, string> = {
  Cloudflare: 'https://cloudflare-dns.com/dns-query',
  Google: 'https://dns.google/resolve',
};

interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

const TYPE_NAMES: Record<number, string> = {
  1: 'A', 2: 'NS', 5: 'CNAME', 6: 'SOA', 15: 'MX', 16: 'TXT', 28: 'AAAA',
};

export function DnsLookup() {
  const [domain, setDomain] = useState('example.com');
  const [recordType, setRecordType] = useState<RecordType>('A');
  const [provider, setProvider] = useState<'Cloudflare' | 'Google'>('Cloudflare');
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    const host = domain.trim().toLowerCase();
    if (!host || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host)) {
      setError('Enter a valid domain name, e.g. example.com');
      return;
    }
    setError('');
    setLoading(true);
    setRecords([]);
    setStatus(`Querying ${recordType} records for ${host} via ${provider} DNS-over-HTTPS…`);

    try {
      const url = `${DOH_ENDPOINTS[provider]}?name=${encodeURIComponent(host)}&type=${recordType}`;
      const res = await fetch(url, {
        headers: { accept: 'application/dns-json' },
      });
      if (!res.ok) throw new Error(`DNS server responded with HTTP ${res.status}`);

      const data = await res.json();
      const answer: DnsRecord[] = Array.isArray(data.Answer) ? data.Answer : [];
      setRecords(answer);

      if (data.Status !== 0 && data.Status !== 3) {
        setError(`DNS server returned status code ${data.Status}`);
        setStatus('');
        return;
      }
      if (answer.length === 0) {
        setStatus(`No ${recordType} records found for ${host} (or the domain doesn't exist).`);
      } else {
        setStatus(`${answer.length} ${recordType} record${answer.length === 1 ? '' : 's'} found for ${host}.`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lookup failed');
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="dns-domain">Domain</label>
        <div className="row">
          <input
            id="dns-domain"
            className="input"
            style={{ flex: 1, minWidth: 200 }}
            value={domain}
            onChange={e => setDomain(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') lookup(); }}
            placeholder="example.com"
            spellCheck={false}
          />
          <button className="btn" onClick={lookup} disabled={loading}><Search size={16} /> Lookup</button>
        </div>
      </div>

      <div className="field">
        <label>Record type</label>
        <div className="tabs" role="tablist">
          {(['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA'] as RecordType[]).map(t => (
            <button key={t} className={`tab ${recordType === t ? 'active' : ''}`} onClick={() => setRecordType(t)} role="tab" aria-selected={recordType === t}>{t}</button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Resolver</label>
        <div className="tabs" role="tablist">
          {(['Cloudflare', 'Google'] as const).map(p => (
            <button key={p} className={`tab ${provider === p ? 'active' : ''}`} onClick={() => setProvider(p)} role="tab" aria-selected={provider === p}>{p}</button>
          ))}
        </div>
      </div>

      {status && <div className="alert info">{status}</div>}
      {error && <div className="alert error"><AlertCircle size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />{error}</div>}

      {records.length > 0 && (
        <div className="field">
          <label>Records</label>
          <table className="result-table">
            <thead>
              <tr><th>Type</th><th>Name</th><th>TTL</th><th>Value</th></tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td><span className="badge">{TYPE_NAMES[r.type] ?? r.type}</span></td>
                  <td>{r.name}</td>
                  <td>{r.TTL}s</td>
                  <td>{r.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="alert info">
        Queries go directly from your browser to the {provider} DNS-over-HTTPS API (encrypted, CORS-enabled).
        Only the domain you enter is sent — no server-side resolution, no logs on our side.
      </div>
    </div>
  );
}
