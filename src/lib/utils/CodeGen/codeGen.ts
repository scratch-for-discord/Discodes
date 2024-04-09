
export class CodeGen {
    private inputArguments: Record<string, string>;
    constructor(inputArguments: Record<string, string>) {
        this.inputArguments = inputArguments;

    }
    public getValue(key: string): string {
        return this.inputArguments[key] ?? "null";
    }
}
