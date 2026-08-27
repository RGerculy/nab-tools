import type { ToolContent } from './types';

export const ipCheckContent: ToolContent = {
  slug: 'ip-check',
  intro: [
    'Your public IP address is how the rest of the internet sees your connection — the "from" address on every request you make. Knowing it matters for configuring routers and firewalls, debugging network issues, setting up servers, and understanding your own privacy exposure.',
    'This tool shows your public IPv4 or IPv6 address plus approximate location and ISP details, fetched via a minimal client-side API call. It does not track you, store anything, or keep logs.',
  ],
  sections: [
    {
      heading: 'IPv4 vs IPv6',
      paragraphs: [
        'Two addressing schemes run the internet today. IPv4 uses 32-bit addresses like 37.59.111.216 — about 4.3 billion possible values, which ran out years ago. IPv6 uses 128-bit addresses like 2001:db8::1, an effectively inexhaustible pool.',
        'Most connections still use IPv4, often shared behind carrier-grade NAT. IPv6 adoption is growing steadily (roughly 40% of global users) and is the default on many mobile networks. This tool shows whichever your connection is using — check both from the same device to see the difference.',
      ],
    },
    {
      heading: 'Why your IP address changes (and why it matters)',
      paragraphs: [
        'Residential ISPs usually assign dynamic IPs that change on reconnect, while business lines often get static ones. If you host a server at home, a static IP (or a dynamic-DNS service) is required so clients can find you.',
        'Your IP also reveals your approximate location and ISP to every website you visit — that is why ad networks, streaming services, and geo-blocked content use it. Using a VPN masks it, but note that a VPN only hides your IP from the sites you visit; it does not make you anonymous.',
      ],
    },
    {
      heading: 'Using this for troubleshooting',
      paragraphs: [
        'A surprising number of problems trace back to IP configuration:',
      ],
      list: [
        'Remote access failing — confirm the public IP your connection is currently using; it may have changed since your last check.',
        'Port forwarding not working — verify you are testing from outside your network, and confirm the public IP matches the one your router reports.',
        'VPN not connecting — check whether your ISP is using CGNAT (your public IP would differ from your router\u2019s WAN IP).',
        'Blocked or throttled — knowing your IP lets you check if it is on a blocklist (via services like Spamhaus or MXToolbox).',
      ],
    },
    {
      heading: 'Privacy: what your IP says about you',
      paragraphs: [
        'An IP address is personally identifying information under many privacy laws. Combined with browsing activity, it can reveal your ISP, city, and approximate home location.',
        'If that bothers you: use a reputable VPN, prefer HTTPS everywhere (your browser mostly does this automatically now), and be aware that Tor goes further than a VPN. Also note that this page itself only sees the request, not your identity — we do not log IPs.',
      ],
    },
  ],
  faqs: [
    { q: 'What is my IP address?', a: 'This tool shows it — your public IPv4 or IPv6 address as seen from the internet, plus approximate city, region, ISP, and ASN.' },
    { q: 'What is the difference between public and private IP?', a: 'Private IPs (like 192.168.x.x) are used inside your home network and are not reachable from the internet. Your public IP is the single address the outside world sees for your connection.' },
    { q: 'Can someone find my exact location from my IP?', a: 'Generally only the city level, via ISP records. The IP-to-location databases used by websites are approximate and often wrong at street level. Exact location requires other data.' },
    { q: 'Why does my IP keep changing?', a: 'Most residential ISPs assign dynamic IPs that rotate on reconnect or periodically. If you need a stable address for hosting or remote access, request a static IP or use dynamic DNS.' },
    { q: 'Does a VPN hide my IP?', a: 'Yes — websites then see the VPN server\u2019s IP instead of yours. But the VPN provider sees your real IP, so choose a no-logs provider you trust.' },
    { q: 'Is looking up my IP safe?', a: 'Yes. This tool sends one request to a public API to fetch your address. No data is stored, no tracking cookies are set, and the lookup happens entirely in your browser.' },
  ],
  relatedSlugs: ['dns-lookup', 'password-generator', 'hash-generator'],
};
