<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import move from 'move-js'
import { movePromise } from '../helpers/animation'

const router = useRouter()

const per35 = `${100 * 0.35 * 0.35}%`
const per40 = `${100 * 0.4 * 0.4}%`
const per50 = `${100 * 0.4 * 0.5}%`
const per60 = `${100 * 0.4 * 0.6}%`
const per70 = `${100 * 0.4 * 0.7}%`
const per80 = `${100 * 0.4 * 0.8}%`

const chartsL = ref(null)
const chartsC = ref(null)
const chartsR = ref(null)
const skillCenterH2 = ref(null)
const skillLeft = ref(null)
const skillRight = ref(null)
const skillRbase = ref(null)
const skillRmiddle = ref(null)
const skillRtop = ref(null)
const skillObase = ref(null)
const skillOmiddle = ref(null)
const skillOtop = ref(null)
const skillTbase = ref(null)
const skillTmiddle = ref(null)
const skillTtop = ref(null)
const busy = ref(false)

const prev = e => {
  if (e.which === 38) {
    fadeOut('/design')
  }
}

const next = e => {
  if (e.which === 40) {
    fadeOut('/game')
  }
}

const fedeIn = async () => {
  if (busy.value) return
  busy.value = true
  move(skillLeft.value).scaleX(1).duration('1.6s').end()
  await movePromise(move(skillRight.value).scaleX(1), 1600, skillRight.value)
  move(skillObase.value).set('opacity', 1).duration('0s').end()
  move(skillObase.value).scale(1).duration('0.8s').end()
  move(skillOmiddle.value).scale(0.75).duration('0.8s').delay('0.1s').end()
  move(skillOtop.value).scale(0.6).duration('0.8s').delay('0.2s').end()
  move(skillTbase.value).set('opacity', 1).duration('0.8s').end()
  move(skillTmiddle.value)
    .set('top', '50%')
    .set('left', '50%')
    .duration('0.8s')
    .delay('0.2s')
    .ease('in')
    .end()
  move(skillTtop.value)
    .set('top', '50%')
    .set('left', '50%')
    .duration('0.8s')
    .delay('0.4s')
    .ease('out')
    .end()
  await movePromise(
    move(skillRbase.value).set('opacity', 1).scale(1),
    500,
    skillRbase.value
  )
  await movePromise(
    move(skillRmiddle.value).scale(0.75).ease('in'),
    500,
    skillRmiddle.value
  )
  await movePromise(
    move(skillRtop.value).scale(0.6).ease('out'),
    500,
    skillRtop.value
  )
  move(chartsL.value).x(0).set('opacity', 1).duration('0.8s').end()
  move(chartsC.value).y(0).set('opacity', 1).duration('0.8s').end()
  move(chartsR.value).x(0).set('opacity', 1).duration('0.8s').end()
  await movePromise(
    move(skillCenterH2.value).y(0).set('opacity', 1),
    1000,
    skillCenterH2.value
  )
  const eles = document.querySelectorAll('.value')
  eles.forEach((ele, index) => {
    move(ele).scaleX(1).duration('1s').end()
  })
  window.addEventListener('keydown', prev)
  window.addEventListener('keydown', next)
  await nextTick()
  busy.value = false
}

const fadeOut = async path => {
  if (busy.value) return
  busy.value = true
  move(chartsL.value).x(50).set('opacity', 0).duration('1s').end()
  move(chartsC.value).set('opacity', 0).duration('1s').end()
  move(chartsR.value).x(-50).set('opacity', 0).duration('1s').end()
  await movePromise(
    move(skillCenterH2.value).y(50).set('opacity', 0),
    1000,
    skillCenterH2.value
  )
  move(skillRbase.value).set('opacity', 0).duration('1s').end()
  move(skillObase.value).set('opacity', 0).duration('1s').end()
  await movePromise(
    move(skillTbase.value).set('opacity', 0),
    1000,
    skillTbase.value
  )
  move(skillLeft.value).scaleX(0).ease('in').duration('1s').end()
  await movePromise(
    move(skillRight.value).set('width', '100%').ease('in'),
    1000,
    skillRight.value
  )
  await new Promise(resolve => setTimeout(resolve, 1000))
  window.removeEventListener('keydown', prev)
  window.removeEventListener('keydown', next)
  await nextTick()
  busy.value = false
  router.push(path)
}

