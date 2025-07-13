# Barosa Vue 배포 가이드

## 🚀 GitHub Pages 배포

### 자동 배포 (권장)
GitHub Actions를 통해 main 브랜치에 push할 때마다 자동으로 배포됩니다.

### 수동 배포
```bash
# 원격 저장소 설정 (최초 1회)
npm run deploy:setup

# 수동 배포
npm run deploy:manual
```

## 🌐 커스텀 도메인 설정

### 1. DNS 설정
도메인 제공업체에서 다음 DNS 레코드를 추가하세요:

```
Type: CNAME
Name: @
Value: iamg37.github.io
TTL: 3600
```

**참고**: 일부 도메인 제공업체에서는 루트 도메인(@)에 CNAME을 설정할 수 없을 수 있습니다. 
이 경우 A 레코드를 사용하세요:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600
```

또는

```
Type: A
Name: @
Value: 185.199.109.153
TTL: 3600
```

### 2. GitHub 저장소 설정
1. GitHub 저장소로 이동
2. Settings > Pages
3. Source를 "GitHub Actions"로 설정
4. Custom domain에 `barosa.shop` 입력
5. "Enforce HTTPS" 체크

### 3. SSL 인증서
GitHub에서 자동으로 SSL 인증서를 발급합니다 (최대 24시간 소요).

## 📁 프로젝트 구조

```
barosa-vue/
├── .github/workflows/deploy.yml  # GitHub Actions 워크플로우
├── public/CNAME                  # 커스텀 도메인 설정
├── dist/                         # 빌드 결과물 (자동 생성)
└── vite.config.ts               # Vite 설정 (base: '/')
```

## 🔧 배포 스크립트

- `npm run build`: 프로젝트 빌드
- `npm run deploy`: 로컬에서 수동 배포
- `npm run deploy:manual`: BAROSA2 저장소로 수동 배포
- `npm run deploy:setup`: 원격 저장소 설정

## 🌍 접속 URL

- **개발 환경**: `http://localhost:5173`
- **프로덕션**: `https://barosa.shop`

## ⚠️ 주의사항

1. **브랜치명**: main 브랜치에만 배포됩니다
2. **도메인 설정**: DNS 변경 후 최대 48시간 소요될 수 있습니다
3. **HTTPS**: 커스텀 도메인 설정 후 SSL 인증서 발급까지 최대 24시간 소요됩니다

## 🐛 문제 해결

### 배포가 안 될 때
1. GitHub Actions 탭에서 워크플로우 상태 확인
2. 빌드 로그 확인
3. `npm run build` 로컬에서 테스트

### 도메인이 안 될 때
1. DNS 설정 확인
2. GitHub Pages 설정에서 커스텀 도메인 확인
3. 브라우저 캐시 삭제 후 재시도 