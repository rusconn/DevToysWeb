export function encode(s: string) {
  const bytes = textEncoder.encode(s);
  const buf = [];
  const chunkSize = 32 * 2 ** 10; // 32KiB

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    buf.push(String.fromCharCode(...chunk));
  }

  return btoa(buf.join(""));
}

const textEncoder = new TextEncoder();

export function decode(base64: string) {
  try {
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, c => c.charCodeAt(0));
    return textDecoder.decode(bytes);
  } catch {
    return undefined;
  }
}

const textDecoder = new TextDecoder();
