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

const KakaoMap = () => {
  useEffect(() => {
    const kakaoScriptLoaded = window.kakao && window.kakao.maps;
    if (kakaoScriptLoaded) {
      console.log(window.kakao.maps)
      if (window.kakao.maps.services) {
        try {
          // 'Places' 클래스의 인스턴스를 생성합니다.
          const places = new window.kakao.maps.services.Places();
          // 검색 완료 시 호출될 콜백 함수
          const callback = (result: [], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              console.log(result);
            }
          };

          // 'Places' 객체의 'keywordSearch' 메소드를 사용하여 검색을 실행합니다.
          places.keywordSearch('판교 치킨', callback);
        } catch (error) {
          console.error('Kakao Maps initialization failed:', error);
        }
      }
    } else {
      // TODO: 로딩이 되지 않았을 때 로딩 애니메이션 넣을 거면 넣기
      console.log('카카오 맵이 아직 로딩되지 않았습니다.')
    }
  }, []);

  return <div id="kakao-map">카카오맵 렌딩</div>
}

export default KakaoMap;