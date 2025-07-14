import { defineStore } from 'pinia'
import { ref } from 'vue'
import { translations, type LanguageCode } from '@/locales'

export const useLanguageStore = defineStore('language', () => {
  const getDefaultLanguage = (): LanguageCode => {
    // 1. localStorage 우선
    const savedLanguage = localStorage.getItem('language') as LanguageCode
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage
    }
    // 2. 브라우저 언어 감지
    const browserLang = navigator.language.split('-')[0] as LanguageCode
    if (translations[browserLang]) {
      return browserLang
    }
    // 3. 지원하지 않으면 영어
    return 'en'
  }

  const currentLanguage = ref<LanguageCode>(getDefaultLanguage())

  function changeLanguage(lang: LanguageCode) {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }

  function t(key: string): string {
    const lang = currentLanguage.value
    const translation = translations[lang]
    
    if (!translation) {
      console.warn(`Translation not found for language: ${lang}`)
      return key
    }
    
    const value = translation[key as keyof typeof translation]
    
    if (!value) {
      console.warn(`Translation key not found: ${key} for language: ${lang}`)
      // Fallback to English if available
      const englishValue = translations.en[key as keyof typeof translations.en]
      if (englishValue) {
        return englishValue
      }
      return key
    }
    
    return value
  }

  return {
    currentLanguage,
    changeLanguage,
    t
  }
}) 