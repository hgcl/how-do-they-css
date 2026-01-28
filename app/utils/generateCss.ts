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
    const isKeyframe = rule.selector.startsWith('@keyframes') ? true : false
    const scope = isKeyframe ? '' : `[data-scope="${index}"] `

    const wrappedCss =
      `${rule.selector} ` +
      '{\n' +
      rule.code.map((line) => `  ${line}${isKeyframe ? '' : ';'}`).join('\n') +
      '\n}\n'

    injectedCss += `${scope}${wrappedCss}`
    formattedCss += `${wrappedCss}\n`
  }

  return { injectedCss, formattedCss }
}
