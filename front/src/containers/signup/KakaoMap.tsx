'use client';

import React, {useEffect} from "react";

import * as styles from './index.css'

interface keywordProps {
  searchKeyword: string;
}

// const KakaoMap = ({searchKeyword}: keywordProps) => {
//   // TODO: 이 부분은 preview, home에서 띄워주는 게 맞을 듯
//   useEffect(() => {
//     if (window.kakao) {
//       window.kakao.maps.load(() => {
//         // id가 'map'인 요소에 지도를 생성
//         const mapContainer = document.getElementById("map"),
//           mapOption = {
//             // 해당 좌표는 멀티캠퍼스를 중심으로 함(기초 좌표)
//             center: new window.kakao.maps.LatLng(37.501286, 127.039602),
//             // 줌 레벨 기본값
//             level: 3,
//           };
//         const map = new window.kakao.maps.Map(mapContainer, mapOption);
//       });
//     }
//   }, [searchKeyword]);
//   return (
//     // id가 'map'인 div 출력, width와 height를 설정해줘야 정상 출력됨
//     <div id="map" className={styles.mapContainer}/>
//   );
// };