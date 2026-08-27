/**
 * MD5 implementation (public domain, based on the classic RFC 1321 reference).
 * Needed because Web Crypto API does not support MD5.
 * Works on UTF-8 strings and Uint8Array inputs.
 */

function rotl(x: number, n: number): number {
  return (x << n) | (x >>> (32 - n));
}

const S: number[] = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

const K: number[] = (() => {
  const k = new Array<number>(64);
  for (let i = 0; i < 64; i++) {
    // floor(abs(sin(i+1)) * 2^32)
    k[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
  }
  return k;
})();

function toBytes(input: string | Uint8Array): Uint8Array {
  if (input instanceof Uint8Array) return input;
  return new TextEncoder().encode(input);
}

export function md5(input: string | Uint8Array): string {
  const msg = toBytes(input);

  // Padding
  const bitLen = msg.length * 8;
  const paddedLen = (((msg.length + 8) >> 6) + 1) << 6;
  const padded = new Uint8Array(paddedLen);
  padded.set(msg);
  padded[msg.length] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(paddedLen - 8, bitLen >>> 0, true);
  dv.setUint32(paddedLen - 4, Math.floor(bitLen / 4294967296), true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let i = 0; i < paddedLen; i += 64) {
    const M = new Array<number>(16);
    for (let j = 0; j < 16; j++) {
      M[j] = dv.getUint32(i + j * 4, true);
    }

    let A = a0, B = b0, C = c0, D = d0;

    for (let j = 0; j < 64; j++) {
      let F: number, g: number;
      if (j < 16) {
        F = (B & C) | (~B & D);
        g = j;
      } else if (j < 32) {
        F = (D & B) | (~D & C);
        g = (5 * j + 1) % 16;
      } else if (j < 48) {
        F = B ^ C ^ D;
        g = (3 * j + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * j) % 16;
      }
      F = (F + A + K[j] + M[g]) >>> 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, S[j])) >>> 0;
    }

    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  const out = new DataView(new ArrayBuffer(16));
  out.setUint32(0, a0, true);
  out.setUint32(4, b0, true);
  out.setUint32(8, c0, true);
  out.setUint32(12, d0, true);

  let hex = '';
  for (let i = 0; i < 16; i++) {
    hex += out.getUint8(i).toString(16).padStart(2, '0');
  }
  return hex;
}

export function sha256Hex(input: string | Uint8Array): Promise<string> {
  const data = toBytes(input);
  // data is always a full-buffer view in this module, so the cast is safe.
  return crypto.subtle.digest('SHA-256', data.buffer as ArrayBuffer).then(bufToHex);
}

export function sha1Hex(input: string | Uint8Array): Promise<string> {
  const data = toBytes(input);
  return crypto.subtle.digest('SHA-1', data.buffer as ArrayBuffer).then(bufToHex);
}

export function sha512Hex(input: string | Uint8Array): Promise<string> {
  const data = toBytes(input);
  return crypto.subtle.digest('SHA-512', data.buffer as ArrayBuffer).then(bufToHex);
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
