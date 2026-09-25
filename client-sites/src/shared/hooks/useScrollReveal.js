import { useEffect, useRef } from 'react'

export default function useScrollReveal(options = {}) {
  const element = useRef(null)
  useEffect(() => {
    if (!element.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.dataset.revealed = 'true'
        observer.disconnect()
      }
    }, options)
    observer.observe(element.current)
    return () => observer.disconnect()
  }, [options])
  return element
}
