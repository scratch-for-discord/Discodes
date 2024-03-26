export default function salt(length: number): string {
    let salt = ""
    for (let i = 0; i < length; i++) {
        salt += (Math.random() + 1).toString(36).substring(7)[0]
    }
    return salt
}
