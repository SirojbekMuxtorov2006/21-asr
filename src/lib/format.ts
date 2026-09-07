export function formatSum(value: number | string | null | undefined) {
  const n = Number(value ?? 0);
  if (!n) return "Kelishilgan holda";
  return new Intl.NumberFormat("ru-RU").format(n) + " so'm";
}

export function formatSumShort(value: number | string | null | undefined) {
  const n = Number(value ?? 0);
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
