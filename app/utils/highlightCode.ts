import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

export async function highlight(code: string, lang = 'css') {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark'],
      langs: ['css', 'vue', 'ts', 'html']
    })
  }

  return highlighter.codeToHtml(code, {
    lang,
    theme: 'github-dark'
  })
}
