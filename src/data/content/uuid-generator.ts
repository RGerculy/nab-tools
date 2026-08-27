import type { ToolContent } from './types';

export const uuidGeneratorContent: ToolContent = {
  slug: 'uuid-generator',
  intro: [
    'A UUID (Universally Unique Identifier) — also called GUID — is a 128-bit identifier formatted as 36 characters: 8-4-4-4-12 hex digits, like 3f2504e0-4f89-41d3-9a0c-0305e82c3301. Their defining property: you can generate them freely without coordinating with anyone, and the chance of collision is vanishingly small.',
    'This tool generates RFC 4122 version 4 UUIDs — the random variant — using your browser\u2019s cryptographically secure random source. Batch generation, copy-all, and CSV export are included, all fully client-side.',
  ],
  sections: [
    {
      heading: 'Why UUIDs exist',
      paragraphs: [
        'Databases and distributed systems need identifiers that do not require a central authority. An auto-increment ID requires asking the database for the next number, which becomes a bottleneck and a coordination problem across replicas and services. A UUID can be minted anywhere, by anyone, at any time — no round trip, no conflict.',
        'That is why UUIDs show up in API design, event sourcing, distributed databases, and anywhere records are created offline or in parallel.',
      ],
    },
    {
      heading: 'UUID versions and when they matter',
      paragraphs: [
        'UUIDs come in several versions. The difference is how the 122 random/semantic bits are generated:',
      ],
      list: [
        'v4 (random) — all bits random. What this tool generates. Perfect for identifiers where randomness is fine and you want zero information leakage.',
        'v1 (time-based) — encodes the timestamp and the generating machine\u2019s MAC address. Sortable by creation time, but leaks when and where the ID was created — a privacy consideration.',
        'v7 (time-ordered) — timestamp-prefixed with random suffix. Sortable like v1 without the MAC leakage. Gaining popularity for database indexes because it is monotonic.',
        'v3/v5 (name-based) — deterministic hashes of a namespace + name. Same input always yields the same UUID — useful for deduplication and idempotency keys.',
      ],
    },
    {
      heading: 'Are UUIDs unique in practice?',
      paragraphs: [
        'A v4 UUID has 122 random bits. The birthday bound means you would need to generate about 2^61 UUIDs (roughly 2.3 quintillion) before reaching a 50% chance of any collision. For any real-world system, collisions are effectively impossible.',
        'That said, "effectively impossible" assumes a good random source. Using a weak PRNG (like Math.random() in some environments) can produce patterns that collapse the space. This tool uses crypto.getRandomValues(), the same source as encryption keys.',
      ],
    },
    {
      heading: 'UUIDs as database primary keys',
      paragraphs: [
        'UUID primary keys are common in modern apps, but they have a known trade-off: random keys fragment B-tree indexes, hurting insert performance on large tables. Options include using v7 (time-ordered) UUIDs, ULIDs, or storing the UUID as BINARY(16) rather than as a 36-character string.',
        'For most applications the performance impact is negligible. The real win — no coordination, no enumeration, safe merging of data from multiple sources — usually outweighs it.',
      ],
    },
  ],
  faqs: [
    { q: 'What is a UUID?', a: 'A Universally Unique Identifier: a 128-bit value formatted as 8-4-4-4-12 hex digits. It can be generated independently by any system with a negligible chance of collision.' },
    { q: 'Is a UUID guaranteed to be unique?', a: 'Not mathematically guaranteed, but practically yes. A v4 UUID has 122 random bits; collisions require generating quintillions of them. No real-world system will ever hit that.' },
    { q: 'What is the difference between UUID v4 and v1?', a: 'v4 is fully random. v1 encodes a timestamp and the generating machine\u2019s MAC address — sortable by creation time, but it leaks when and where the ID was made.' },
    { q: 'What is a GUID?', a: 'GUID is Microsoft\u2019s name for the same thing. UUID and GUID are interchangeable in practice; GUIDs generated on Windows are usually v4 (random).' },
    { q: 'How many UUIDs are there?', a: '2^128 possible values — about 3.4 × 10^38, or 340 undecillion. More than the number of grains of sand on Earth.' },
    { q: 'Are UUIDs safe to expose publicly?', a: 'v4 (random) UUIDs reveal nothing about the system that created them and are safe to expose — which is why they are common in public API URLs. v1 UUIDs leak timing and hardware info and should not be public.' },
  ],
  relatedSlugs: ['password-generator', 'hash-generator', 'base64-tool'],
};
