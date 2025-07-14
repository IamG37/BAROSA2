<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { LanguageCode } from '@/locales'
import { Zap, Shield, Lightbulb, Users } from 'lucide-vue-next'

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

const goHome = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goAbout = () => {
  const el = document.getElementById('about')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const goContact = () => {
  router.push('/contact')
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
          <button class="nav-link" @click="goHome">{{ $t('nav.home') }}</button>
          <button class="nav-link" @click="goServices">{{ $t('nav.services') }}</button>
          <button class="nav-link" @click="goAbout">{{ $t('nav.about') }}</button>
          <button class="nav-link" @click="goContact">{{ $t('nav.contact') }}</button>
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

    <!-- 소개 섹션 -->
    <section class="about-section" id="about">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="about-title">BAROSA.shop</h2>
            <p class="about-description">
              {{ $t('about.description') }}
            </p>
            <div class="about-features">
              <div class="feature-item">
                <div class="feature-icon">
                  <Zap class="icon" />
                </div>
                <h3>{{ $t('about.performance.title') }}</h3>
                <p>{{ $t('about.performance.desc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <Shield class="icon" />
                </div>
                <h3>{{ $t('about.security.title') }}</h3>
                <p>{{ $t('about.security.desc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <Lightbulb class="icon" />
                </div>
                <h3>{{ $t('about.innovation.title') }}</h3>
                <p>{{ $t('about.innovation.desc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <Users class="icon" />
                </div>
                <h3>{{ $t('about.user.title') }}</h3>
                <p>{{ $t('about.user.desc') }}</p>
              </div>
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

/* 네비게이션 버튼 스타일 */
.nav-link {
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
}

.nav-link:hover,
.nav-link.active {
  background-color: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

/* 소개 섹션 스타일 */
.about-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.about-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.about-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.about-description {
  font-size: 1.3rem;
  color: #5a6c7d;
  margin-bottom: 3rem;
  line-height: 1.8;
  font-weight: 400;
}

.about-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-item {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
}

.feature-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.15);
}

.feature-icon {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-icon .icon {
  width: 3rem;
  height: 3rem;
  color: #667eea;
  stroke-width: 1.5;
}

.feature-item h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-item p {
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .about-title {
    font-size: 2.5rem;
  }
  
  .about-description {
    font-size: 1.1rem;
  }
  
  .about-features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-item {
    padding: 1.5rem;
  }
}
</style>
