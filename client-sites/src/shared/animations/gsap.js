import gsap from 'gsap'

export function revealHero(root) {
  return gsap.context(() => {
    gsap.from('[data-line]', { yPercent: 110, duration: 0.9, stagger: 0.12, ease: 'power4.out' })
    gsap.from('[data-card]', { opacity: 0, y: 24, delay: 0.5, duration: 0.7 })
  }, root)
}
