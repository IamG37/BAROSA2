# Barosa Vue 백업 시스템

## 🔄 백업 저장소 정보

### 📁 저장소
- **메인 저장소**: https://github.com/IamG37/BAROSA2
- **백업 저장소**: https://github.com/IamG37/BAROSAv2
- **메인 URL**: https://barosa.shop
- **백업 URL**: https://iamg37.github.io/BAROSAv2

## 🚀 백업 방법

### 자동 백업 (권장)
```bash
# 전체 백업 (코드 + 배포)
npm run deploy:backup

# 코드만 백업
npm run backup:push
```

### 수동 백업
```bash
# 백업 저장소로 푸시
git push backup main

# 백업용 GitHub Pages 배포
npm run build && npx gh-pages -d dist --repo https://github.com/IamG37/BAROSAv2.git
```

## 🔧 백업 설정

### 원격 저장소 확인
```bash
git remote -v
```

출력 예시:
```
backup  https://github.com/IamG37/BAROSAv2.git (fetch)
backup  https://github.com/IamG37/BAROSAv2.git (push)
origin  https://github.com/IamG37/BAROSA2.git (fetch)
origin  https://github.com/IamG37/BAROSA2.git (push)
```

### 백업 저장소 추가
```bash
git remote add backup https://github.com/IamG37/BAROSAv2.git
```

## 📋 백업 스크립트

### deploy-backup.sh
- 백업 저장소로 코드 푸시
- GitHub Pages 배포
- 자동 커밋 및 푸시

### 사용법
```bash
./scripts/deploy-backup.sh
```

## 🔄 동기화

### 메인 → 백업
```bash
npm run deploy:backup
```

### 백업 → 메인 (복구 시)
```bash
git fetch backup
git checkout backup/main
git push origin main
```

## ⚠️ 주의사항

1. **백업은 메인 저장소와 동일한 내용을 유지합니다**
2. **백업 저장소는 별도의 커스텀 도메인을 사용하지 않습니다**
3. **백업 배포는 메인 배포와 독립적으로 실행됩니다**
4. **백업 저장소는 복구 목적으로만 사용하세요**

## 🆘 복구 방법

### 메인 저장소 문제 시
```bash
# 백업에서 복구
git fetch backup
git checkout backup/main
git push origin main --force

# 배포 복구
npm run deploy:full
```

### 백업 저장소 문제 시
```bash
# 메인에서 백업 복구
git push backup main --force

# 백업 배포 복구
npm run deploy:backup
```

## 📊 백업 상태 확인

### 저장소 상태
- **메인**: https://github.com/IamG37/BAROSA2
- **백업**: https://github.com/IamG37/BAROSAv2

### 배포 상태
- **메인**: https://barosa.shop
- **백업**: https://iamg37.github.io/BAROSAv2

### GitHub Actions
- **메인**: BAROSA2 저장소의 Actions 탭
- **백업**: BAROSAv2 저장소의 Actions 탭 