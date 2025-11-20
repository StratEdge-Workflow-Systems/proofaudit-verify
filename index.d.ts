export function canonicalJson(value: unknown): string;
export function createDecisionReceipt<T extends Record<string, unknown>>(record: T): T & { receiptHash: string };
export function verifyDecisionReceipt(receipt: Record<string, unknown>): { valid: boolean; expectedHash?: string; providedHash?: string; reason?: string };
