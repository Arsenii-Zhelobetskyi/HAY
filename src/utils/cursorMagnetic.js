// magneticDirective.js

import { gsap } from 'gsap'

export const magneticDirective = {
  mounted(el) {
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
  },
  unmounted(el) {
    el.removeEventListener('mousemove', onMouseMove)
    el.removeEventListener('mouseleave', onMouseLeave)
  }
}

function onMouseMove(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const relX = event.clientX - rect.left
  const relY = event.clientY - rect.top
  const xCenter = rect.width / 2
  const yCenter = rect.height / 2

  const deltaX = (relX - xCenter) * 0.3 // adjust the multiplier for strength
  const deltaY = (relY - yCenter) * 0.3 // adjust the multiplier for strength

  gsap.to(event.currentTarget, {
    duration: 0.3,
    x: deltaX,
    y: deltaY
  })
}

function onMouseLeave(event) {
  gsap.to(event.currentTarget, {
    duration: 0.3,
    x: 0,
    y: 0
  })
}
