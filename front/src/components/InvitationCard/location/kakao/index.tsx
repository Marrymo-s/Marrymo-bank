'use client';

import React, {useEffect} from 'react';

interface keywordProps {
  searchKeyword: string;
}

interface Place {
  y: string;
  x: string;
}

export const KakaoMap = ({searchKeyword}: keywordProps) => {
  useEffect(() => {
    const initMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map'),
            mapOption = {
              center: new window.kakao.maps.LatLng(37.501286, 127.039602),
              level: 3,
            };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          const ps = new window.kakao.maps.services.Places();
          /* eslint-disable @typescript-eslint/no-explicit-any */
          ps.keywordSearch(searchKeyword, (data: Place[], status: any) => {
            if (status === window.kakao.maps.services.Status.OK && data[0]) {
              const firstPlace = data[0];
              map.setCenter(new window.kakao.maps.LatLng(parseFloat(firstPlace.y), parseFloat(firstPlace.x)));
            }
          });
        });
      }
    };
    initMap();
  }, [searchKeyword]);

  return <div id="map" style={{width: '300px', height: '300px'}} />;
};