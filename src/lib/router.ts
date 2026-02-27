import { writable } from 'svelte/store'

function getPath(): string {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

export const currentPath = writable<string>(getPath())

if (typeof window !== 'undefined') {
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    currentPath.set(getPath())
  })

  // Intercept all internal link clicks for SPA navigation
  document.addEventListener('click', (e) => {
    const anchor = (e.target as HTMLElement).closest('a')
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href) return

    // Skip: external links, anchor-only links (#volunteer), mailto, tel, new-tab
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      anchor.target === '_blank' ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
    ) {
      return
    }

    // Internal route — handle with pushState
    e.preventDefault()
    if (href !== window.location.pathname) {
      window.history.pushState({}, '', href)
      currentPath.set(href.replace(/\/$/, '') || '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
}

export function navigate(to: string): void {
  window.history.pushState({}, '', to)
  currentPath.set(to.replace(/\/$/, '') || '/')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function matchRoute(
  pattern: string,
  pathname: string,
): Record<string, string> | null {
  const patternParts = pattern.split('/')
  const pathParts = pathname.split('/')

  if (patternParts.length !== pathParts.length) return null

  const params: Record<string, string> = {}
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = pathParts[i]
    } else if (patternParts[i] !== pathParts[i]) {
      return null
    }
  }

  return params
}
