'use client';

import React, {useState, useEffect, useRef, SetStateAction, Dispatch} from 'react';
import {getKakaoMap} from '@/services/kakaoMap';
import Button from '@/components/Button';
import {Place, Meta, KakaoMapResponse} from '@/types/kakaoMap';

interface Props {
  setWeddingLocation: Dispatch<SetStateAction<string>>;
  closeModal: () => void;
}

const KakaoMap = ({setWeddingLocation, closeModal}: Props) => {
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const mapContainer = useRef(null);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const mapRef = useRef<any>(null);
  // TODO: eslint/no-explicit-any 사용하지 않고 타입 지정하는 방법 찾기
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      // Here, initialize the map and store it in the ref
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.566826, 126.9786567);
        const mapOptions = {
          center,
          level: 4,
        };
        mapRef.current = new window.kakao.maps.Map(mapContainer.current, mapOptions);
      });
    };
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // 스크립트가 이미 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.onload = initializeMap; // 맵 초기화를 별도 함수로 추출
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    // 언마운트 시 스크립트 로드 취소 등의 정리 작업 수행
    return () => {
      // 필요한 정리 로직 추가
    };
  }, []);

  const initializeMap = () => {
    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(37.566826, 126.9786567);
      const mapOptions = {
        center,
        level: 3,
      };
      mapRef.current = new window.kakao.maps.Map(mapContainer.current, mapOptions);
    });
  };


  const displayMarkers = (places: Place[]) => {
    const bounds = new window.kakao.maps.LatLngBounds();

    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(Number(place.y), Number(place.x));
      bounds.extend(position);
      // create marker
    });

    // Adjust map bounds
    mapRef.current.setBounds(bounds);
  };

  const handleSearch = async () => {
    const results = await getKakaoMap(inputText);
    if (results) {
      setSearchResults(results.documents);
      // 검색 결과를 바탕으로 마커를 표시하는 등의 추가 로직
    } else {
      alert('검색 결과가 존재하지 않습니다.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="결혼식 장소를 입력하세요"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        type="button"
        size="small"
      >
        검색
      </Button>
      <div
        id="map"
        style={{width: '100%', height: '300px'}}
        ref={mapContainer}
      ></div>
      {searchResults.map((place, index) => (
        <div
          role="presentation"
          key={index}
          onClick={() => {
            setWeddingLocation(place.road_address_name || place.address_name);
          }}
        >
          {place.place_name} ({place.road_address_name || place.address_name})
        </div>
      ))}
      <Button
        onClick={closeModal}
        type="button"
        size="small"
      >
        확인
      </Button>
    </div>
  );
};

export default KakaoMap;