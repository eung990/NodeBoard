# 베이스 이미지로 Node.js 사용
FROM node:20

# 백엔드 종속성 설치
ENV NODE_OPTIONS=--max_old_space_size=800

# 작업 디렉토리 설정
WORKDIR /backend

# 종속성 파일만 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 모든 파일 복사
COPY . .


RUN npm install pm2 -g

# 포트 노출
EXPOSE 3040

# 시작 명령어, 도커에서는 pm2-runtime 모듈을 사용해야함
CMD ["pm2-runtime", "start", "ecosystem.config.js"]