import type { ToolContent } from './types';

export const passwordStrengthContent: ToolContent = {
  slug: 'password-strength',
  intro: [
    'Is "Tr0ub4dor&3" actually strong? Spoiler: no. This tester scores any password against the metrics security experts actually use — length, character variety, entropy in bits, and estimated time to crack — with a checklist you can work through.',
    'Everything runs in your browser: your password is analyzed locally and never transmitted, stored, or logged. Test your real passwords here without fear.',
  ],
  sections: [
    {
      heading: 'Entropy: the number that matters',
      paragraphs: [
        'Password strength is measured in entropy — bits of uncertainty. Each bit doubles the guessing difficulty: a 40-bit password has about a trillion combinations; a 60-bit one has a quadrillion times more. This tool estimates entropy from length and character pool: 26 (lowercase), 52 (+uppercase), 62 (+digits), 95 (+symbols).',
        'The practical floor for a modern password is roughly 60–70 bits; anything under ~50 bits is crackable with consumer hardware given time.',
      ],
    },
    {
      heading: 'What "time to crack" really means',
      paragraphs: [
        'The crack-time estimate assumes an offline attacker with the password hash, using optimized hardware and common cracking techniques. Online attacks (guessing against a live login) are far slower thanks to rate-limiting, so a "days" offline estimate is often still safe online.',
        'The estimates here are deliberately conservative — real crackers may be faster with GPU clusters, and dictionary-based attacks can crack human-chosen passwords far faster than brute force would suggest. That is why the checklist also flags common words and repeated characters.',
      ],
    },
    {
      heading: 'The checklist philosophy',
      paragraphs: [
        'Rather than a mysterious 0–100 score, this tool shows a concrete checklist: length, character classes, repeats, common patterns. Each item is actionable — see what is missing and fix it. The score is just the summary; the checklist is the plan.',
      ],
      tip: 'The fastest way to a strong password: use the password generator to create a 16+ character random string. Testing your own "clever" passwords almost always loses to randomness.',
    },
  ],
  faqs: [
    { q: 'What is a good password strength score?', a: 'Aim for "Strong": 60+ bits of entropy, which typically means 12+ random characters with mixed types, or a 5+ word passphrase. Anything labeled "Fair" or below is worth replacing.' },
    { q: 'Is testing my password here safe?', a: 'Yes — analysis runs entirely in your browser. Your password never leaves your device, so it is safe to test real passwords.' },
    { q: 'What is entropy in bits?', a: 'A measure of how many guesses an attacker must try on average. Each bit doubles the search space: 52 bits is 2^52 ≈ 4.5 quadrillion possibilities.' },
    { q: 'Why is "Tr0ub4dor&3" weaker than it looks?', a: 'It is a dictionary word with predictable substitutions — crackers try these transformations automatically. Length plus genuine randomness beats clever substitutions every time.' },
    { q: 'How does this differ from the password generator?', a: 'The generator creates strong passwords; the tester evaluates any password you have. Use the generator for new accounts and the tester to audit existing ones.' },
  ],
  relatedSlugs: ['password-generator', 'hash-generator', 'random-number-generator'],
};
