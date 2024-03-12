/** @type {import('next').NextConfig} */
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
// Next.js프로젝트에서 Vanilla Extract를 사용하기 위한 플러그인을 생성

const withVanillaExtract = createVanillaExtractPlugin();
//  Vanilla Extract 플러그인 인스턴스를 생성,
//  Next.js의 설정을 확장하여 Vanilla Extract가 제대로 작동하도록 설정

const nextConfig = {}

module.exports = withVanillaExtract(nextConfig);

// 이 코드는 Vanilla Extract를 Next.js 프로젝트에 통합
// 컴포넌트 단위로 스타일을 안전하게 관리할 수 있도록 하는 설정
