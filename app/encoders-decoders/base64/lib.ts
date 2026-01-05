export const encode = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  const buf = [];
  const chunkSize = 32 * 2 ** 10; // 32KiB

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    buf.push(String.fromCharCode(...chunk));
  }

  return btoa(buf.join(""));
};

export const decode = (base64: string) => {
  try {
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return undefined;
  }
};
