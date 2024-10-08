# 1단계: React 애플리케이션 빌드
FROM node:20.15.0 AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install --force

# 애플리케이션 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 2단계: Nginx로 React 애플리케이션 제공
FROM nginx:alpine

# 빌드된 파일을 Nginx의 HTML 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 설정 파일을 복사
COPY default.conf /etc/nginx/conf.d/default.conf

# 80번 포트 오픈
EXPOSE 80

# Nginx 서버 시작 
CMD ["nginx", "-g", "daemon off;"]
