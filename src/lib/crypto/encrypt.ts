import { getKey } from "./getKey"

export async function encrypt(value: string, password: string) {
    // normally, you are supposed to do this on the server (without the RANDOM_BYTES_ADD) thing but we don't have a server right now so this will do
    const keyBuffer = getKey(password)

    const key = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer.buffer,
        "AES-CTR",
        false,
        ['encrypt', 'decrypt']
    )

    const encode = new TextEncoder().encode(value)

    return window.crypto.subtle.encrypt({ name: "AES-CTR", length: 126, counter: keyBuffer }, key, encode).then((b) => new TextDecoder("utf8").decode(b))
}