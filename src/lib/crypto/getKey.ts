export function getKey(password: string) {
    const keyBuffer = new Uint8Array(16)

    password.split("").forEach((v, i) => {
        keyBuffer[i] = v.charCodeAt(0)
    })

    return keyBuffer
}