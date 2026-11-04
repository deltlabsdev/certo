import type { Ref } from 'vue'

/**
 * Calls `handler` when a pointer press happens outside `target`.
 *
 * Local replacement for VueUse's onClickOutside: VueUse is only a transitive
 * dependency (via Una UI), so its auto-imports are not reliably available.
 */
export function useClickOutside(
  target: Readonly<Ref<unknown>>,
  handler: (event: PointerEvent) => void,
) {
  const listener = (event: PointerEvent) => {
    const el = target.value as HTMLElement | null | undefined
    if (!el || el === event.target || event.composedPath().includes(el))
      return
    handler(event)
  }

  onMounted(() => {
    window.addEventListener('pointerdown', listener, { passive: true })
  })
  onUnmounted(() => {
    window.removeEventListener('pointerdown', listener)
  })
}
