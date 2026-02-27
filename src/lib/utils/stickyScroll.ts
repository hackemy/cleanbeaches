import { writable } from 'svelte/store'

export const scrollY = writable(0)
export const scrolledPastHero = writable(false)

if (typeof window !== 'undefined') {
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY
      scrollY.set(y)
      scrolledPastHero.set(y > 600)
    },
    { passive: true },
  )
}
