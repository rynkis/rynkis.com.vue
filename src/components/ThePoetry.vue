<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import move from 'move-js'
import { movePromise } from '../helpers/animation'

const router = useRouter()

const poeLeftBt = ref(null)
const poeLeftUp = ref(null)
const poeCenterLeft = ref(null)
const poeCenterRight = ref(null)
const poeBackH3 = ref(null)
const busy = ref(false)

const prev = e => {
  if (e.which === 38) {
    fadeOut('/game')
  }
}

const next = e => {
  if (e.which === 40) {
    fadeOut('/music')
  }
}

const fedeIn = async () => {
  if (busy.value) return
  busy.value = true
  await movePromise(
    move(poeBackH3.value).set('opacity', 1).ease('in'),
    1000,
    poeBackH3.value
  )
  move(poeCenterLeft.value)
    .set('transform', 'scale(1, 0.25) translateY(100%)')
    .duration('1s')
    .ease('in')
    .end()
  await movePromise(
    move(poeCenterRight.value)
      .set('transform', 'scale(1, 0.25) translateY(-100%)')
      .ease('in'),
    1000,
    poeCenterRight.value
  )
  move(poeBackH3.value)
    .y(0)
    .duration('1s')
    .delay('0.3s')
    .ease('cubic-bezier(0.645, 0.045, 0.355, 1)')
    .end()
  move(poeCenterLeft.value)
    .set('transform', 'scale(1) translateY(0%)')
    .duration('1.6s')
    .end()
  await movePromise(
    move(poeCenterRight.value).set('transform', 'scale(1) translateY(0%)'),
    1600,
    poeCenterRight.value
  )
  move(poeLeftBt.value).scale(1).duration('0.8s').delay('0.1s').end()
  await movePromise(move(poeLeftUp.value).scale(1), 800, poeLeftUp.value)
  move(poeCenterLeft.value)
    .set('box-shadow', '-20px 60px 130px -29px rgba(0, 0, 0, 0.4)')
    .duration('0.8s')
    .end()
  await movePromise(
    move(poeCenterRight.value).set(
      'box-shadow',
      '20px 60px 130px -29px rgba(0, 0, 0, 0.4)'
    ),
    800,
    poeCenterRight.value
  )
  const eles = document.querySelectorAll('.poetry-center ul')
  eles.forEach((ele, index) => {
    move(ele).set('opacity', 1).y(0).ease('out').duration('0.6s').end()
  })
  window.addEventListener('keydown', prev)
  window.addEventListener('keydown', next)
  await nextTick()
  busy.value = false
}

const fadeOut = async path => {
  if (busy.value) return
  busy.value = true
  document.querySelectorAll('.poetry-center ul').forEach(ele => {
    move(ele).set('opacity', 0).y(10).duration('1s').end()
  })
  move(poeLeftBt.value).scale(0).duration('1s').ease('in-out').end()
  move(poeBackH3.value).y('24vh').duration('1s').delay('1s').ease('in').end()
  await movePromise(
    move(poeLeftUp.value).scale(0).ease('in-out'),
    1000,
    poeLeftUp.value
  )
  move(poeBackH3.value).set('opacity', 0).duration(0).end()
  move(poeCenterLeft.value)
    .set('top', '30%')
    .set('height', '20%')
    .set('box-shadow', '0 0 20px rgba(0, 0, 0, 0.1)')
    .duration('1s')
    .end()
  await movePromise(
    move(poeCenterRight.value)
      .set('top', '30%')
      .set('height', '20%')
      .set('box-shadow', '0 0 20px rgba(0, 0, 0, 0.1)'),
    1000,
    poeCenterRight.value
  )
  await new Promise(resolve => setTimeout(resolve, 1000))
  move(poeCenterLeft.value)
    .set('width', '0%')
    .duration('1s')
    .ease('cubic-bezier(0.25, 0.46, 0.45, 0.94)')
    .end()
  await movePromise(
    move(poeCenterRight.value)
      .set('width', '0%')
      .ease('cubic-bezier(0.25, 0.46, 0.45, 0.94)'),
    1000,
    poeCenterRight.value
  )
  await new Promise(resolve => setTimeout(resolve, 500))
  window.removeEventListener('keydown', prev)
  window.removeEventListener('keydown', next)
  await nextTick()
  busy.value = false
  router.push(path)
}

const start = () => {
  document.querySelectorAll('.poetry-center ul').forEach(ele => {
    ele.style.cssText = 'opacity: 0; transform: translateY(-20px)'
  })
  poeLeftBt.value.style.transform = 'scale(0)'
  poeLeftUp.value.style.transform = 'scale(0)'
  poeCenterLeft.value.style.cssText =
    'transform: scale(0, 0.25) translateY(100%); box-shadow: none'
  poeCenterRight.value.style.cssText =
    'transform: scale(0, 0.25) translateY(-100%); box-shadow: none'
  poeBackH3.value.style.cssText = 'opacity: 0; transform: translateY(15vh)'
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
    <div class="poetry-back">
      <div ref="poeLeftUp" class="poetry-left-up"></div>
      <div ref="poeLeftBt" class="poetry-left-bottom"></div>
      <h3 ref="poeBackH3">诗词</h3>
      <div ref="poeCenter" class="poetry-center">
        <div ref="poeCenterLeft" class="poetry-center-left">
          <ul>
            <li>
              <h2>1</h2>
              <p>1</p>
              <span />
            </li>
            <li>
              <h2>2</h2>
              <p>2</p>
              <span />
            </li>
          </ul>
        </div>
        <div ref="poeCenterRight" class="poetry-center-right">
          <ul>
            <li>
              <h2>3</h2>
              <p>3</p>
              <span />
            </li>
            <li>
              <h2>4</h2>
              <p>4</p>
              <span />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
