<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { LanguageCode } from '@/locales'

const languageStore = useLanguageStore()
const currentLanguage = computed(() => languageStore.currentLanguage)
const $t = languageStore.t
const router = useRouter()

const changeLanguage = (lang: string) => {
  languageStore.changeLanguage(lang as LanguageCode)
}

const goServices = () => {
  const el = document.getElementById('services')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="home">
    <!-- 헤더 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <h1>Barosa</h1>
          <span class="subtitle">{{ $t('subtitle') }}</span>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link" active-class="active">{{ $t('nav.home') }}</router-link>
          <router-link to="/services" class="nav-link" active-class="active">{{ $t('nav.services') }}</router-link>
          <router-link to="/about" class="nav-link" active-class="active">{{ $t('nav.about') }}</router-link>
          <router-link to="/contact" class="nav-link" active-class="active">{{ $t('nav.contact') }}</router-link>
        </nav>
        <div class="language-selector">
          <select :value="currentLanguage" @change="(event) => changeLanguage((event.target as HTMLSelectElement).value)">
            <option value="ko">🇰🇷 한국어</option>
            <option value="en">🇺🇸 English</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="zh">🇨🇳 中文</option>
            <option value="es">🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="pt">🇧🇷 Português</option>
            <option value="it">🇮🇹 Italiano</option>
          </select>
        </div>
      </div>
    </header>

    <!-- 메인 배너 -->
    <section class="hero-banner">
      <div class="banner-content">
        <div class="banner-text">
          <h2>{{ $t('hero.title') }}</h2>
          <p>{{ $t('hero.subtitle') }}</p>
          <button class="cta-button" @click="goServices">{{ $t('hero.cta') }}</button>
        </div>
        <div class="banner-image"></div>
      </div>
    </section>

    <!-- 서비스 섹션 -->
    <section class="services-section" id="services">
      <div class="container">
        <h2 class="section-title">{{ $t('services.title') }}</h2>
        <div class="services-grid">
          <!-- Calculator37 서비스 -->
          <div class="service-card featured">
            <h3>Calculator37</h3>
            <p>{{ $t('services.calculator.description') }}</p>
            <div class="service-features">
              <span class="feature-tag">{{ $t('services.calculator.features.realtime') }}</span>
              <span class="feature-tag">{{ $t('services.calculator.features.advanced') }}</span>
              <span class="feature-tag">{{ $t('services.calculator.features.history') }}</span>
            </div>
            <router-link to="/calculator37/basic" class="service-button">{{ $t('services.calculator.use') }}</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>Barosa</h4>
            <p>{{ $t('footer.description') }}</p>
          </div>
          <div class="footer-section">
            <h4>{{ $t('footer.services') }}</h4>
            <ul>
              <li><router-link to="/calculator37/basic">Calculator37</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>{{ $t('footer.support') }}</h4>
            <ul>
              <li><a href="#" @click.prevent>{{ $t('footer.support.contact') }}</a></li>
              <li><a href="#" @click.prevent>{{ $t('footer.support.faq') }}</a></li>
              <li><a href="#" @click.prevent>{{ $t('footer.support.terms') }}</a></li>
              <li><a href="#" @click.prevent>{{ $t('footer.support.privacy') }}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Barosa. <span>{{ $t('footer.rights') }}</span></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 기존 스타일 유지 */
</style>
