/** Uses the store's local clock, including schedules that cross midnight. */
export function isOpenAt(date: Date, hours: { openingTime: string; closingTime: string }): boolean {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const current = Number(parts.find((part) => part.type === "hour")?.value) * 60 + Number(parts.find((part) => part.type === "minute")?.value);
  const toMinutes = (time: string) => { const [hour, minute] = time.split(":").map(Number); return hour * 60 + minute; };
  const opening = toMinutes(hours.openingTime);
  const closing = toMinutes(hours.closingTime);
  if (opening === closing) return true;
  return opening < closing ? current >= opening && current < closing : current >= opening || current < closing;
}
