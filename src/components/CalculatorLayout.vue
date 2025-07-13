<template>
  <div class="calculator-layout">
    <!-- 계산기 전용 헤더 -->
    <header class="calc-header">
      <div class="calc-header-content">
        <!-- 로고 및 메인으로 돌아가기 -->
        <div class="calc-logo-section">
          <div class="calc-logo">
            <span class="calc-logo-text">Calculator37</span>
          </div>
          <router-link to="/" class="back-to-main">
            <span class="back-icon">←</span>
            <span class="back-text">{{ $t('backToMain') }}</span>
          </router-link>
        </div>

        <!-- 언어 선택기 -->
        <div class="calc-language-selector">
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

    <!-- 계산기 탭 네비게이션 -->
    <nav class="calc-nav">
      <div class="calc-nav-content">
        <router-link 
          to="/calculator37/basic" 
          class="calc-nav-tab" 
          active-class="active"
        >
          {{ $t('basicCalculator') }}
        </router-link>
        <router-link 
          to="/calculator37/scientific" 
          class="calc-nav-tab" 
          active-class="active"
        >
          {{ $t('scientificCalculator') }}
        </router-link>
        <router-link 
          to="/calculator37/unit" 
          class="calc-nav-tab" 
          active-class="active"
        >
          {{ $t('unitConverter') }}
        </router-link>
        <router-link 
          to="/calculator37/financial" 
          class="calc-nav-tab" 
          active-class="active"
        >
          {{ $t('financialCalculator') }}
        </router-link>
      </div>
    </nav>

    <!-- 계산기 컨텐츠 영역 -->
    <main class="calc-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import type { LanguageCode } from '@/locales'

const languageStore = useLanguageStore()
const currentLanguage = computed(() => languageStore.currentLanguage)
const $t = languageStore.t

const changeLanguage = (lang: string) => {
  languageStore.changeLanguage(lang as LanguageCode)
}
</script>

<style scoped>
.calculator-layout {
  min-height: 100vh;
  background: #f8f9fa;
}

/* 계산기 헤더 */
.calc-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.calc-header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 로고 섹션 */
.calc-logo-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.calc-logo {
  text-decoration: none;
  color: white;
}

.calc-logo-text {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.back-to-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  background: rgba(255,255,255,0.15);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.back-to-main:hover {
  background: rgba(255,255,255,0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.back-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.back-text {
  font-size: 0.9rem;
}

/* 언어 선택기 */
.calc-language-selector select {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.calc-language-selector select:hover {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.5);
}

.calc-language-selector select:focus {
  outline: none;
  border-color: rgba(255,255,255,0.8);
  box-shadow: 0 0 0 2px rgba(255,255,255,0.2);
}

.calc-language-selector option {
  background: #333;
  color: white;
}

/* 계산기 네비게이션 */
.calc-nav {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  position: sticky;
  top: 80px;
  z-index: 999;
}

.calc-nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  min-width: 0;
}

.calc-nav-tab {
  color: #666;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1.2rem 2rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
  margin: 0.5rem 0.25rem;
  min-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.calc-nav-tab:hover {
  background: #f3e5f5;
  color: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(118,75,162,0.15);
}

.calc-nav-tab.active,
.calc-nav-tab.router-link-exact-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 6px 20px rgba(102,126,234,0.4);
  transform: translateY(-1px);
}

/* 계산기 컨텐츠 */
.calc-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 20px;
  min-height: calc(100vh - 200px);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .calc-header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .calc-logo-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .calc-nav-content {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .calc-nav-tab {
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
  }
}
</style> 