#!/bin/bash

# Barosa Vue 백업 배포 스크립트
echo "🚀 Barosa Vue 백업 배포 시작..."

# 현재 브랜치 확인
CURRENT_BRANCH=$(git branch --show-current)
echo "현재 브랜치: $CURRENT_BRANCH"

# 백업 원격 저장소 설정
echo "📡 백업 원격 저장소 설정 중..."
git remote add backup https://github.com/IamG37/BAROSAv2.git 2>/dev/null || git remote set-url backup https://github.com/IamG37/BAROSAv2.git

# 변경사항 커밋
echo "💾 변경사항 커밋 중..."
git add .
git commit -m "🔄 백업 업데이트: 최신 변경사항 반영"

# main 브랜치로 푸시
echo "📤 백업 저장소로 푸시 중..."
git push backup main

# GitHub Pages 배포 (백업용)
echo "🌐 백업 GitHub Pages 배포 중..."
npm run build
npx gh-pages -d dist --repo https://github.com/IamG37/BAROSAv2.git

echo "✅ 백업 배포 완료!"
echo "🌍 백업 URL: https://iamg37.github.io/BAROSAv2"
echo "🔗 백업 저장소: https://github.com/IamG37/BAROSAv2" 