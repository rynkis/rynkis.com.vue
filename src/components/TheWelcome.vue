<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import move from 'move-js'
import { movePromise } from '../helpers/animation'

const router = useRouter()

const body = ref(null)
const welcomeRight = ref(null)
const flipper = ref(null)
const avatarTop = ref(null)
const avatarMiddle = ref(null)
const avatarBase = ref(null)
const avatarBack = ref(null)
const welcomeLeft = ref(null)
const busy = ref(false)

const next = e => {
  if (e.which === 40) {
    fadeOut('/design')
  }
}

const fedeIn = async () => {
  if (busy.value) return
  busy.value = true
  await movePromise(move(welcomeLeft.value).scale(1), 800, welcomeLeft.value)
  await movePromise(move(avatarBack.value).y(0), 600, avatarBack.value)
  move(avatarBase.value).set('opacity', 1).y(0).scale(1).duration('0.6s').end()
  move(avatarMiddle.value).scale(1).duration('0.6s').delay('0.1s').end()
  await movePromise(move(avatarTop.value).scale(0.6), 600, avatarTop.value, 150)
  flipper.value.style.cssText = ''
  await movePromise(
    move(welcomeRight.value).x(0).set('opacity', 1),
    1200,
    welcomeRight.value
  )
  window.addEventListener('keydown', next)
  await nextTick()
  busy.value = false
}

const fadeOut = async path => {
  if (busy.value) return
  busy.value = true
  flipper.value.style.transform = 'rotateY(-180deg)'
  await movePromise(
    move(avatarBase.value).set('box-shadow', 'none'),
    1000,
    avatarBase.value
  )
  move(avatarMiddle.value)
    .set('width', '20%')
    .set('padding-bottom', '20%')
    .duration('1.5s')
    .ease('linear')
    .end()
  await movePromise(move(avatarBase.value).scale(12), 1800, avatarBase.value)
  await movePromise(
    move(avatarMiddle.value).set('opacity', 0),
    1000,
    avatarMiddle.value
  )
  window.removeEventListener('keydown', next)
  await nextTick()
  busy.value = false
  router.push(path)
}

const start = () => {
  welcomeRight.value.style.cssText = 'opacity: 0; transform: translateX(20px)'
  flipper.value.style.transform = 'rotateY(-180deg)'
  avatarTop.value.style.transform = 'scale(0)'
  avatarMiddle.value.style.transform = 'scale(0)'
  avatarBase.value.style.cssText =
    'opacity: 0; transform: translateY(50px) scale(0.8)'
  avatarBack.value.style.transform = 'translateY(100%)'
  welcomeLeft.value.style.transform = 'scale(0, 1)'
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
    <div ref="welcomeBack" class="welcome-back">
      <div ref="welcomeLeft" class="welcome-left" />
      <div ref="avatarBack" class="avatar-back" />
      <div ref="avatarBase" class="circle avatar-base" />
      <div ref="avatarMiddle" class="circle avatar-middle">
        <div ref="avatarTop" class="circle avatar-top">
          <div ref="flipper" class="circle flipper">
            <div class="circle avatar-top-front" />
            <div class="circle avatar-top-back" />
          </div>
        </div>
      </div>
      <div ref="welcomeRight" class="welcome-right">
        <h2>欢迎！</h2>
        <p>Hi</p>
      </div>
    </div>
  </div>
</template>
