import { getKey } from "./getKey";

export async function decrypt(value: string, password: string) {
    const encoded = getKey(password)

    const key = await window.crypto.subtle.importKey(
        "raw",
        encoded.buffer,
        "AES-CTR",
        false,
        ['encrypt', 'decrypt']
    )

    const v = new TextEncoder().encode(value)

    return window.crypto.subtle.decrypt({ name: "AES-CTR", length: 126, counter: encoded }, key, v).then(decrypted => new TextDecoder("utf8").decode(decrypted))
}