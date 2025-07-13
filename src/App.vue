<script setup lang="ts">
// Google AdSense 스크립트 추가
import { onMounted } from 'vue'

onMounted(() => {
  // Google AdSense 스크립트 동적 로드
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4557130939365877'
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* 전역 스타일은 main.css에서 관리 */
</style>
