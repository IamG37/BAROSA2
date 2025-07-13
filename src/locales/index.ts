import ko from './ko'
import en from './en'
import ja from './ja'
import zh from './zh'
import es from './es'
import fr from './fr'
import de from './de'
import ru from './ru'
import pt from './pt'
import it from './it'

export const translations = {
  ko,
  en,
  ja,
  zh,
  es,
  fr,
  de,
  ru,
  pt,
  it
}

export type LanguageCode = keyof typeof translations 