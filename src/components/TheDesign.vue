<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import move from 'move-js'
import { movePromise } from '../helpers/animation'

const router = useRouter()

const designBack = ref(null)
const designLeftP = ref(null)
const designLeftH2 = ref(null)
const designTop = ref(null)
const designMiddle = ref(null)
const designBase = ref(null)
const designRight = ref(null)
const busy = ref(false)

const prev = e => {
  if (e.which === 38) {
    fadeOut('/')
  }
}

const next = e => {
  if (e.which === 40) {
    fadeOut('/skill')
  }
}

const fedeIn = async () => {
  if (busy.value) return
  busy.value = true
  await movePromise(move(designBase.value).scale(1), 1000, designBase.value)
  move(designMiddle.value).scale(0.7).duration('0.8s').end()
  await movePromise(
    move(designTop.value).scale(0.55),
    800,
    designTop.value,
    100
  )
  move(designLeftH2.value).x(0).set('opacity', 1).duration('1s').end()
  move(designLeftP.value).x(0).set('opacity', 1).duration('1s').end()
  await movePromise(
    move(designBack.value)
      .set(
        'clip-path',
        'polygon(51.5% 0%, 100% 65%, 100% 100%, 100% 100%, 51.5% 36%)'
      )
      .set('opacity', 0.98)
      .ease('linear'),
    500,
    designBack.value
  )
  await movePromise(
    move(designBack.value)
      .set(
        'clip-path',
        'polygon(51.5% 0%, 100% 65%, 100% 100%, 24% 100%, 0% 66.5%)'
      )
      .set('opacity', 0.99)
      .ease('out'),
    500,
    designBack.value
  )
  await movePromise(
    move(designBack.value)
      .set(
        'clip-path',
        'polygon(51.5% 0%, 100% 64%, 100% 100%, 25% 100%, 0% 66.5%)'
      )
      .set('opacity', 1),
    1200,
    designBack.value
  )
  window.addEventListener('keydown', prev)
  window.addEventListener('keydown', next)
  await nextTick()
  busy.value = false
}

const fadeOut = async path => {
  if (busy.value) return
  busy.value = true
  move(designBack.value)
    .set('opacity', 0)
    .set(
      'clip-path',
      'polygon(51.5% 0%, 100% 64.5%, 100% 100%, 24.5% 100%, 0% 66.5%)'
    )
    .duration('1s')
    .end()
  await movePromise(
    move(designBase.value).set('box-shadow', 'none'),
    1000,
    designBase.value
  )
  await movePromise(
    move(designRight.value)
      .set('width', '100%')
      .ease('cubic-bezier(0.25,0.1,0.25,1)'),
    1000,
    designRight.value
  )
  move(designMiddle.value).set('box-shadow', 'none').duration('0.8s').end()
  await movePromise(
    move(designTop.value).set('box-shadow', 'none'),
    800,
    designTop.value,
    200
  )
  window.removeEventListener('keydown', prev)
  window.removeEventListener('keydown', next)
  await nextTick()
  busy.value = false
  router.push(path)
}

const start = () => {
  designBack.value.style.cssText =
    'opacity: 0; clip-path: polygon(51.5% 0%, 100% 65%, 100% 65%, 100% 65%, 51.5% 0%)'
  designLeftP.value.style.cssText = 'opacity: 0; translateX(100px)'
  designLeftH2.value.style.cssText = 'opacity: 0; translateX(-50px)'
  designTop.value.style.transform = 'scale(0)'
  designMiddle.value.style.transform = 'scale(0)'
  designBase.value.style.transform = 'scale(4)'
  setTimeout(() => {
    fedeIn()
  }, 100)
}

onMounted(() => {
  start()
})
</script>

<template>
  <div ref="body">
    <div ref="designLeft" class="design-left">
      <h2 ref="designLeftH2">设计</h2>
      <p ref="designLeftP">Hello</p>
    </div>
    <div ref="designRight" class="design-right" />
    <div ref="designBack" class="design-back" />
    <div ref="designBase" class="design-base">
      <div ref="designMiddle" class="design-middle">
        <div ref="designTop" class="design-top" />
      </div>
    </div>
  </div>
</template>
