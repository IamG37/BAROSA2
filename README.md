# Barosa Vue - 상가 서비스 허브

Vue.js 3로 구현된 Barosa 상가 서비스 허브입니다. 원본 HTML/CSS/JS 버전을 Vue.js로 마이그레이션하여 상태 관리와 컴포넌트 재사용성을 개선했습니다.

## 🚀 주요 기능

### ✅ 해결된 문제점
- **상태 공유**: Pinia를 사용한 전역 상태 관리로 언어 설정이 페이지 간 유지
- **코드 중복 제거**: 공통 컴포넌트 재사용으로 유지보수성 향상
- **타입 안전성**: TypeScript로 타입 안전성 확보
- **개발 효율성**: Vue DevTools로 디버깅 및 상태 관리 용이

### 🌍 다국어 지원
- 🇰🇷 한국어 (기본)
- 🇺🇸 영어, 🇯🇵 일본어, 🇨🇳 중국어
- 🇪🇸 스페인어, 🇫🇷 프랑스어, 🇩🇪 독일어
- 🇷🇺 러시아어, 🇵🇹 포르투갈어, 🇮🇹 이탈리아어

### 🧮 Calculator37 서비스
1. **기본 계산기**: 사칙연산, 백분율 계산
2. **공학용 계산기**: 삼각함수, 로그함수, 제곱근 등
3. **단위 변환기**: 길이, 무게, 온도, 면적, 부피
4. **금융 계산기**: 이자 계산, 대출 상환금 계산

## 🛠️ 기술 스택

- **Vue 3**: Composition API
- **TypeScript**: 타입 안전성
- **Pinia**: 상태 관리
- **Vue Router**: 라우팅
- **Vite**: 빌드 도구
- **Font Awesome**: 아이콘

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

## 🏗️ 프로젝트 구조

```
barosa-vue/
├── src/
│   ├── assets/
│   │   └── main.css          # 전역 스타일
│   ├── components/           # 공통 컴포넌트
│   ├── views/
│   │   ├── HomeView.vue      # 메인 페이지
│   │   └── Calculator37View.vue # 계산기 페이지
│   ├── stores/
│   │   └── language.ts       # 다국어 상태 관리
│   ├── router/
│   │   └── index.ts          # 라우터 설정
│   ├── App.vue               # 루트 컴포넌트
│   └── main.ts               # 앱 진입점
├── public/                   # 정적 파일
├── dist/                     # 빌드 결과물
└── package.json
```

## 🔧 주요 개선사항

### 1. 상태 관리
```typescript
// Pinia store로 언어 설정 전역 관리
const languageStore = useLanguageStore()
const currentLanguage = computed(() => languageStore.currentLanguage)
const $t = languageStore.t
```

### 2. 컴포넌트 재사용
```vue
<!-- 공통 언어 선택기 컴포넌트 -->
<select :value="currentLanguage" @change="changeLanguage">
  <option value="ko">🇰🇷 한국어</option>
  <!-- ... -->
</select>
```

### 3. 반응형 데이터
```vue
<!-- Vue의 반응형 시스템으로 실시간 업데이트 -->
<div class="current-operand">{{ currentOperand }}</div>
```

## 🚀 배포

### GitHub Pages 배포
```bash
npm run deploy
```

### 수동 배포
```bash
npm run build
# dist 폴더의 내용을 GitHub Pages에 업로드
```

## 📈 SEO 최적화

- **메타태그**: 각 페이지별 최적화된 메타태그
- **구조화된 데이터**: JSON-LD 스키마
- **사이트맵**: 자동 생성
- **다국어**: hreflang 태그

## 💰 수익화

- **Google AdSense**: 사이드바, 배너, 인라인 광고
- **SEO 최적화**: 각 서비스별 독립적인 검색 노출
- **전 세계 사용자**: 다국어 지원으로 글로벌 수익

## 🔄 원본과의 차이점

| 항목 | 원본 | Vue.js 버전 |
|------|------|-------------|
| 상태 관리 | localStorage + DOM 조작 | Pinia 전역 상태 |
| 코드 중복 | 각 페이지마다 동일 코드 | 컴포넌트 재사용 |
| 타입 안전성 | JavaScript | TypeScript |
| 개발 도구 | 브라우저 개발자 도구 | Vue DevTools |
| 빌드 최적화 | 수동 | Vite 자동 최적화 |
| 유지보수성 | 낮음 | 높음 |

## 🎯 향후 계획

1. **새로운 서비스 추가**: 각각 독립적인 Vue 컴포넌트로 구현
2. **PWA 지원**: 오프라인 기능 및 앱 설치 지원
3. **성능 최적화**: 코드 스플리팅 및 지연 로딩
4. **테스트 코드**: Jest + Vue Test Utils로 단위 테스트

---

**Barosa Vue** - Vue.js로 재탄생한 상가 서비스 허브 🚀
