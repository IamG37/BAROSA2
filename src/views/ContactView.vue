<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { LanguageCode } from '@/locales'
import { Mail } from 'lucide-vue-next'

const languageStore = useLanguageStore()
const currentLanguage = computed(() => languageStore.currentLanguage)
const $t = languageStore.t
const router = useRouter()

const changeLanguage = (lang: string) => {
  languageStore.changeLanguage(lang as LanguageCode)
}

const goHome = () => {
  router.push('/')
}

// 페이지 진입 시 스크롤을 맨 위로 이동
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="contact">
    <!-- 헤더 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <h1>Barosa</h1>
          <span class="subtitle">{{ $t('subtitle') }}</span>
        </div>
        <nav class="nav">
          <button class="nav-link" @click="goHome">{{ $t('nav.home') }}</button>
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

    <!-- 문의 섹션 -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <h1 class="contact-title">{{ $t('contact.title') }}</h1>
          <p class="contact-subtitle">
            {{ $t('contact.subtitle') }}
          </p>

          <div class="contact-form">
            <div class="contact-method">
              <div class="method-item">
                <div class="method-icon">
                  <Mail class="icon" />
                </div>
                <div class="method-content">
                  <h3>{{ $t('contact.email.title') }}</h3>
                  <p>{{ $t('contact.email.desc') }}</p>
                  <a href="mailto:g37.barosa@gmail.com" class="contact-link">
                    g37.barosa@gmail.com
                  </a>
                </div>
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
/* 헤더 스타일 */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.logo .subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
}

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

.nav-link:hover {
  background-color: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

.language-selector select {
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

.language-selector select:hover {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.5);
}

.language-selector option {
  background: #333;
  color: white;
}

/* 문의 섹션 스타일 */
.contact-section {
  padding: 4rem 0;
  background: #f8f9fa;
  min-height: calc(100vh - 200px);
}

.contact-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.contact-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.info-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.info-icon {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-icon .icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #667eea;
  stroke-width: 1.5;
}

.info-item h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.info-item p {
  color: #6c757d;
  font-size: 0.95rem;
}

.contact-form {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  text-align: center;
}

.contact-form h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.contact-form > p {
  color: #6c757d;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.contact-method {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.method-item {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  text-align: center;
}

.method-item:hover {
  transform: translateY(-5px);
  border-color: #667eea;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
}

.method-icon {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.method-icon .icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #667eea;
  stroke-width: 1.5;
}

.method-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.method-content p {
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.contact-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid #667eea;
  border-radius: 25px;
  transition: all 0.3s ease;
  background: white;
}

.contact-link:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* 푸터 스타일 */
.footer {
  background: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #667eea;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 1rem;
  text-align: center;
  color: #bdc3c7;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .contact-title {
    font-size: 2.5rem;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .contact-form {
    padding: 2rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 