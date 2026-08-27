import type { ToolContent } from './types';

export const passwordGeneratorContent: ToolContent = {
  slug: 'password-generator',
  intro: [
    'A strong password is the difference between an account that survives a breach and one that gets you pwned. This generator creates random passwords using your browser\u2019s cryptographically secure random number generator — no pattern, no dictionary words, no reuse, and nothing sent to any server.',
    'The default mode uses only the symbols nearly every website accepts (! @ # $ % & ?). If you are dealing with a site that is stricter than average — or you simply want maximum entropy — tick "I have trust issues" for the extended symbol set.',
  ],
  sections: [
    {
      heading: 'How password strength actually works',
      paragraphs: [
        'Password strength is measured in entropy — the number of possible combinations an attacker would have to try. Each extra character multiplies the search space; each character type adds a smaller but still meaningful multiplier.',
        'Length dominates. A 16-character password with only lowercase letters has roughly 75 bits of entropy; a 12-character password using all four character types has about 78. In practice, an 8-character password is crackable in hours on modern hardware, while 14+ characters with mixed types is effectively unbreakable by brute force.',
        'That is why this tool defaults to 16 characters and why the entropy meter updates live as you adjust the length and character sets — it is showing you the actual math, not a made-up score.',
      ],
    },
    {
      heading: 'Why "correct horse battery staple" thinking is still valid',
      paragraphs: [
        'Random characters are great, but humans remember passphrases better. A passphrase of 4–6 random words (using a tool like diceware) gives comparable entropy to a random 12-character string — and you can actually type it from memory.',
        'Whichever route you take, the rules are the same: never reuse a password across sites, never use personal information (names, birthdays, pet names), and treat any password you have typed into a sketchy website as compromised.',
      ],
    },
    {
      heading: 'When the "trust issues" set makes sense',
      paragraphs: [
        'The extended symbol set (!@#$%^&*()-_=+[]{};:,.<>?/|~) adds roughly 12 bits of entropy at 16 characters — real, but not transformative. Use it for high-value accounts where you know the site accepts all symbols: password managers, email, banking, hosting panels.',
        'For everything else, the default set is the sweet spot: still strong, and it will not get rejected by a legacy system that bans braces, pipes, or angle brackets. A password that gets rejected by the site\u2019s form is worse than one with slightly fewer symbols.',
      ],
    },
    {
      heading: 'Storing your passwords',
      paragraphs: [
        'The only practical way to use truly random passwords across dozens of sites is a password manager. It generates, stores, and autofills them, and it remembers which site expects which character set. Bitwarden, 1Password, and KeePass are all solid choices.',
        'If you must store passwords in a file, use an encrypted container (VeraCrypt, or the encrypted notes feature of a password manager) — never a plaintext spreadsheet or text file.',
      ],
    },
  ],
  faqs: [
    { q: 'Are the generated passwords truly random?', a: 'Yes. The generator uses crypto.getRandomValues(), the browser\u2019s cryptographically secure random number generator — the same source used for encryption keys. It is not Math.random().' },
    { q: 'How long should a password be?', a: 'At least 12 characters for everyday accounts, 16 or more for anything important. Length matters more than which character types you include.' },
    { q: 'Is my password sent to a server?', a: 'No. Everything runs locally in your browser. The password is generated on your device and never transmitted anywhere.' },
    { q: 'Why do some websites reject my password?', a: 'Many sites restrict which symbols they accept. The default mode of this tool uses only ! @ # $ % & ? — characters almost universally allowed. If a site still rejects it, untick Symbols entirely.' },
    { q: 'Should I use a password manager?', a: 'Yes — it is the only realistic way to use unique random passwords for every account. A password manager with a master password is safer than reusing one password everywhere.' },
    { q: 'Is it safe to use an online password generator?', a: 'It is safe only if it runs client-side like this one. If a site generates passwords on its server, the password exists somewhere you do not control. Check that the page works offline or inspect the network tab.' },
  ],
  relatedSlugs: ['uuid-generator', 'hash-generator', 'base64-tool'],
};
