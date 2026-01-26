/**
 * generateCss() formats the CSS code from the .json files
 */

import type { Item } from '~/types/types'

export const generateCss = (
  entry: Item,
  index: number
): { injectedCss: string; formattedCss: string } => {
  let formattedCss = ''
  let injectedCss = ''

  if (!entry.css) return { injectedCss, formattedCss }

  for (const rule of entry.css) {
    const wrappedCss = `${rule.selector} ` + wrapCss(rule.code)

    injectedCss += `[data-scope="${index}"] ${wrappedCss}`
    formattedCss += `${wrappedCss}\n`
  }

  return { injectedCss, formattedCss }
}

const wrapCss = (cssArray: string[]) =>
  '{\n' + cssArray.map((line) => `  ${line};`).join('\n') + '\n}\n'
