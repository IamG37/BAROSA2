# Barosa Vue - 상가 서비스 허브

Vue.js 3로 구현된 Barosa 상가 서비스 허브입니다. 원본 HTML/CSS/JS 버전을 Vue.js로 마이그레이션하여 상태 관리와 컴포넌트 재사용성을 개선했습니다.

## 🚀 주요 기능

### ✅ 해결된 문제점
- **상태 공유**: Pinia를 사용한 전역 상태 관리로 언어 설정이 페이지 간 유지
- **코드 중복 제거**: 공통 컴포넌트 재사용으로 유지보수성 향상
- **타입 안전성**: TypeScript로 타입 안전성 확보
- **개발 효율성**: Vue DevTools로 디버깅 및 상태 관리 용이
- **다국어 지원**: 10개 언어 완전 지원 및 모듈화된 번역 시스템

### 🌍 다국어 지원 (10개 언어 완전 지원)
- 🇰🇷 한국어 (기본)
- 🇺🇸 영어, 🇯🇵 일본어, 🇨🇳 중국어
- 🇪🇸 스페인어, 🇫🇷 프랑스어, 🇩🇪 독일어
- 🇷🇺 러시아어, 🇵🇹 포르투갈어, 🇮🇹 이탈리아어

### 🧮 Calculator37 서비스
1. **기본 계산기**: 사칙연산, 백분율 계산, 부호변경
2. **공학용 계산기**: 삼각함수, 로그함수, 제곱근, 메모리 기능
3. **단위 변환기**: 길이, 무게, 온도, 면적, 부피, 속도
4. **금융 계산기**: 이자 계산, 대출 상환금, 투자 수익률, 복리 계산

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

## 🌐 배포 및 도메인

### 🚀 자동 배포
- **GitHub Actions**: main 브랜치에 push할 때마다 자동 배포
- **도메인**: https://barosa.shop
- **배포 스크립트**: `npm run deploy:full`

### 📋 배포 방법
```bash
# 전체 배포 (권장)
npm run deploy:full

# 수동 배포
npm run deploy:manual

# 원격 저장소 설정
npm run deploy:setup
```

### 🔧 배포 설정
- **GitHub 저장소**: https://github.com/IamG37/BAROSA2
- **GitHub Pages**: 자동 빌드 및 배포
- **커스텀 도메인**: barosa.shop (CNAME 설정 완료)
- **SSL**: GitHub에서 자동 발급

### 🔄 백업 시스템
- **백업 저장소**: https://github.com/IamG37/BAROSAv2
- **백업 URL**: https://iamg37.github.io/BAROSAv2
- **백업 스크립트**: `npm run deploy:backup`
- **백업 가이드**: [BACKUP.md](./BACKUP.md)
```

## 🏗️ 프로젝트 구조

```
barosa-vue/
├── src/
│   ├── assets/
│   │   └── main.css          # 전역 스타일
│   ├── components/           # 공통 컴포넌트
│   │   ├── CalculatorLayout.vue    # 계산기 레이아웃
│   │   └── calculators/      # 계산기 컴포넌트들
│   │       ├── BasicCalculator.vue
│   │       ├── ScientificCalculator.vue
│   │       ├── UnitCalculator.vue
│   │       └── FinancialCalculator.vue
│   ├── locales/              # 다국어 번역 파일들
│   │   ├── index.ts          # 번역 통합 및 타입 정의
│   │   ├── ko.ts             # 한국어
│   │   ├── en.ts             # 영어
│   │   ├── ja.ts             # 일본어
│   │   ├── zh.ts             # 중국어
│   │   ├── es.ts             # 스페인어
│   │   ├── fr.ts             # 프랑스어
│   │   ├── de.ts             # 독일어
│   │   ├── ru.ts             # 러시아어
│   │   ├── pt.ts             # 포르투갈어
│   │   └── it.ts             # 이탈리아어
│   ├── stores/
│   │   └── language.ts       # 다국어 상태 관리
│   ├── views/
│   │   ├── HomeView.vue      # 메인 페이지
│   │   └── Calculator37View.vue # 계산기 페이지
│   ├── router/
│   │   └── index.ts          # 라우터 설정
│   ├── App.vue               # 루트 컴포넌트
│   └── main.ts               # 앱 진입점
├── monorepo-root/            # 모노레포 구조
│   ├── hub-app/              # 메인 허브 애플리케이션
│   ├── services/             # 개별 서비스들
│   │   ├── calculator37/     # 계산기 서비스
│   │   └── converter/        # 변환기 서비스
│   └── shared/               # 공통 라이브러리
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

