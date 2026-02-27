export interface CounterOptions {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  separator?: string
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function formatNumber(n: number, separator: string): string {
  const rounded = Math.round(n)
  if (!separator) return String(rounded)
  return rounded.toLocaleString('en-US').replace(/,/g, separator)
}

export function animatedCounter(node: HTMLElement, options: CounterOptions) {
  const {
    target,
    duration = 2000,
    suffix = '',
    prefix = '',
    separator = ',',
  } = options

  node.textContent = `${prefix}0${suffix}`

  let animated = false

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !animated) {
          animated = true
          observer.unobserve(node)

          const start = performance.now()

          function tick(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const value = easeOutExpo(progress) * target

            node.textContent = `${prefix}${formatNumber(value, separator)}${suffix}`

            if (progress < 1) {
              requestAnimationFrame(tick)
            }
          }

          requestAnimationFrame(tick)
        }
      }
    },
    { threshold: 0.5 },
  )

  observer.observe(node)

  return {
    destroy() {
      observer.disconnect()
    },
  }
}
