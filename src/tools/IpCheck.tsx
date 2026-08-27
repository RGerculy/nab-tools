import { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import './tools.css';

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  isp?: string;
  org?: string;
  asn?: string;
  timezone?: string;
  lat?: number;
  lon?: number;
  version?: string;
}

export function IpCheck() {
  const [info, setInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchIp = async () => {
    setLoading(true);
    setError('');
    try {
      // ipify gives the public IP; ip-api gives location details (free, HTTP only for non-commercial)
      const ipRes = await fetch('https://api.ipify.org?format=json');
      if (!ipRes.ok) throw new Error('Could not fetch IP');
      const ipData = await ipRes.json();

      const details: Partial<IpInfo> = {};
      try {
        const geoRes = await fetch(`https://ip-api.com/json/${ipData.ip}?fields=status,message,city,region,country,countryCode,isp,org,as,timezone,lat,lon,query`);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.status === 'success') {
            details.city = geo.city;
            details.region = geo.region;
            details.country = geo.country;
            details.countryCode = geo.countryCode;
            details.isp = geo.isp;
            details.org = geo.org;
            details.asn = geo.as;
            details.timezone = geo.timezone;
            details.lat = geo.lat;
            details.lon = geo.lon;
          }
        }
      } catch {
        // Geo lookup is best-effort
      }

      setInfo({
        ip: ipData.ip,
        version: ipData.ip.includes(':') ? 'IPv6' : 'IPv4',
        ...details,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch IP');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIp(); }, []);

  const rows: Array<{ label: string; value?: string }> = [
    { label: 'IP address', value: info?.ip },
    { label: 'Version', value: info?.version },
    { label: 'City', value: info?.city },
    { label: 'Region', value: info?.region },
    { label: 'Country', value: info?.countryCode ? `${info.country} (${info.countryCode})` : info?.country },
    { label: 'ISP', value: info?.isp },
    { label: 'Organization', value: info?.org },
    { label: 'ASN', value: info?.asn },
    { label: 'Timezone', value: info?.timezone },
    { label: 'Coordinates', value: info?.lat !== undefined ? `${info.lat.toFixed(4)}, ${info.lon?.toFixed(4)}` : undefined },
  ];

  return (
    <div className="tool-ui">
      {loading ? (
        <div className="alert info">Detecting your public IP address…</div>
      ) : error ? (
        <div className="alert error"><AlertCircle size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />{error}</div>
      ) : (
        <>
          <div className="ip-grid">
            {rows.filter(r => r.value).map(r => (
              <div className="ip-card" key={r.label}>
                <div className="label">{r.label}</div>
                <div className="value">{r.value}</div>
              </div>
            ))}
          </div>
          <div className="row">
            <button className="btn secondary" onClick={fetchIp}><RefreshCw size={16} /> Refresh</button>
          </div>
        </>
      )}

      <div className="alert info">
        Your IP is fetched via <a href="https://www.ipify.org" rel="noopener noreferrer" target="_blank">ipify.org</a> (open API, no key needed);
        approximate location comes from <a href="https://ip-api.com" rel="noopener noreferrer" target="_blank">ip-api.com</a>.
        Only your IP address is sent to answer this lookup — no tracking on our side.
      </div>
    </div>
  );
}
