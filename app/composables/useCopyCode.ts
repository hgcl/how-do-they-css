/**
 * useCopyCode() copies the code to the clipboard, and displays a "Copied!" notification
 */

const useCopyCode = () => {
  const copied = ref(false)

  const copyCode = async (code: string) => {
    if (!import.meta.client) return

    try {
      await navigator.clipboard.writeText(code)
      copied.value = true
      setTimeout(() => (copied.value = false), 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return { copied, copyCode }
}

export default useCopyCode
