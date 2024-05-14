
export const movePromise = (move, time, el, delay = 0) => {
  move.duration(time).delay(delay).end()
  return new Promise(resolve => {
    el.addEventListener('transitionend', resolve)
  })
}
