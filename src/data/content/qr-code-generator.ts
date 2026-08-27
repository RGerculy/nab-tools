import type { ToolContent } from './types';

export const qrGeneratorContent: ToolContent = {
  slug: 'qr-code-generator',
  intro: [
    'QR codes (Quick Response codes) are two-dimensional barcodes that store up to a few kilobytes of data — enough for a URL, text, WiFi credentials, or contact information. Any smartphone camera can read them instantly, which is why they have become the default bridge between the physical and digital world.',
    'This generator creates QR codes entirely in your browser. The code is drawn locally with the qrcode library — your content never leaves your device, and you can download the result as PNG or SVG for print or web use.',
  ],
  sections: [
    {
      heading: 'What can you put in a QR code?',
      paragraphs: [
        'Most people think of URLs, but QR codes are just containers for text. What you encode determines what happens when someone scans it:',
      ],
      list: [
        'URL — opens a website or app store link (the most common use).',
        'WiFi — encodes SSID, password, and security type; scanning joins the network instantly.',
        'vCard / contact — encodes a business card that saves straight to the phone\u2019s contacts.',
        'Email — pre-fills a compose window with recipient, subject, and body.',
        'SMS / WhatsApp — starts a message to a specific number.',
        'Plain text — any note, serial number, or data you want to move to a phone.',
      ],
      tip: 'For WiFi codes, use the standard format WIFI:T:WPA;S:YourNetwork;P:YourPassword;H:false;; — most scanners read it natively.',
    },
    {
      heading: 'Size, error correction, and scannability',
      paragraphs: [
        'Three things decide whether a QR code scans reliably: physical size, error correction level, and contrast.',
        'Error correction (L=7%, M=15%, Q=25%, H=30%) lets a scanner recover the data even if part of the code is damaged or covered — a logo in the middle, a crease in a printed menu, or a dirty sticker. Higher correction means a denser code, so use M as the default and H only when the code will face abuse.',
        'For print, export SVG and make the code at least 2–3 cm across at typical viewing distance. Never stretch or distort it, and keep a quiet zone (empty margin) around it equal to about four modules.',
      ],
    },
    {
      heading: 'Dark on light, always',
      paragraphs: [
        'Scanners need contrast between modules and background. Black on white is the gold standard. If you invert colors or use a light foreground on a dark background, many scanners fail — especially on glossy menus or under bright light.',
        'If you must brand the code, keep the foreground dark, the background light, and avoid placing busy imagery behind it. You can round the corners of modules in some tools, but resist heavy styling: the plainer the code, the more reliably it scans.',
      ],
    },
    {
      heading: 'Dynamic vs static QR codes',
      paragraphs: [
        'A static QR code encodes the destination directly — it can never be changed. A dynamic code stores a short redirect URL that points to the real destination, which you can change later without reprinting.',
        'Dynamic codes are worth it for anything you might update: restaurant menus, event posters, product packaging. They require a service (often paid) and usually add tracking. Static codes are free forever and perfectly fine for stable destinations like a business card or a permanent link.',
      ],
    },
    {
      heading: 'QR code safety',
      paragraphs: [
        'QR codes are a favorite phishing vector: an attacker stickers a malicious code over a legitimate one, and the victim scans without looking. A code is just text — it can point anywhere.',
        'Before scanning a code in the wild, glance at the URL it shows in your camera app\u2019s preview before tapping. And when you generate codes for your own use, double-check the encoded text — a typo in a WiFi password or a URL can cost you time and visitors.',
      ],
    },
  ],
  faqs: [
    { q: 'Can I generate a QR code for WiFi?', a: 'Yes — encode the text WIFI:T:WPA;S:YourNetworkName;P:YourPassword;H:false;; (adjust T: for WEP or no password). Scanning it will connect the phone to the network.' },
    { q: 'What is the best error correction level?', a: 'M (15%) is the best default — good resilience with a compact code. Use H (30%) if the code will be printed on something that may get damaged, or if you plan to put a logo in the middle.' },
    { q: 'What size should a printed QR code be?', a: 'At least 2–3 cm (1 inch) for typical use, larger for codes scanned from a distance. The scan distance should be roughly 10x the code width.' },
    { q: 'Do QR codes expire?', a: 'Static QR codes never expire — the data is encoded directly in the pattern. Dynamic codes last as long as the redirect service and URL exist.' },
    { q: 'Can I change a QR code after printing?', a: 'Only if it is a dynamic code. A static code is fixed at creation. If you expect to update the destination, use a dynamic code from the start.' },
    { q: 'Why will my QR code not scan?', a: 'Common causes: low contrast, inverted colors, too small, distorted aspect ratio, missing quiet zone, or too high error correction making the code too dense. Try black-on-white at a larger size.' },
  ],
  relatedSlugs: ['password-generator', 'hash-generator', 'base64-tool'],
};
