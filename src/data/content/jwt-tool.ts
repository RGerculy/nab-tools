import type { ToolContent } from './types';

export const jwtToolContent: ToolContent = {
  slug: 'jwt-tool',
  intro: ['JSON Web Tokens (JWTs) are compact claims packaged into three dot-separated Base64url sections: a header, a payload, and a signature.', 'Use this page to inspect the readable parts of a token or create an unsigned token for local development tests. Decoding does not verify a signature, and JWT payloads are not encrypted.'],
  sections: [
    { heading: 'What a JWT contains', paragraphs: ['The header normally identifies the token type and signing algorithm. The payload contains claims such as a subject, issuer, expiry time, and issued-at time. The signature lets a server detect changes when it validates the token with the correct key.'] },
    { heading: 'Decoding is not verification', paragraphs: ['Anyone can Base64url-decode a JWT, so never put passwords or other secrets in its payload. A trustworthy server must verify the signature, check the algorithm it expects, and validate time and audience claims before accepting it.'] },
    { heading: 'Unsigned tokens', paragraphs: ['The builder creates an alg:none token for fixtures and development tests only. Production authentication tokens should use a carefully configured signing algorithm and should be validated server-side.'] },
  ],
  faqs: [
    { q: 'Does this tool verify JWT signatures?', a: 'No. It decodes the header and payload locally. Signature verification requires the correct server key and algorithm configuration.' },
    { q: 'Are JWTs encrypted?', a: 'No. Standard signed JWTs are encoded, not encrypted. Their payload can be read by anyone who has the token.' },
    { q: 'What is an unsigned JWT?', a: 'It is a development/test token with an alg:none header and no signature. It must never be accepted for production authentication.' },
  ],
  relatedSlugs: ['base64-tool', 'json-formatter', 'hash-generator'],
};
