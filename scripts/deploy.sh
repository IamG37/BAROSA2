#!/bin/bash

# Barosa Vue 배포 스크립트
echo "🚀 Barosa Vue 배포 시작..."

# 현재 브랜치 확인
CURRENT_BRANCH=$(git branch --show-current)
echo "현재 브랜치: $CURRENT_BRANCH"

# 원격 저장소 설정
echo "📡 원격 저장소 설정 중..."
git remote add origin https://github.com/IamG37/BAROSA2.git 2>/dev/null || git remote set-url origin https://github.com/IamG37/BAROSA2.git

# 변경사항 커밋
echo "💾 변경사항 커밋 중..."
git add .
git commit -m "🚀 배포 준비: GitHub Pages 및 커스텀 도메인 설정"

# main 브랜치로 푸시
echo "📤 main 브랜치로 푸시 중..."
git push -u origin main

# GitHub Pages 배포
echo "🌐 GitHub Pages 배포 중..."
npm run build
npx gh-pages -d dist --repo https://github.com/IamG37/BAROSA2.git

echo "✅ 배포 완료!"
echo "🌍 접속 URL: https://barosa.shop"
echo "⏰ DNS 설정 후 최대 48시간 소요될 수 있습니다." 