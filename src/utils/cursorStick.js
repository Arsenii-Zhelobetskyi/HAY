// // stickDirective.js

// import { gsap } from 'gsap'
// import { useCursorStore } from '../stores/cursor'
// export const stickDirective = {
//   mounted(el) {
//     el.addEventListener('mouseenter', onMouseEnter)
//     el.addEventListener('mouseleave', onMouseLeave)
//   },
//   unmounted(el) {
//     el.removeEventListener('mouseenter', onMouseEnter)
//     el.removeEventListener('mouseleave', onMouseLeave)
//   }
// }

// function onMouseEnter(event) {
//   const store = useCursorStore()
//   const rect = event.currentTarget.getBoundingClientRect()
//   const targetX = rect.left + rect.width / 2 - store.getBigBall.offsetWidth / 2
//   const targetY = rect.top + window.scrollY + rect.height / 2 - store.getBigBall.offsetHeight / 2

//   gsap.to(store.getBigBall, {
//     duration: 0.3,
//     x: targetX,
//     y: targetY,
//     scale: 1.5,
//     ease: 'power3.out'
//   })
// }

// function onMouseLeave(event) {
//   const store = useCursorStore()

//   gsap.to(store.getBigBall, {
//     duration: 0.3,
//     scale: 1,
//     ease: 'power3.out'
//   })
// }
