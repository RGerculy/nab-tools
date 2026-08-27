import type { ToolContent } from './types';

export const wifiQrGeneratorContent: ToolContent = {
  slug: 'wifi-qr-generator',
  intro: [
    'Typing a long Wi-Fi password into a phone is a small misery everyone knows. A Wi-Fi QR code ends it: point any phone camera at the code and it joins the network instantly — no password typed, no mistakes, no "is that a zero or an O?"',
    'This generator builds a standards-compatible Wi-Fi QR code from your network name and password. Everything is generated in your browser and the code is downloaded as a PNG — your credentials never touch a server.',
  ],
  sections: [
    {
      heading: 'How a Wi-Fi QR code works',
      paragraphs: [
        'A Wi-Fi QR code is just a QR encoding of a specially formatted string of text, not magic. That string looks like WIFI:T:WPA;S:MyHomeWiFi;P:mypassword;; and tells the scanning device: connect to this network with this security and this password.',
        'Because the QR only carries text, any device that understands the WIFI: format can join — iOS and Android both support it natively in the camera app, and most modern routers print one on a label.',
      ],
    },
    {
      heading: 'The WIFI: format, decoded',
      paragraphs: [
        'The string has a few fields, each separated by semicolons:',
      ],
      list: [
        'T — the security type: WPA (covers WPA/WPA2/WPA3), WEP, or nopass for open networks.',
        'S — the SSID, or network name. Special characters (\\ , ; " :) are escaped with a backslash.',
        'P — the password, omitted entirely for open networks.',
        'H — set to true if the network is hidden (doesn\\u2019t broadcast its SSID).',
      ],
      tip: 'The trailing ;; at the end is intentional — the format terminates with an empty field. Most scanners tolerate a single ;, but the spec-conformant form ends with two.',
    },
    {
      heading: 'Security: how safe is it?',
      paragraphs: [
        'The QR code contains the same password that would otherwise be typed by hand. Anyone who scans it can join your network — so treat a Wi-Fi QR code exactly like the password itself: print it for guests, don\\u2019t post it publicly, and re-generate it if the password changes.',
        'One practical win: a QR code can carry a far longer, stronger random password than anyone wants to type. Generate a long random password, bake it into the QR, and guests never have to type it.',
      ],
    },
  ],
  faqs: [
    { q: 'How do I connect using a Wi-Fi QR code?', a: 'Open your phone\\u2019s camera and point it at the code. iOS and Android both show a "Join network" prompt automatically. No separate app is needed.' },
    { q: 'What is the WIFI: string format?', a: 'A text format that encodes the network\\u2019s security type, SSID, password, and hidden status, wrapped in a QR code. Devices read it to connect without typing.' },
    { q: 'Does a Wi-Fi QR code work with WPA3?', a: 'Yes. The T:WPA value covers WPA, WPA2, and WPA3 — the device negotiates the best option the network supports.' },
    { q: 'Is it safe to share a Wi-Fi QR code?', a: 'Treat it like the password. It\\u2019s fine for guests, but anyone who scans it can join. Re-generate it whenever you change the password.' },
    { q: 'Can I use it for a hidden network?', a: 'Yes — enable the hidden-network option. The code adds H:true so devices know the SSID is not broadcast.' },
  ],
  relatedSlugs: ['qr-code-generator', 'qr-decoder', 'password-generator'],
};
