<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import move from 'move-js'
import { movePromise } from '../helpers/animation'

const router = useRouter()

const gameLeftArt = ref(null)
const gameBackUl = ref(null)
const gameTop = ref(null)
const gameMiddle = ref(null)
const gameBase = ref(null)
const gameLeftBottom = ref(null)
const gameLeftUp = ref(null)
const busy = ref(false)

const prev = e => {
  if (e.which === 38) {
    fadeOut('/skill')
  }
}

const next = e => {
  if (e.which === 40) {
    fadeOut('/poetry')
  }
}

const fedeIn = async () => {
  if (busy.value) return
  busy.value = true
  await movePromise(
    move(gameLeftUp.value).scaleY(1).ease('in'),
    800,
    gameLeftUp.value
  )
  await movePromise(
    move(gameLeftBottom.value).scaleX(1).ease('out'),
    600,
    gameLeftBottom.value
  )
  await movePromise(move(gameBase.value).scale(1), 300, gameBase.value)
  move(gameBase.value)
    .set('box-shadow', '0 20px 40px rgba(249, 168, 37, 0.2)')
    .duration('1s')
    .end()
  await movePromise(
    move(gameMiddle.value).set('opacity', 1).scale(1),
    300,
    gameMiddle.value
  )
  await movePromise(
    move(gameTop.value).set('opacity', 1).scale(1),
    300,
    gameTop.value
  )
  move(gameLeftArt.value).set('opacity', 1).duration('1s').end()
  await movePromise(
    move(gameBackUl.value).x(0).set('opacity', 1),
    1000,
    gameBackUl.value
  )
  window.addEventListener('keydown', prev)
  window.addEventListener('keydown', next)
  await nextTick()
  busy.value = false
}

const fadeOut = async path => {
  if (busy.value) return
  busy.value = true
  move(gameLeftArt.value).x(-50).set('opacity', 0).duration('1s').end()
  await movePromise(
    move(gameBackUl.value).x(50).set('opacity', 0),
    1000,
    gameBackUl.value
  )
  move(gameMiddle.value)
    .set('width', '100%')
    .set('height', '100vh')
    .ease('in')
    .duration('0.8s')
    .end()
  move(gameTop.value)
    .set('width', '100%')
    .set('height', '100vh')
    .ease('in')
    .duration('0.8s')
    .end()
  await movePromise(
    move(gameLeftUp.value)
      .set('width', '100vw')
      .set('height', '100vh')
      .ease('in'),
    1000,
    gameLeftUp.value
  )
  move(gameBase.value).set('box-shadow', 'none').duration('0.8s').end()
  move(gameMiddle.value).set('box-shadow', 'none').duration('0.8s').end()
  await movePromise(
    move(gameTop.value).set('box-shadow', 'none'),
    800,
    gameTop.value
  )
  window.removeEventListener('keydown', prev)
  window.removeEventListener('keydown', next)
  await nextTick()
  busy.value = false
  router.push(path)
}

const start = () => {
  gameLeftArt.value.style.opacity = 0
  gameBackUl.value.style.cssText = 'opacity: 0; transform: translateX(-50px)'
  gameTop.value.style.cssText = 'opacity: 0; transform: scale(1.5)'
  gameMiddle.value.style.cssText = 'opacity: 0; transform: scale(1.5)'
  gameBase.value.style.cssText = 'transform: scale(0); box-shadow: none'
  gameLeftBottom.value.style.transform = 'scaleX(0)'
  gameLeftUp.value.style.transform = 'scaleY(0)'
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
    <div ref="gameBack" class="game-back">
      <div ref="gameLeftUp" class="game-left-up">
        <article ref="gameLeftArt">
          <h2>游戏</h2>
          <p>Yo</p>
        </article>
      </div>
      <div ref="gameLeftBottom" class="game-left-bottom"></div>
      <div ref="gameBase" class="game-base"></div>
      <div ref="gameMiddle" class="game-middle"></div>
      <div ref="gameTop" class="game-top"></div>
      <ul ref="gameBackUl">
        <li>
          <article>
            <h3>Title 1</h3>
            <p>1</p>
          </article>
        </li>
        <li>
          <article>
            <h3>Title 2</h3>
            <p>2</p>
          </article>
        </li>
        <li>
          <article>
            <h3>Title 3</h3>
            <p>3</p>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>
