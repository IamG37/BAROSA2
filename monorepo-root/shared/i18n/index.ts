export const messages = { ko: { hello: '안녕하세요' }, en: { hello: 'Hello' } }
export function t(key, lang = 'ko') { return messages[lang]?.[key] || key }
