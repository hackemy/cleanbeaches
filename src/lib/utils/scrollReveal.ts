export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}

export function scrollReveal(node: HTMLElement, options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
    delay = 0,
  } = options

  node.classList.add('sr-hidden')

  if (delay > 0) {
    node.style.setProperty('--sr-delay', `${delay}ms`)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.remove('sr-hidden')
          node.classList.add('sr-visible')
          if (once) observer.unobserve(node)
        } else if (!once) {
          node.classList.remove('sr-visible')
          node.classList.add('sr-hidden')
        }
      }
    },
    { threshold, rootMargin },
  )

  observer.observe(node)

  return {
    destroy() {
      observer.disconnect()
    },
  }
}
