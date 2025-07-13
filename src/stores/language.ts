import { defineStore } from 'pinia'
import { ref } from 'vue'
import { translations, type LanguageCode } from '@/locales'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref<LanguageCode>('ko')

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

  // Initialize language from localStorage
  const savedLanguage = localStorage.getItem('language') as LanguageCode
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage.value = savedLanguage
  }

  return {
    currentLanguage,
    changeLanguage,
    t
  }
}) 