FROM node:20.11.1-alpine

# 앱 디렉터리 생성
RUN mkdir -p /usr/app
WORKDIR /usr/app

# 의존성 설치를 위해 package.json 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN npm i -g npm@latest
RUN npm install -g pnpm
RUN pnpm install

# 앱 소스 추가
COPY . ./

RUN chmod +x node_modules/.bin/*

RUN pnpm run build

# # 컨테이너 이미지 크기 줄이기
# RUN npm install --frozon-lockfile --production
# RUN rm -rf ./.next/cache

CMD ["pnpm","start"]