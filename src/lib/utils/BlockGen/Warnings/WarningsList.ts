export const warnings: Record<string, Record<string,string>> = {}

export function addWarning(block: string, field: string, message: string): void {
    if (!warnings[block]) {
        warnings[block] = {}
    }

    warnings[block][field] = message
}

export function removeWarning(block: string, field: string): void {
    if (!warnings[block] || !warnings[block][field]) return
    delete warnings[block][field]
}