### 4. 모듈화된 다국어 시스템
```typescript
// 각 언어별 독립적인 번역 파일
import { translations, type LanguageCode } from '@/locales'

// 타입 안전한 언어 변경
function changeLanguage(lang: LanguageCode) {
  currentLanguage.value = lang
}
```

## 🌐 다국어 번역 시스템

### 📁 번역 파일 구조
- **모듈화**: 각 언어별로 독립적인 TypeScript 파일
- **타입 안전성**: TypeScript로 언어 코드 타입 정의
- **폴백 시스템**: 번역이 없을 경우 영어로 자동 폴백
- **완전한 번역**: 모든 UI 요소가 10개 언어로 완전히 번역됨

### 🔑 지원하는 번역 키들
- **계산기 제목**: `unitConverterTitle`, `financialCalculatorTitle`, `scientificCalculatorTitle`
- **단위 변환**: 모든 단위 타입과 단위명 (미터, 킬로미터, 섭씨, 화씨 등)
- **금융 계산기**: 모든 계산 타입과 라벨 (대출, 투자, 복리 등)
- **공학용 계산기**: 모든 수학 함수와 버튼 (sin, cos, log, √ 등)
- **공통 요소**: 네비게이션, 버튼, 메시지, 푸터 등

### 🌍 지원 언어 목록
| 언어 | 코드 | 상태 |
|------|------|------|
| 🇰🇷 한국어 | ko | ✅ 완료 |
| 🇺🇸 영어 | en | ✅ 완료 |
| 🇯🇵 일본어 | ja | ✅ 완료 |
| 🇨🇳 중국어 | zh | ✅ 완료 (독립적) |
| 🇪🇸 스페인어 | es | ✅ 완료 |
| 🇫🇷 프랑스어 | fr | ✅ 완료 |
| 🇩🇪 독일어 | de | ✅ 완료 |
| 🇷🇺 러시아어 | ru | ✅ 완료 |
| 🇵🇹 포르투갈어 | pt | ✅ 완료 |
| 🇮🇹 이탈리아어 | it | ✅ 완료 |

## 🚨 **중요: 향후 개발 가이드라인**

### ⚠️ **다국어 지원은 필수입니다!**

**모든 새로운 기능, 서비스, 컴포넌트를 개발할 때는 반드시 다음 규칙을 따라야 합니다:**

#### 📋 **1. 번역 키 추가 규칙**
```typescript
// 새로운 기능을 추가할 때는 반드시 모든 언어 파일에 번역 키를 추가해야 합니다
// 예시: 새로운 계산기 기능 추가 시

// ko.ts (한국어)
"newCalculator.title": "새로운 계산기",
"newCalculator.description": "새로운 기능을 제공하는 계산기입니다.",

// en.ts (영어)
"newCalculator.title": "New Calculator",
"newCalculator.description": "Calculator with new features.",

// ja.ts (일본어)
"newCalculator.title": "新しい電卓",
"newCalculator.description": "新しい機能を提供する電卓です。",

// zh.ts (중국어)
"newCalculator.title": "新计算器",
"newCalculator.description": "提供新功能的计算器。",

// ... 모든 10개 언어 파일에 동일하게 추가
```

#### 🔄 **2. 번역 파일 업데이트 순서**
1. **새로운 기능 개발 시**:
   - 먼저 한국어 번역 키를 `src/locales/ko.ts`에 추가
   - 즉시 다른 9개 언어 파일에도 동일한 키 추가
   - 번역이 완료되기 전까지는 기능을 배포하지 않음

2. **기존 기능 수정 시**:
   - 수정된 텍스트가 있다면 모든 언어 파일에서 해당 키 업데이트
   - 새로운 키가 추가되었다면 모든 언어에 추가

#### 🌍 **3. 지원 언어 목록 (필수)**
모든 새로운 기능은 다음 10개 언어를 **모두** 지원해야 합니다:

