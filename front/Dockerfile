FROM node:20.11.1

# 앱 디렉터리 생성
RUN mkdir -p /usr/app
WORKDIR /usr/app

# 의존성 설치를 위해 package.json 복사
COPY package.json ./

# 앱 소스 추가
COPY . .

# 의존성 설치
RUN npm install

RUN chmod +x node_modules/.bin/*

RUN npm run build

CMD ["npm","start"]