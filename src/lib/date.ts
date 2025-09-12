export function formatDate(input: string | number | Date, locale: string = "ja-JP"): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}
