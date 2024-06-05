// global cursor directive to handle hoverable elements
import { gsap } from 'gsap'
import { useCursorStore } from '../stores/cursor'

export const hoverableDirective = {
  mounted(el) {
    el.addEventListener('mouseover', onMouseHover)
    el.addEventListener('mouseout', onMouseHoverOut)
  },
  unmounted(el) {
    el.removeEventListener('mouseover', onMouseHover)
    el.removeEventListener('mouseout', onMouseHoverOut)
    const store = useCursorStore()
    gsap.to(store.getBigBall, { duration: 0.3, scale: 1 })
  }
}

function onMouseHover() {
  const store = useCursorStore()

  gsap.to(store.getBigBall, { duration: 0.3, scale: 4 })
}

function onMouseHoverOut() {
  const store = useCursorStore()
  gsap.to(store.getBigBall, { duration: 0.3, scale: 1 })
}
