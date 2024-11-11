import slugify from "react-slugify";
import dayjs from "dayjs";

export const textFormat = {
  slugify: (text: string) => text.split('/').map(t => t.split(':').map(tt => slugify(tt, {delimiter: '-'})).join(':')).join('/'),
  toUpperCase: (text: string) => text.toUpperCase(),
  toLowerCase: (text: string) => text.toLowerCase(),
  capitalize: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
  fileName: (text: string) => {
    if (text.length < 26) return text
    const exp = text.split('.').pop() ?? ''
    return `${text.slice(0, 20)}...${exp}`
  },
  date: {
    YMD_dMY: (value: string | number) => (dayjs(value, 'YYYY-MM-DD').format("D MMMM YYYY"))
  }
}

export function setCollapsedText(text: string, collapsed: boolean) {
  return collapsed ? text.slice(0, 2).toUpperCase() : textFormat.capitalize(text)
}