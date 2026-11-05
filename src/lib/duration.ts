import { content } from '../data/content'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** 'Jul 2025' → months since year 0; 'Present' → the given date. Returns null for anything else. */
function toMonths(label: string, now: Date): number | null {
  if (label === 'Present') return now.getFullYear() * 12 + now.getMonth()
  const [mon, year] = label.split(' ')
  const index = MONTHS.indexOf(mon)
  return index < 0 || !/^\d{4}$/.test(year ?? '') ? null : Number(year) * 12 + index
}

/** Length of a role between two CV date labels, e.g. '1 yr 4 mos'. Empty if a label can't be parsed. */
export function duration(start: string, end: string, now = new Date()): string {
  const from = toMonths(start, now)
  const to = toMonths(end, now)
  if (from === null || to === null) return ''
  const total = Math.max(1, to - from)
  const { year, years, month, months } = content.ui.duration
  const y = Math.floor(total / 12)
  const m = total % 12
  return [y && `${y} ${y === 1 ? year : years}`, m && `${m} ${m === 1 ? month : months}`].filter(Boolean).join(' ')
}
