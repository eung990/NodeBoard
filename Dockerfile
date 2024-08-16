# 베이스 이미지로 Node.js 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 모든 파일 복사
COPY . .

# 백엔드 종속성 설치
WORKDIR /app/server
RUN npm install

# 프론트엔드 종속성 설치 및 빌드
WORKDIR /app/client
RUN npm install
RUN npm run build

# 루트 디렉토리로 이동
WORKDIR /app

# 포트 노출
EXPOSE 80 3040

# 시작 명령어
CMD ["npm", "run", "dev"]