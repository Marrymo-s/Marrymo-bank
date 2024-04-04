# Marrymo
### SSAFY 10기 특화 프로젝트(핀테크) 4반 :v: 했다치고 :v: <br /> (2024.02.26 ~ 2024.04.04)
![marrymo_introduction](/uploads/88d53580aff8a4422811d97290f2fe62/marrymo_introduction.png)

## :notebook_with_decorative_cover: 목차 :notebook_with_decorative_cover:
:one: [프로젝트 소개](#1-프로젝트-소개) <br/>
:two: [개발 환경](#2-개발-환경)<br/>
:three: [기술을 채택한 이유](#3-기술을-채택한-이유) <br/>
:four: [브랜치 전략](#4-브랜치-전략) <br/>
:five: [기능별 페이지](#5-기능별-페이지) <br/>
:six: [핀테크 프로젝트 특징 기술 소개](#6-핀테크-프로젝트-특징-기술-소개) <br/>
:seven: [트러블 슈팅](#7-트러블-슈팅) <br/>
:eight: [설계 문서](#8-설계-문서) <br />
:nine: [팀원 소개 및 역할](#9-팀원-소개-및-역할) <br />

## 1. 프로젝트 소개
### :ring: Overview :ring:
#### "결혼 준비 생각하면 머리 아프신가요? 걱정마세요. 저희 Marrymo가 도와드립니다!"
##### 안녕하세요. 결혼 준비를 간편하고 편리하게 만들어줄 모바일 청첩장 제작 및 축의금 송금 서비스를 제공하는 marrymo입니다.<br /><br /> 예비 부부들은 marrymo를 통하여 모바일 청첩장을 제작해볼 수 있고 정산된 축의금은 marrymo에서 등록한 계좌로 받아볼 수 있습니다. 또한 정산된 축의금 내역 정보를 메일을 통해 엑셀로 받아 보실 수 있습니다.

## 2. 개발 환경
### :books: Tech Stack :books:
#### Backend
- common <br />
![SpringBoot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white)
![SpringSecurity](https://img.shields.io/badge/spring_security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white) 
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![JAVAAZUL](https://img.shields.io/badge/JAVA_AZUL-blue?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAh1BMVEXe5uzAztqxwtHc4OT09PT19fXw8PCqu8rn5+f8/Pzs0Lf6+vrnrXrleiugscLk5OT39/fs7OzkcR7lx6zh4eHhr4LhZRLhpW+Vp7fd3d3gYA6Knq3W1tbbbhzXoW1cepV6jZ6EmKdIZoJWc4vQ0NB8kJ6otb3Ly8twhZV1jqW5vcK9yM9ofY52NCXaAAAAr0lEQVR4AU3KhUIDMQwA0BwrWWftZWQSLrDq/P+/jxPsVaIAzcs/TV/PzOsI+2dmDcztYoTLVf/bed9YDXC9MX3oG863PVpv6c20rXfg2BiDuz0ftmgMOzgKItKe9nsiRDn2DSKyG3m3Vpj6RqfWq+rHp8opiHYQ1XNKub8dp1Ai1MIi554rJYVLhXAR0Zz6DU1BLwGCsmqZMGuAq7K7nSbe6hXqnf/4e4VHfP4TH1/dVRTdLcfq+gAAAABJRU5ErkJggg==)
![SWAGGER](https://img.shields.io/badge/SWAGGER-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)
![LOMBOK](https://img.shields.io/badge/LOMBOK-red?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAtFBMVEVHcEygNR+VOx6KRSKfNiCjOCDBXEmnOCCNMxx+LBpiZTKYNB2QOCI8GRSKMhyfNx5fHBNteRFyig50hBF5MySVNB0/FAamQS1dIhWMOB2PKR+ZMR+0VEKUKBxwgAx0hA92gxaLMx+lQCywTDmPMx+qOSKfSDaNQS62WUd5hxapPSuNTBtvahB2hg+NnSazOyOwOiKxOSCxNh+rNSJ7aRS8TzqVVBp9jRrHbFxlexK2RS90ehMTEzKlAAAAL3RSTlMA3YkY7PX++Wo5A3xQDEX9JTYpVk7+F7hRwi6l15T+7pdy5+FljaFp6IbOsqXbdAzO+/0AAAC5SURBVCiR7ZBXDoJAFACXsixNOtIRe3fpRe9/LxdMbAkXMM7fy7wOwB8CY4ijzkySvT4mz6ZuGkBzXUu2hMmXnAGgBYdwx7LsYhk6m+30XV7EqK4LjFN85bi25RAVPb0eN03T3XJMyLI8xxVXVTbNPLY0TmXclUVKagl9RpZhjGh/WIA5lmVNVKHaKkQIQlSQGSmkhd76tEexVCBJc75nxUtrh4JI9YbOoiYon2cwgiLLyise/9PPcwfMqhMIsZ8FSwAAAABJRU5ErkJggg==)
- marrymo <br />
![SpringDataJpa](https://img.shields.io/badge/Spring_Data_Jpa-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
- bank <br />
![Mybatis](https://img.shields.io/badge/Mybatis_Spring_Boot_Starter-orange?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAwFBMVEVHcEwEBAQSDg4YEA0GBQUekP8FBAQcSnwfGBgekP8UCAMOCwsLBwcnHx89MDAekP8iZKkAAAADAgIekP9EODkekf8bjPk0KSk+MTEekP8ekP8ekP8rIiIhW5YUEBAoYqMhf90givMBAQEOCwspIB8HBgYWEBAgGRgjHBw7Li0bFRUbkf8uJCQ0KCdCNjhKPj0Vi/lVQ0MmieovHhIjcsQtO1IpSHAyV4Vttf9Lpf+o0vxNaodUgLKEp85gWlCnrrXJ7Ah8AAAAInRSTlMA1cFypbPhCx5KkFE/Odd1/u9hHHTIk6ac56Q75tXsedryFhyypAAAAUlJREFUKJGt0clygkAQBmBAQAYUUOOeFWYF2QSX7O//VmlkFGOsVA7pA5ev+u+eRlH+VN3fzFhehxGCj2csDHQF0XzURd7EmxiHjO73CYsxQktkzAH7U9d1Z/0f26B4rNhlIoRI05tz7QwtRRnHj5W/227SNMvOVSf3Wuchj6HyPF/v/KeRzIRQh9AIl9san/f5y2fmew32BqqmM8Yxo5sqjveA2cfbRHaaQRjxFawhGN9WkP38/rr27eZFw4BQhhORFRku8WZXraHuesd1ZGtWpBzj8vCcdl09rFsBC8DVKgG12iOYsGwi0gKmgiZJ4p7M0khI61zBmGydnc4zCAhoxBmNGG+0SbWGagAFGoaURlKnzQXMIGiQSKyDb+U6dnDUsFXnONEZXCrvtH/E0slJKei51YMPLMdqPeWiLMdWVdNUNbt/Sf9eX9pxNOWr5VNzAAAAAElFTkSuQmCC)
#### Frontend
![Next13](https://img.shields.io/badge/Next13-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=data:image/jpeg;base64,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)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![vanillaextract](https://img.shields.io/badge/vanilla_extract-orange?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABF1BMVEX////57fH04ef8+PnYapDjrL3kssLyhar0fqbfl67rydPfdpnyd6D4kLP4g7DvcJvcfJz0bpr6h633lLb3kK77um75earreqHfn7T8fKW+qMvnnL3oqb3crbniucb4mbj3ob7xpr/mUYXchqP7fJn/apn/YJbt1t3zrrvmubH7k4Xuc67Oasj/rcryus3tTITZmXnA19phiJjxX5DkcYfKWH9bp619sLZFS0diQC7BaHnDVXGK3etKmKRYYV9lMQNxQRSVSzW3U1bLWWvWWnWARi5hNxNXTEVLeoHS7fJO3fJM2O1glZtsfXh3Yk+CQg+BQQd2Vz1ghYZIxNZL1OhJ0ON7y9lI1+1LzeBJyNpbwdHi8POUz9qVjxuOAAABE0lEQVR4AbzQQwIDQRBA0XhsxrY1tu9/odha5m9fs1L/KJ35gdlc/jsWABD6QjCCYjgBfzySpGiG5XhB/IBIsVTGMJyuVCtv+2oAw9Qbh5pAK/uCbZqmwWKnWCx2e0T/2TLMYMhg9Agsjicg+nJubTptNGZ1BsMAAOzOn7fCh0PpQyBYpHqL1tOglqviKYqadLvrzVZ6fJKsqNpB1ud0VZEf0DAt23E9PwgC3wujODEecF+bHBwhDMNAAFRLKcMSwYBPti5O/3WgGT5x/ux3i6o99met9fXeP021yAVcf0yTQ666JaiZwlJfsowwR77BNUaRBWmEwx1Uhqw6RwM9iDZ4yH0bncH8dky5m9vZ07lN+bMv8cY4pdW3UHwAAAAASUVORK5CYII=)

#### Infra(CI/CD)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/docker_compose-blue?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)
#### DB
- RDBMS <br />
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
- NO SQL <br />
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
#### Management Tool
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![GitLab](https://img.shields.io/badge/gitlab-orange.svg?style=for-the-badge&logo=gitlab&logoColor=white)
![Mattermost](https://img.shields.io/badge/Mattermost-blue?style=for-the-badge&logo=Mattermost)
#### UI/UX
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Canva](https://img.shields.io/badge/canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white)
#### IDE
![IntellijIDEA](https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white)
![WebStorm](https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=webstorm&logoColor=white)
![MySQLWorkbench](https://img.shields.io/badge/MYSQL_WORKBENCH-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 3. 기술을 채택한 이유
#### Backend
- <b>Spring boot</b> <br />
  1. 스프링 부트는 내장된 서버를 제공하여 별도의 서버 설정 없이 애플리케이션 실행 가능
  2. 3rd party 라이브러리를 사용하여 starter라는 묶음 의존성 라이브러리 패키지를 이용
  따라서 maven/gradle에서 버전 관리를 하여 별도의 버전 관리가 필요 없고 간편하게 의존성 지정 가능
  3. 애플리케이션의 상태 모니터링, 로깅, 보안 설정 등 운영에 필요한 기능들을 제공
  이를 통해 애플리케이션 운영과 관리가 편리해지고 안정성이 향상

- <b>Spring Data JPA(JPA)</b> <br />
  1. SQL 중심적인 개발에서 객체 중심적인 개발이 가능
  2. 상속 / 연관 관계 / 객체-RDB 패러다임 불일치를 해결

#### Frontend
- <b>next13 fetch</b> <br />
  ssr을 포함한 ssg를 사용할 수 있는 함수들이 next13 기준으로 fetch 함수 안에 내장 되었기 때문에, fetch 함수를 씀으로써 ssg를 사용하여 렌더링 시간을 줄이고, SEO도 향상되는 효과를 가짐
- <b>zustand</b> <br />
  다른 상태관리 라이브러리에 비해 모듈 크기가 작고, 속도고 빨라 프론트엔드에서 가장 중요한 사용자 화면 렌더링 시간을 줄임
- <b>Typescript</b> <br />
  타입을 지정함으로써 타입 추론에 의한 정확한 데이터 전달이 가능하며 객체 접근에 대한 정확성을 가짐

## 4. 브랜치 전략
:pushpin: <b>Deploy 브랜치에서 E2E 테스트 수행</b> <br />
:pushpin: <b>Deploy의 하위 브랜치 dep/FE와 dep/BE에서 CI/CD 수행</b>
#### marrymo 
![marrymo_branch](/uploads/44d2dd13664c945a0c3634bd8e05f4ab/marrymo_branch.png)
#### bank
![bank_branch](/uploads/d083523e60a167a6eb66f6e802885b3d/bank_branch.png)

## 5. 기능별 페이지
## 부부
#### 카카오 로그인 완료
<b>예비 부부가 카카오 로그인을 통해 로그인에 성공 했을 경우 모바일 청첩장 정보를 등록 했을 때는 모바일 청첩장을 보여주고</b><br />
<b>모바일 청첩장 정보를 등록 하지 않았을 때는 모바일 청첩장 정보를 등록할 수 있도록 해당 페이지로 이동 시킴</b><br />
<b>청첩장 정보 등록 시 축의금 정산 내역을 메일로 수신 받기 위해 메일 인증을 해야 함</b>
|청첩장 정보를 등록하지 않았을 경우|
|:---:|
|![청첩장_등록](/uploads/a1627ec1d8f7c57d225b3c1ed4f51165/청첩장_등록.mp4)|

|청첩장 정보를 등록 했을 경우|
|:---:|
|![로그인_시_청첩장_등록_되었음](/uploads/6fd1643822137f90edf0e0d66d064e90/로그인_시_청첩장_등록_되었음.gif)|

#### 위시리스트 검색 및 등록
<b>예비 부부는 네이버 검색 API를 통해서 위시 리스트를 검색 할 수 있고 펀딩 받고 싶은 위시 리스트 등록 가능</b>
|위시리스트 검색 및 등록 화면|
|:---:|
|![위시리스트_검색_및_등록](/uploads/cff45d2774194874a53cb3a5fba11eab/위시리스트_검색_및_등록.gif)|

#### 위시리스트 상세 조회
<b>예비 부부는 등록한 위시리스트 상세 정보를 조회 가능(위시 아이템 제품명, 현재까지 모인 펀딩 금액, 모금 마감일, 펀딩 인원수)</b>
|위시리스트 상세 조회 화면|
|:---:|
|![위시리스트_상세_조회](/uploads/bda5dbdaf92f343117e9d624381a0294/위시리스트_상세_조회.gif)|

#### 축의금 내역 조회
<b>예비 부부는 하객들로부터 받은 축의금 내역을 조회 가능</b>
|축의금 내역 조회 화면|
|:---:|
|![축의금_내역_조회](/uploads/855e86c5f3f23834ca40d2cda24b2d42/축의금_내역_조회.gif)|

#### 축의금 정산 내역 메일로 수신
<b>예비 부부는 모바일 청첩장을 최종 발급한 바로 다음 날 새벽 3시에 인증한 메일로 축의금 정산 내역을 엑셀 파일로 수신 받음</b>
|축의금 정산 내역 메일로 수신|
|:---:|
|![축의금_정산_내역_엑셀](/uploads/903bcbaf0cd4ccf30a6db6a1d79b29b3/축의금_정산_내역_엑셀.gif)|

## 하객
#### 모바일 청첩장 조회
<b>하객은 예비 부부가 보낸 링크를 통해 로그인 없이 모바일 청첩장을 조회할 수 있음</b>
|모바일 청첩장 조회 화면|
|:---:|
|![녹화_2024_04_04_01_42_34_538](/uploads/d2687560510ce7aba26e2b4906a1c985/녹화_2024_04_04_01_42_34_538.gif)|

#### 위시 리스트 펀딩
<b>하객은 예비 부부가 등록 해놓은 위시 리스트 펀딩 가능</b>
|위시리스트 펀딩 화면|
|:---:|
|![위시리스트_펀딩](/uploads/e2c31ba097283d95ce72e757d2489e25/위시리스트_펀딩.gif)|

#### 축의금 송금
<b>하객은 신랑, 신부 중 누구에게 축의금을 송금할지 고른 후 카카오 페이를 통하여 송금 가능</b>
|축의금 송금 화면|
|:---:|
|![축의금_송금](/uploads/dcae004e0382a6296fcb30d711608a86/축의금_송금.gif)|

## 6. 핀테크 프로젝트 특징 기술 소개
#### 계좌 등록
오픈 뱅킹 API : 사용자 인증 API -> 토큰 발급 API -> 등록 계좌 조회 API <br />
![오픈뱅킹API_로직](/uploads/cecc40588e8f1118878546ceea68e5a8/오픈뱅킹API_로직.png)

#### 송금
카카오 페이 단건 결제 API <br />
![카카오_단건_결제_API_로직](/uploads/98f56a555f373d22a428ae5384fffa6d/카카오_단건_결제_API_로직.png)

## 7. 트러블 슈팅
#### Backend
#### Open Banking API(토큰 발급 API) Web Client를 통해 호출
![토큰_발급_api-1](/uploads/23e25120d2163799ba0714604894960a/토큰_발급_api-1.PNG)
![토큰_발급_api-2](/uploads/4f45832204aa9105f5f188f5ef8c855c/토큰_발급_api-2.PNG)
- <b>문제 원인</b> <br />
request body에 Map이 아닌 객체의 형태로 보내려고 해서 발생한 문제

- <b>해결 방법</b> <br />
토큰 발급 API 요청 Content-Type이 application/x-www-form-urlencoded; 이기 때문에 텍스트 데이터를 key-value 쌍으로 인코딩 함.<br /> 특수한 상황의 경우 키가 중복될 수 있고 그에 따라 여러 값이 하나의 키에 매핑될 수 있음<br />
따라서 하나의 키에 여러 개의 값을 가질 수 있는 MultiValueMap Collection을 채택하여 보내야 했음
```
public MultiValueMap<String, String> toMultiValueMap() {
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("code", this.code);
        parameters.add("client_id", this.client_id);
        parameters.add("client_secret", this.client_secret);
        parameters.add("redirect_uri", this.redirect_uri);
        parameters.add("grant_type", this.grant_type);

        return parameters;
    }
```
```
return openBankingWebClient
                .post()
                .uri("/oauth/2.0/token")
                .headers(httpHeaders -> httpHeaders.putAll(headers))
                .body(BodyInserters.fromFormData(openBankingTokenApiRequest.toMultiValueMap()))
                .retrieve()
                .bodyToMono(OpenBankingTokenApiResponse.class)
                .block();
```

#### Frontend 
#### next.js CSR에서 CORS 에러 처리
- <b>문제 원인</b> <br />
  next의 app router는 기본적으로 서버 컴포넌트로 구성되어 있어 SSR 페이지에서만 api 호출하거나 SSG로 도메인이 같기 때문에 CORS 에러 날 일이 없음<br /> 하지만 use client를 쓴 CSR 페이지에서는 localhost로 요청이 가기 때문에 CORS 에러가 날 수 있음
- <b>해결 방법</b> <br />
  proxy 우회 방법을 쓴 것처럼 next.config.js에서 rewrites()를 이용해 요청 url을 우회할 수 있음
  - source : 클라이언트에서의 요청 경로
  - destination : 해당 요청이 재작성될 목적지 URL 지정
  ```
    async rewrites() {
    return [
      {
        source: '/users',
        destination: 'https://spring.marrymo.site/users',
      },

  ```
#### 카카오 맵이 next.js 화면에 띄워지지 않는 에러 처리(window is not defined)
- <b>문제 원인</b><br />
  app router 내에 있는 컴포넌트는 기본 서버 컴포넌트로, SSR을 디폴트로 하기 때문에 서버에서 렌더링 하는 시점에서는 브라우저 안의 모든 요소들이 소속된 객체인 window 전역 객체에 대한 접근이 불가함
- <b>해결 방법</b><br />
  dynamic 사용 -> import() 안에 원하는 컴포넌트를 넣고 ssr:false를 처리하면 클라이언트에서 렌더링 되기 때문에 window 객체에도 접근 가능

## 8. 설계 문서
#### API
<details>
<summary>User</summary>
![UserController](/uploads/90e8210044965d839cca0ca12c0bc0dc/UserController.png)
</details>

<details>
<summary>WishItem</summary>
![WishItemController](/uploads/95ed61334881a080059fafb3c8e7327d/WishItemController.png)
</details>

<details>
<summary>Smtp</summary>
![SmtpController](/uploads/cb70c3c1c657b350a822c2b519758635/SmtpController.png)
</details>

<details>
<summary>OpenBanking</summary>
![OpenBankingController](/uploads/ae3fe01004d261c82b9dda381474951e/OpenBankingController.png)
</details>

<details>
<summary>MoneyGift</summary>
![MoneyGiftController](/uploads/0744b5cc16dacb51d92dd8e18e767443/MoneyGiftController.png)
</details>

#### ERD
![Marrymo](/uploads/64b654919b1bc3cf0bb926df849c08b1/Marrymo.png)

#### Architecture Structure
![Architecture_Structure](/uploads/25a56d83c3ce3ddf61aa2ed7e6d36d6d/Architecture_Structure.png)

## 9. 팀원 소개 및 역할
#### :cherry_blossom: 김재윤 (Team Leader)
- Infra, Backend
- 스프링 시큐리티(은행 서버), 인프라, CI/CD, 카카오페이 API 연동
#### :tulip: 김하연
- Infra, Backend
- 은행 송금 API, Marrymo와 송금 및 계좌 등록 은행 API 통신, CI/CD 파이프라인 구축

#### :four_leaf_clover: 류승광
- Frontend
- 유저 정보 관리 로직 구성
#### :rose: 박도연
- Backend
- 카카오 소셜 로그인, 스프링 시큐리티, JWT, SMTP, 오픈 뱅킹 API 연동

#### :sunflower: 정일규
- Frontend
- 청첩장, 위시아이템 데이터 관리

#### :hibiscus: 정지원
- Full stack
- Backend : Redis, REST API 구현, SMTP
- Frontend : 송금, 오픈뱅킹 계좌 연결, 축의금 내역 구성
