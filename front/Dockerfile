FROM node:20.11.1-alpine

# 앱 디렉터리 생성
RUN mkdir -p /usr/app
WORKDIR /usr/app

# 의존성 설치를 위해 package.json 복사
COPY package.json ./

# 앱 소스 추가
COPY . .

# 의존성 설치
RUN npm ci


RUN chmod +x node_modules/.bin/*

RUN npm run build

# 컨테이너 이미지 크기 줄이기
RUN npm install --frozon-lockfile --production
RUN rm -rf ./.next/cache

CMD ["npm","start"]