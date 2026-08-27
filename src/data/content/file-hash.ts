import type { ToolContent } from './types';

export const fileHashContent: ToolContent = {
  slug: 'file-hash',
  intro: [
    'A file hash is a fingerprint: a fixed-length string that changes completely if even one byte of the file changes. That makes it the standard way to verify downloads, detect corruption, and check that a file is exactly what its publisher published.',
    'This tool computes MD5, SHA-1, SHA-256, and SHA-512 checksums of any local file — entirely in your browser. Files are read locally and never uploaded.',
  ],
  sections: [
    {
      heading: 'Verifying a download',
      paragraphs: [
        'Software publishers publish a checksum (usually SHA-256) on their download page. The workflow: download the file, compute its hash here, and compare the two strings. If they match, the file is byte-for-byte identical to what the publisher shipped — no corruption, no tampering in transit.',
        'Always prefer SHA-256 or SHA-512 for this. MD5 and SHA-1 are broken against deliberate tampering — an attacker can craft a different file with the same MD5 — so they are only safe for detecting accidental corruption.',
      ],
    },
    {
      heading: 'Which algorithm when?',
      paragraphs: [],
      list: [
        'SHA-256 — the modern standard for download verification, certificates, and Git.',
        'SHA-512 — a longer variant; used when a 512-bit output is needed.',
        'MD5 — legacy; still seen in old systems and as a fast cache key, but cryptographically broken.',
        'SHA-1 — deprecated since 2017 (real collisions demonstrated); avoid for security.',
      ],
    },
    {
      heading: 'Why hashing works',
      paragraphs: [
        'A cryptographic hash is a one-way function: it is trivial to compute, but infeasible to reverse or to find two different inputs with the same output (for secure algorithms). Even changing one character of a multi-gigabyte file produces a completely different hash — which is why a mismatch is definitive proof something changed.',
        'This tool hashes the file in memory via the Web Crypto API (with a local MD5 implementation for compatibility), so it works on files of any size your device can handle — no server involved at any step.',
      ],
    },
  ],
  faqs: [
    { q: 'What is a file checksum?', a: 'A hash of a file\u2019s entire contents — a fixed-length string that changes if any byte changes. Used to verify downloads and detect corruption or tampering.' },
    { q: 'How do I verify a downloaded file?', a: 'Compute its SHA-256 here and compare with the checksum on the publisher\u2019s site. Identical strings = identical files.' },
    { q: 'Is MD5 safe to use?', a: 'No, not against deliberate tampering — MD5 collisions can be crafted in seconds. It is fine for accidental-corruption checks but never for security verification.' },
    { q: 'Are large files supported?', a: 'Yes — hashing happens in your browser\u2019s memory via Web Crypto, so any file your device can open works. Very large files may take a moment.' },
    { q: 'Is my file uploaded?', a: 'Never. Files are read locally and hashed in your browser — nothing is transmitted.' },
  ],
  relatedSlugs: ['hash-generator', 'qr-decoder', 'password-strength'],
};