const start = () => {
  document.querySelectorAll('.value').forEach(ele => {
    ele.style.transform = 'scaleX(0)'
  })
  chartsL.value.style.cssText = 'opacity: 0; transform: translateX(-50px)'
  chartsC.value.style.cssText = 'opacity: 0; transform: translateY(50px)'
  chartsR.value.style.cssText = 'opacity: 0; transform: translateX(50px)'
  skillCenterH2.value.style.cssText = 'opacity: 0; transform: translateY(-50px)'
  skillLeft.value.style.transform = 'scaleX(0)'
  skillRight.value.style.transform = 'scaleX(0)'
  skillRbase.value.style.cssText = 'opacity: 0; transform: scale(1.2)'
  skillRmiddle.value.style.transform = 'scale(1)'
  skillRtop.value.style.transform = 'scale(1)'
  skillObase.value.style.cssText = 'opacity: 0; transform: scale(0)'
  skillOmiddle.value.style.transform = 'scale(0)'
  skillOtop.value.style.transform = 'scale(0)'
  skillTbase.value.style.opacity = 0
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
    <div class="skill-center">
      <h2 ref="skillCenterH2">技术</h2>
      <div ref="skillRbase" class="skill-r-base">
        <div ref="skillRmiddle" class="skill-r-middle">
          <div ref="skillRtop" class="skill-r-top" />
        </div>
      </div>
    </div>
    <div ref="skillLeft" class="skill-left">
      <div ref="skillObase" class="skill-o-base">
        <div ref="skillOmiddle" class="skill-o-middle">
          <div ref="skillOtop" class="skill-o-top" />
        </div>
      </div>
    </div>
    <div ref="skillRight" class="skill-right">
      <div ref="skillTbase" class="skill-t-base">
        <div ref="skillTmiddle" class="skill-t-middle">
          <div ref="skillTtop" class="skill-t-top" />
        </div>
      </div>
    </div>
    <div class="skill-charts">
      <div ref="chartsL" class="charts-l">
        <h3>1</h3>
        <ul>
          <li>
            <div class="string">1</div>
            <span><span class="value" :style="{ width: per70 }" /></span>
          </li>
          <li>
            <div class="string">1</div>
            <span><span class="value" :style="{ width: per40 }" /></span>
          </li>
          <li>
            <div class="string">1</div>
            <span><span class="value" :style="{ width: per35 }" /></span>
          </li>
          <li>
            <div class="string">1</div>
            <span><span class="value" :style="{ width: per35 }" /></span>
          </li>
        </ul>
      </div>
      <div ref="chartsC" class="charts-c">
        <h3>2</h3>
        <ul>
          <li>
            <div class="string">2</div>
            <span><span class="value" :style="{ width: per60 }" /></span>
          </li>
          <li>
            <div class="string">2</div>
            <span><span class="value" :style="{ width: per50 }" /></span>
          </li>
          <li>
            <div class="string">2</div>
            <span><span class="value" :style="{ width: per40 }" /></span>
          </li>
          <li>
            <div class="string">2</div>
            <span><span class="value" :style="{ width: per40 }" /></span>
          </li>
        </ul>
      </div>
      <div ref="chartsR" class="charts-r">
        <h3>3</h3>
        <ul>
          <li>
            <div class="string">3</div>
            <span><span class="value" :style="{ width: per80 }" /></span>
          </li>
          <li>
            <div class="string">3</div>
            <span><span class="value" :style="{ width: per50 }" /></span>
          </li>
          <li>
            <div class="string">3</div>
            <span><span class="value" :style="{ width: per35 }" /></span>
          </li>
          <li>
            <div class="string">3</div>
            <span><span class="value" :style="{ width: per40 }" /></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
