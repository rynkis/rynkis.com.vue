<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import move from 'move-js'
import { movePromise } from '../helpers/animation'

const router = useRouter()

const faHome = ref(null)
const faBack = ref(null)
const faOver = ref(null)
const faMode = ref(null)
const footer = ref(null)
const thread = ref(null)
const surface = ref(null)
const detail = ref(null)
const showcase = ref(null)
const controller = ref(null)
const musicLeft = ref(null)
const busy = ref(false)

const prev = e => {
  if (e.which === 38) {
    fadeOut('/poetry')
  }
}

const fedeIn = async () => {
  if (busy.value) return
  busy.value = true
  await movePromise(move(musicLeft.value).scale(1), 1000, musicLeft.value)
  await movePromise(move(thread.value).scaleX(1), 1000, thread.value)
  move(surface.value).y(0).set('opacity', 1).duration('1s').end()
  await movePromise(
    move(detail.value).y(0).set('opacity', 1),
    1000,
    detail.value
  )
  for (let ele of [faHome, faBack, faOver, faMode]) {
    await movePromise(
      move(ele.value).y(0).set('opacity', 1).ease('linear'),
      200,
      ele.value
    )
  }
  // document.fmplayer.start()
  await movePromise(
    move(footer.value).y(0).set('opacity', 1),
    1000,
    footer.value
  )
  window.addEventListener('keydown', prev)
  await nextTick()
  busy.value = false
}

const fadeOut = async path => {
  if (busy.value) return
  busy.value = true
  // document.fmplayer.setLocalData()
  // document.fmplayer.removeOtherEvents()
  move(footer.value).set('opacity', 0).duration('1s').end()
  move(showcase.value).set('opacity', 0).duration('1s').end()
  await movePromise(
    move(controller.value).set('opacity', 0),
    1000,
    controller.value
  )
  await movePromise(
    move(musicLeft.value).scaleX(5).ease('in'),
    1000,
    musicLeft.value
  )
  window.removeEventListener('keydown', prev)
  await nextTick()
  busy.value = false
  router.push(path)
}

const start = () => {
  // if (!document.fmplayer) document.fmplayer = new FM_GITMV()
  // document.fmplayer.render()
  for (let ele of [faHome, faBack, faOver, faMode]) {
    ele.value.style.cssText = 'opacity: 0; transform: translateY(-20px)'
  }
  footer.value.style.cssText = 'opacity: 0; transform: translateY(20px)'
  thread.value.style.transform = 'scaleX(0)'
  surface.value.style.cssText = 'opacity: 0; transform: translateY(20px)'
  detail.value.style.cssText = 'opacity: 0; transform: translateY(-20px)'
  musicLeft.value.style.transform = 'scale(5)'
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
    <div class="music-back-left" />
    <div class="music-back-right" />
    <div class="music-back">
      <div ref="musicLeft" class="music-left" />
    </div>
    <div ref="showcase" class="showcase">
      <div ref="surface" class="surface">
        <div class="cover">
          <canvas class="album" width="100" height="100" />
        </div>
        <div class="magic"><i class="fa fa-play" /></div>
      </div>
      <div ref="thread" class="thread">
        <div class="buffered" />
        <div class="elapsed" />
      </div>
      <div ref="detail" class="detail">
        <div class="title" />
        <div class="artists" />
      </div>
      <div ref="lyric" class="lyric">
        <div class="lrc" />
        <div class="tlrc" />
      </div>
    </div>
    <div ref="controller" class="controller">
      <div ref="faHome" class="item" data-id="fa-home">
        <a class="fa-button"><i class="fa fa-github" title="Github" /></a>
      </div>
      <div ref="faBack" class="item" data-id="fa-back">
        <a class="fa-button"><i class="fa fa-chevron-up" title="Prev" /></a>
      </div>
      <div ref="faOver" class="item" data-id="fa-over">
        <a class="fa-button"><i class="fa fa-chevron-down" title="Next" /></a>
      </div>
      <div ref="faMode" class="item" data-id="fa-mode">
        <a class="fa-button"><i class="fa fa-random" title="Random" /></a>
      </div>
    </div>
    <div ref="footer" class="music-footer">
      <p>
        <span class="music-footer-left">inspire by publicis90, Musicoon</span>
        <span class="music-footer-right">Copyright (c) rynkis.com</span>
      </p>
    </div>
  </div>
</template>
