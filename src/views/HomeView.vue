<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { computed } from 'vue'

const languageStore = useLanguageStore()

const currentLanguage = computed(() => languageStore.currentLanguage)
const $t = languageStore.t

const changeLanguage = (lang: string) => {
  languageStore.changeLanguage(lang)
}

const scrollToServices = () => {
  const servicesSection = document.querySelector('#services')
  if (servicesSection) {
    servicesSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
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
          <a href="#home" class="nav-link active">{{ $t('nav.home') }}</a>
          <a href="#services" class="nav-link">{{ $t('nav.services') }}</a>
          <a href="#about" class="nav-link">{{ $t('nav.about') }}</a>
          <a href="#contact" class="nav-link">{{ $t('nav.contact') }}</a>
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

    <!-- 메인 배너 광고 -->
    <section class="hero-banner">
      <div class="banner-content">
        <div class="banner-text">
          <h2>{{ $t('hero.title') }}</h2>
          <p>{{ $t('hero.subtitle') }}</p>
          <button class="cta-button" @click="scrollToServices">{{ $t('hero.cta') }}</button>
        </div>
        <div class="banner-image">
          <!-- 광고 placeholder 관련 코드 전체 삭제 -->
        </div>
      </div>
    </section>

    <!-- 서비스 섹션 -->
    <section class="services-section" id="services">
      <div class="container">
        <h2 class="section-title">{{ $t('services.title') }}</h2>
        <div class="services-grid">
          <!-- Calculator37 서비스 -->
          <div class="service-card featured">
            <div class="service-icon">🧮</div>
            <h3>Calculator37</h3>
            <p>{{ $t('services.calculator.description') }}</p>
            <div class="service-features">
              <span class="feature-tag">{{ $t('services.calculator.features.realtime') }}</span>
              <span class="feature-tag">{{ $t('services.calculator.features.advanced') }}</span>
              <span class="feature-tag">{{ $t('services.calculator.features.history') }}</span>
            </div>
            <router-link to="/calculator37" class="service-button">{{ $t('services.calculator.use') }}</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 사이드 광고 -->
    <aside class="side-ads">
      <div class="ad-card">
        <div class="ad-content">
          <span class="ad-label">{{ $t('ad.label') }}</span>
          <div class="ad-placeholder-small">
            <span>160x600</span>
          </div>
        </div>
      </div>
      <div class="ad-card">
        <div class="ad-content">
          <span class="ad-label">{{ $t('ad.label') }}</span>
          <div class="ad-placeholder-small">
            <span>160x600</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- 하단 광고 -->
    <section class="bottom-ads">
      <div class="container">
        <div class="ad-banner">
          <div class="ad-text">
            <h3>{{ $t('bottom.ad.title') }}</h3>
            <p>{{ $t('bottom.ad.subtitle') }}</p>
          </div>
          <div class="ad-action">
            <div class="ad-placeholder-horizontal">
              <span>{{ $t('ad.label') }}</span>
              <small>728x90</small>
            </div>
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
              <li><router-link to="/calculator37">Calculator37</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>{{ $t('footer.support') }}</h4>
            <ul>
              <li><a href="#">{{ $t('footer.support.contact') }}</a></li>
              <li><a href="#">{{ $t('footer.support.faq') }}</a></li>
              <li><a href="#">{{ $t('footer.support.terms') }}</a></li>
              <li><a href="#">{{ $t('footer.support.privacy') }}</a></li>
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
/* 컴포넌트별 스타일이 필요한 경우 여기에 추가 */
</style>
