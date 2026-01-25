/**
 * generateCss() formats the CSS code from the .json files
 */

import type { Item } from '~/types/types'

export const generateCss = (
  entry: Item,
  index: number
): { injectedCss: string; formattedCss: string } => {
  const scope = `[data-scope="${index}"]`
  const tabs = '  '
  let formattedCss = ''
  let injectedCss = ''

  if (!entry.css) return { injectedCss, formattedCss }

  for (const rule of entry.css) {
    const { rest, hover, hoverParent } = rule.code
    const parentSelector = rule.parent ? rule.parent.selector : ''

    // If direct parent > child, add ">"
    // If not direct parent, add single space
    // If no parent, add no space
    const connection =
      rule.parent && rule.parent.direct ? ' > ' : rule.parent && !rule.parent.direct ? ' ' : ''

    const restCss = rest?.length
      ? `${parentSelector}${connection}${rule.selector} ` +
        wrapCss(rest.map((line) => `${tabs}${line};`).join('\n'))
      : ''

    const hoverCss = hover
      ? `${parentSelector}${connection}${rule.selector}:hover ` +
        wrapCss(
          Object.entries(hover)
            .map(([k, v]) => `${tabs}${k}: ${v};`)
            .join('\n')
        )
      : ''

    const hoverParentCss = hoverParent
      ? `${parentSelector}:hover${connection}${rule.selector} ` +
        wrapCss(
          Object.entries(hoverParent)
            .map(([k, v]) => `${tabs}${k}: ${v};`)
            .join('\n')
        )
      : ''

    injectedCss += `${scope} ${restCss} ${hoverCss && scope} ${hoverCss && hoverCss} ${hoverParentCss && scope} ${hoverParentCss && hoverParentCss}`
    formattedCss += `${restCss}${hoverCss && hoverCss}${hoverParentCss && hoverParentCss}\n`
  }

  return { injectedCss, formattedCss }
}

const wrapCss = (cssCode: string) => `{\n${cssCode}\n}\n`