| 언어 | 코드 | 필수 여부 |
|------|------|-----------|
| 🇰🇷 한국어 | ko | ✅ 필수 |
| 🇺🇸 영어 | en | ✅ 필수 |
| 🇯🇵 일본어 | ja | ✅ 필수 |
| 🇨🇳 중국어 | zh | ✅ 필수 |
| 🇪🇸 스페인어 | es | ✅ 필수 |
| 🇫🇷 프랑스어 | fr | ✅ 필수 |
| 🇩🇪 독일어 | de | ✅ 필수 |
| 🇷🇺 러시아어 | ru | ✅ 필수 |
| 🇵🇹 포르투갈어 | pt | ✅ 필수 |
| 🇮🇹 이탈리아어 | it | ✅ 필수 |

#### 🚫 **4. 금지사항**
- ❌ **하드코딩된 텍스트**: 모든 텍스트는 번역 키를 사용해야 함
- ❌ **부분 번역**: 일부 언어만 번역하고 배포하는 것 금지
- ❌ **영어 폴백 의존**: 영어 번역을 기본으로 하고 다른 언어는 나중에 추가하는 것 금지
- ❌ **번역 키 누락**: 새로운 UI 요소를 추가할 때 번역 키를 추가하지 않는 것 금지

#### ✅ **5. 권장사항**
- ✅ **번역 우선**: 새로운 기능 개발 시 번역 키부터 설계
- ✅ **일관성 유지**: 기존 번역 키 네이밍 컨벤션 따르기
- ✅ **테스트 필수**: 모든 언어에서 기능이 정상 작동하는지 확인
- ✅ **문맥 고려**: 각 언어의 문화적 특성을 고려한 번역

#### 🔧 **6. 개발 워크플로우**
```bash
# 1. 새로운 기능 개발 시작
# 2. 번역 키 설계 및 모든 언어 파일에 추가
# 3. 기능 구현
# 4. 모든 언어에서 테스트
# 5. 번역 검토 및 수정
# 6. 배포
```

#### 📝 **7. 번역 키 네이밍 컨벤션**
```typescript
// 기능별 접두사 사용
"calculator.basic.title": "기본 계산기",
"calculator.scientific.title": "공학용 계산기",
"calculator.unit.title": "단위 변환기",
"calculator.financial.title": "금융 계산기",

// 동작별 접두사
"button.clear": "지우기",
"button.calculate": "계산하기",
"button.reset": "초기화",

// 메시지별 접두사
"message.success": "성공했습니다",
"message.error": "오류가 발생했습니다",
"message.loading": "로딩 중...",
```

**이 가이드라인을 따르지 않으면 글로벌 사용자 경험이 저하되고, 유지보수가 어려워집니다. 모든 개발자는 이 규칙을 엄격히 준수해야 합니다.**

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
| 다국어 지원 | 제한적 | 10개 언어 완전 지원 |
| 번역 시스템 | 하드코딩 | 모듈화된 파일 시스템 |

## 🎯 향후 계획

1. **새로운 서비스 추가**: 각각 독립적인 Vue 컴포넌트로 구현
2. **PWA 지원**: 오프라인 기능 및 앱 설치 지원
3. **성능 최적화**: 코드 스플리팅 및 지연 로딩
4. **테스트 코드**: Jest + Vue Test Utils로 단위 테스트
5. **추가 언어**: 더 많은 언어 지원 확대

## 🐛 최근 해결된 문제들

### ✅ 다국어 번역 문제 해결
- **문제**: `unitConverterTitle`, `financialCalculatorTitle` 등 계산기 관련 번역이 누락
- **해결**: 모든 계산기 관련 키들을 10개 언어로 완전히 번역

### ✅ 중국어 번역 문제 해결
- **문제**: 중국어 사용 시 단위변환기 등이 일본어로 표시
- **해결**: 각 언어별로 완전히 독립적인 번역 파일 시스템 구축

### ✅ 번역 시스템 개선
- **이전**: 단일 파일에 모든 언어 하드코딩
- **현재**: 모듈화된 TypeScript 파일 시스템
- **장점**: 타입 안전성, 유지보수성, 확장성 향상

## 📊 프로젝트 통계

- **총 번역 키**: 150+ 개
- **지원 언어**: 10개
- **총 번역 수**: 1,500+ 개
- **컴포넌트 수**: 15+ 개
- **라우트 수**: 8개
- **타입 정의**: 완전한 TypeScript 지원

---

**Barosa Vue** - Vue.js로 재탄생한 상가 서비스 허브 🚀

*마지막 업데이트: 2024년 12월*
