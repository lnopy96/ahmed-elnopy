import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

/** Live `prefers-reduced-motion` flag. False while prerendering, so the static HTML matches the first client render. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
