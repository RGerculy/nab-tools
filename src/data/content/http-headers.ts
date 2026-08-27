import type { ToolContent } from './types';

export const httpHeadersContent: ToolContent = {
  slug: 'http-headers',
  intro: ['Security headers tell browsers how to handle your website and reduce common attack surfaces such as clickjacking, MIME sniffing, and unsafe script execution.', 'Paste a raw response-header block to check the most useful protections. The analysis is local and does not request the URL or send the headers anywhere.'],
  sections: [
    { heading: 'The important headers', list: ['Content-Security-Policy (CSP) limits where scripts, styles, images, and frames may load from.', 'Strict-Transport-Security (HSTS) tells browsers to use HTTPS for future visits.', 'X-Content-Type-Options: nosniff prevents browsers guessing a different MIME type.', 'X-Frame-Options and CSP frame-ancestors help prevent clickjacking.', 'Referrer-Policy controls how much URL information is sent to other sites.', 'Permissions-Policy limits access to features such as camera, microphone, and geolocation.'] },
    { heading: 'Why this tool uses pasted headers', paragraphs: ['A browser page cannot freely fetch and inspect response headers from every other origin because of CORS. Pasting the headers from DevTools or a server scan keeps the check reliable and private.'] },
    { heading: 'A missing header is a prompt to investigate', paragraphs: ['Header recommendations depend on the application. Test changes in staging, especially CSP, because an overly strict policy can block legitimate scripts or images.'] },
  ],
  faqs: [
    { q: 'Can this tool scan a URL?', a: 'No. Browsers restrict cross-origin response-header access. Paste the headers from your browser network panel or server configuration instead.' },
    { q: 'What is the most important security header?', a: 'There is no single answer, but a carefully tested Content-Security-Policy is often one of the most valuable protections against injected scripts.' },
    { q: 'Does CORS protect my website from XSS?', a: 'No. CORS controls which origins can read certain responses. It does not replace output encoding, input validation, or a Content-Security-Policy.' },
  ],
  relatedSlugs: ['dns-lookup', 'url-encoder', 'password-strength'],
};
