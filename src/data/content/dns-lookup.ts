import type { ToolContent } from './types';

export const dnsLookupContent: ToolContent = {
  slug: 'dns-lookup',
  intro: [
    'DNS (Domain Name System) is the phone book of the internet. When you type a domain like example.com, DNS translates it into the IP address your browser actually connects to — something like 93.184.216.34. A DNS lookup lets you inspect those records directly and see exactly what a domain resolves to.',
    'This tool queries public DNS resolvers (Cloudflare and Google) using encrypted DNS-over-HTTPS (DoH) directly from your browser. No server in the middle, no logs on our side — the query goes straight from your device to the resolver.',
  ],
  sections: [
    {
      heading: 'What are the different DNS record types?',
      paragraphs: [
        'Each record type answers a different question about a domain. Here is what the most common ones mean and when you would look at them:',
      ],
      list: [
        'A — maps a domain to an IPv4 address. The most fundamental record; this is what your browser needs to load a website.',
        'AAAA — maps a domain to an IPv6 address. IPv6 is gradually replacing IPv4, so most modern domains have both A and AAAA records.',
        'CNAME — aliases one domain to another (e.g. www.example.com → example.com). The target is resolved separately. CNAMEs are common for subdomains and CDN integrations.',
        'MX — mail exchange records; tells mail servers where to deliver email for the domain, with a priority number (lower = preferred).',
        'TXT — free-form text records, used for verification (Google Search Console, domain ownership), email authentication (SPF, DKIM, DMARC), and more.',
        'NS — nameserver records; declares which DNS servers are authoritative for the domain.',
        'SOA — start of authority; contains the primary nameserver, the admin contact, and timing values like refresh and TTL.',
      ],
    },
    {
      heading: 'How to use DNS lookup for troubleshooting',
      paragraphs: [
        'A DNS lookup is the first step in diagnosing almost any connectivity problem. "The site is down" is often really "the DNS is wrong."',
        'If a website does not load, check its A and AAAA records first. If they are missing or point to the wrong IP, the problem is DNS, not the web server. If email is not arriving, check MX and TXT records — a missing SPF or DKIM record is a common cause of emails landing in spam.',
        'If you changed DNS records and the change has not taken effect, look at the TTL (time-to-live) shown on each record. That number is how many seconds resolvers cache the old value. A high TTL like 86400 (24 hours) means changes can take a day to propagate everywhere.',
      ],
    },
    {
      heading: 'Why use DNS-over-HTTPS?',
      paragraphs: [
        'Traditional DNS queries are sent in plaintext, which means your ISP (or anyone on your network) can see every domain you visit. DNS-over-HTTPS encrypts the query and sends it inside a normal HTTPS request to a public resolver like Cloudflare 1.1.1.1 or Google Public DNS.',
        'The practical benefits: privacy from snooping on your network, protection against DNS spoofing or hijacking, and often faster lookups because public resolvers have huge caches. The trade-off is that you are trusting that resolver with your queries — which is why this tool lets you choose between Cloudflare and Google.',
      ],
    },
    {
      heading: 'Common pitfalls when reading DNS results',
      paragraphs: [],
      list: [
        'A domain can have multiple A or AAAA records — that is normal. It is load balancing, not a misconfiguration.',
        'CNAME records cannot coexist with other record types at the same name (this is a rule of the DNS standard). If you see a CNAME, expect it to be the only record there.',
        'MX records point to hostnames, not IPs. To find the IP of a mail server, do a second lookup on the MX target hostname.',
        'TTL is shown in seconds. Divide by 3600 for hours or 86400 for days when judging propagation time.',
        'A status code of 0 from the resolver means NOERROR — the domain exists and the lookup succeeded. NXDOMAIN (3) means the domain itself does not exist.',
      ],
    },
    {
      heading: 'Tips for site owners',
      paragraphs: [
        'Run this lookup on your own domain regularly. You want to see A/AAAA records pointing at your host, NS records matching your registrar or DNS provider, and TXT records containing valid SPF/DKIM/DMARC entries.',
        'Before switching hosting, note the TTL of your existing records and lower it to 300 (5 minutes) a day or two in advance. The change propagates far faster, and you avoid a long outage window during the migration.',
        'Use CNAME records for www and CDN subdomains instead of duplicating A records — it makes future IP changes a one-place edit.',
      ],
    },
  ],
  faqs: [
    { q: 'What is a DNS lookup?', a: 'A DNS lookup queries the Domain Name System to find what records exist for a domain — for example, which IP address a domain points to (A/AAAA), which servers handle its email (MX), or who is authoritative for it (NS).' },
    { q: 'What does TTL mean in DNS?', a: 'TTL (time-to-live) is how many seconds a DNS record may be cached by resolvers before they must re-query. A TTL of 3600 means changes to that record can take up to an hour to propagate to cached clients.' },
    { q: 'What is the difference between A and AAAA records?', a: 'An A record maps a domain to an IPv4 address (e.g. 93.184.216.34). An AAAA record maps it to an IPv6 address (e.g. 2606:2800:220:1:248:1893:25c8:1946).' },
    { q: 'What is DNS propagation and how long does it take?', a: 'DNS propagation is the time it takes for a record change to reach resolvers worldwide. It can take anywhere from minutes to 48 hours, depending on the TTL of the old records and how aggressively resolvers cache.' },
    { q: 'Why are there multiple A records for my domain?', a: 'Multiple A records are normal — they are used for round-robin load balancing and failover. The resolver picks one at random per query, spreading traffic across servers.' },
    { q: 'Is DNS lookup safe to use with sensitive domains?', a: 'Yes — this tool sends your query via encrypted DNS-over-HTTPS to a major public resolver. No server of ours sees the query, and the resolver sees the same thing it would see from any DoH client.' },
    { q: 'What is a CNAME record used for?', a: 'A CNAME aliases one hostname to another, e.g. www.example.com to example.com, or a subdomain to a CDN. The resolver then looks up the target hostname to get the final IP.' },
  ],
  relatedSlugs: ['ip-check', 'hash-generator', 'base64-tool'],
};
