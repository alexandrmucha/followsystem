import { Buffer } from "node:buffer";

const base64 = {
  encode: (bytes: Uint8Array) =>
    Buffer.from(bytes).toString("base64"),

  decode: (str: string) =>
    new Uint8Array(Buffer.from(str, "base64")),
};

const rawKey = Deno.env.get("ENCRYPTION_KEY")!;

const cryptoKeyPromise = crypto.subtle.importKey(
  "raw",
  base64.decode(rawKey),
  "AES-GCM",
  false,
  ["encrypt", "decrypt"]
);

export async function encrypt(text: string) {
  const key = await cryptoKeyPromise;

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(text);

  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  return {
    data: base64.encode(new Uint8Array(cipher)),
    iv: base64.encode(iv),
  };
}

export async function decrypt(data: string, iv: string) {
  const key = await cryptoKeyPromise;

  const cipherBytes = base64.decode(data);
  const ivBytes = base64.decode(iv);

  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    key,
    cipherBytes
  );

  return new TextDecoder().decode(plain);
}