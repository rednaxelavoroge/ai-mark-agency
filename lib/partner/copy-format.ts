/** Replace `{name}`-style placeholders in cabinet copy strings. */
export function formatCabinetString(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}
