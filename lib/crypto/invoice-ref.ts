import { randomBytes } from "node:crypto";

const ALPHABET = "abcdefghijkmnopqrstuvwxyz23456789";

export function newInvoiceRef(): string {
  const bytes = randomBytes(8);
  let body = "";
  for (const byte of bytes) {
    body += ALPHABET[byte % ALPHABET.length];
  }
  return `aim${body}`;
}

export function isInvoiceRef(value: string): boolean {
  return /^aim[a-z0-9]{8}$/.test(value);
}

export function amountWithCents(listAmount: number, cents: number): string {
  const value = Math.round(listAmount * 100) + cents;
  return (value / 100).toFixed(2);
}
