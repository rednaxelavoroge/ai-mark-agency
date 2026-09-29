/**
 * HTTP client for the phase-2 product tenant API.
 * Pure functions — no server-only so tests can import idempotency helpers.
 */

export type TenantCreateBody = {
  email: string;
  plan: string;
  invoice_no: string;
  partner_code: string | null;
};

export type ProvisioningHttpResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; error: string };

export function idempotencyKey(invoiceRef: string, action: string): string {
  return `${invoiceRef}:${action}`;
}

export async function provisioningFetch<T>(
  baseUrl: string,
  secret: string,
  path: string,
  options: {
    method: "POST";
    idempotencyKey: string;
    body?: unknown;
  },
): Promise<ProvisioningHttpResult<T>> {
  const url = `${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  try {
    const res = await fetch(url, {
      method: options.method,
      headers: {
        Authorization: `Bearer ${secret}`,
        "Idempotency-Key": options.idempotencyKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: AbortSignal.timeout(25_000),
    });
    const text = await res.text();
    let parsed: T | null = null;
    if (text) {
      try {
        parsed = JSON.parse(text) as T;
      } catch {
        parsed = null;
      }
    }
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: text.slice(0, 240) || `HTTP ${res.status}`,
      };
    }
    return { ok: true, status: res.status, data: parsed as T };
  } catch (error) {
    const message = error instanceof Error ? error.message : "request failed";
    return { ok: false, status: 0, error: message };
  }
}
