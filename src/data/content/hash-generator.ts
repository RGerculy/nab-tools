import type { ToolContent } from './types';

export const hashGeneratorContent: ToolContent = {
  slug: 'hash-generator',
  intro: [
    'A hash is a fixed-length fingerprint of any input — a sentence, a file, a password. Change one character and the entire hash changes. That property makes hashes the backbone of password storage, file integrity checks, and digital signatures.',
    'This tool computes MD5, SHA-1, SHA-256, and SHA-512 for text or whole files, right in your browser using the Web Crypto API (with a fast MD5 implementation for legacy use). Your data never leaves your device — which matters when you are hashing something sensitive.',
  ],
  sections: [
    {
      heading: 'SHA-256 vs MD5 vs SHA-1: what to use and why',
      paragraphs: [
        'Each algorithm in this tool has a different story, and picking the right one matters:',
      ],
      list: [
        'SHA-256 — the modern default. Used by HTTPS certificates, Git, blockchain, and password hashing schemes (as part of PBKDF2). Collision-resistant for all practical purposes. Use this unless you have a reason not to.',
        'SHA-512 — a 64-bit variant with a longer digest and different internals. Useful when you need a 512-bit output, e.g. for certain protocols or key derivation.',
        'SHA-1 — broken since 2017 (Google demonstrated a real collision). Still seen in legacy systems and file fingerprints, but never use it for security.',
        'MD5 — broken for decades (collisions are trivial to construct). Still ubiquitous for quick checksums and cache keys. Fine for non-security integrity checks, never for passwords or signatures.',
      ],
    },
    {
      heading: 'Hashing vs encryption',
      paragraphs: [
        'A common confusion: hashing is not encryption. Encryption is reversible with a key; hashing is a one-way function — there is no key and no way to recover the input from the digest (beyond guessing).',
        'That one-way property is exactly why sites store password hashes instead of passwords. When a site is breached, attackers get hashes, not plaintext passwords — and a good hashing scheme (slow, salted) makes cracking those hashes expensive.',
      ],
    },
    {
      heading: 'Verifying file downloads',
      paragraphs: [
        'Hashes are how you verify that a downloaded file is exactly what the author published. Download sites list a SHA-256 checksum; you compute the hash of your downloaded copy and compare. If they match, the file is byte-for-byte identical — no corruption, no tampering.',
        'Use the file mode of this tool for that: select the file, choose SHA-256, and compare the result to the checksum shown on the download page. Always use SHA-256 or SHA-512 for this — MD5 and SHA-1 are no longer safe against deliberate tampering.',
      ],
    },
    {
      heading: 'Why plain hashing is not enough for passwords',
      paragraphs: [
        'If a site stores SHA-256(password) directly, an attacker with the hash list can still crack weak passwords quickly — fast hashes are cheap to brute-force, and identical passwords produce identical hashes (enabling rainbow-table attacks).',
        'Modern password storage uses deliberately slow, salted functions: bcrypt, scrypt, Argon2, or PBKDF2. A per-user random salt ensures identical passwords hash differently, and the computational cost makes guessing infeasible. If you are building a login system, use one of those — not a plain SHA-256.',
      ],
    },
  ],
  faqs: [
    { q: 'What is the difference between MD5, SHA-1, and SHA-256?', a: 'They are different hash algorithms with different digest lengths (128, 160, and 256 bits). SHA-256 is cryptographically secure and the modern choice; MD5 and SHA-1 are broken for security purposes but still used for checksums.' },
    { q: 'Can a hash be reversed?', a: 'No — hashing is one-way. You cannot compute the input from the digest. Attackers can only guess inputs and compare hashes (brute force or dictionary attacks), which is why slow salted functions are used for passwords.' },
    { q: 'Is MD5 safe to use?', a: 'Not for security. MD5 collisions can be created in seconds, enabling forged data. It remains fine for non-adversarial checksums (e.g. verifying a copy was not corrupted in transit).' },
    { q: 'What is a hash collision?', a: 'When two different inputs produce the same digest. For MD5 and SHA-1, collisions are practically constructible; for SHA-256 they are astronomically unlikely.' },
    { q: 'Why do two identical passwords produce different hashes on different sites?', a: 'Because the sites add a random salt before hashing. Salted hashing means identical passwords produce different digests, defeating rainbow tables and cross-site correlation.' },
    { q: 'Are my files uploaded when I hash them?', a: 'No. Hashing runs entirely in your browser. Files are read locally and never transmitted — which is why this tool is safe for hashing sensitive documents.' },
  ],
  relatedSlugs: ['password-generator', 'base64-tool', 'json-formatter'],
};
