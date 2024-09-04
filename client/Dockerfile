# 빌드 단계
FROM node:20 as build
WORKDIR /client

ENV NODE_OPTIONS=--max_old_space_size=4096

# package.json과 package-lock.json (있다면) 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 프로젝트 파일 전체 복사
COPY . .

# 빌드 실행
RUN npm run build

# 프로덕션 단계
FROM nginx:alpine
COPY --from=build /client/build /nginx/build
COPY NodeBoard.conf /nginx/conf.d/NodeBoard.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]