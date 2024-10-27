export const encode = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  return btoa(String.fromCharCode(...bytes));
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
