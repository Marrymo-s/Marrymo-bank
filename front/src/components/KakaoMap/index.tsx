'use client';

import React, {useState, useEffect, useRef, SetStateAction} from 'react';
import axios from 'axios';
import dynamic from "next/dynamic";

// TODO: 타입 디클레어 파일로 옮기기
type Place = {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  x: string; // longitude
  y: string; // latitude
};

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

type KakaoMapResponse = {
  meta: Meta;
  documents: Place[];
};

interface Props {
  setWeddingLocation: dispatch<SetStateAction<string>>;
}

const KakaoMap = ({setWeddingLocation}: Props) => {
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const mapContainer = useRef(null);

  // Kakao map instance ref
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      // Here, initialize the map and store it in the ref
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.566826, 126.9786567);
        const mapOptions = {
          center,
          level: 3,
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

  const searchPlaces = async () => {
    if (!inputText.trim()) {
      alert('키워드를 입력해주세요!');
      return;
    }

    try {
      const response = await axios.get<KakaoMapResponse>('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAOAPI_KEY}`,
        },
        params: {
          query: inputText,
        },
      });

      if (response.data.documents.length > 0) {
        setSearchResults(response.data.documents);
        displayMarkers(response.data.documents);
      } else {
        alert('검색 결과가 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('Error during Kakao Map search:', error);
      alert('검색 결과 중 오류가 발생했습니다.');
    }
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
  return (
    <div>
      <input
        type="text"
        placeholder="결혼식 장소를 입력해주세요"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            searchPlaces();
          }
        }}
      />
      <button onClick={searchPlaces}>검색</button>
      <div
        id="map"
        style={{width: '100%', height: '500px'}}
        ref={mapContainer}
      ></div>
      {searchResults.map((place, index) => (
        <div
          key={index}
          onClick={() => {
            setWeddingLocation(place.road_address_name || place.address_name);
          }}
        >
          {place.place_name} ({place.road_address_name || place.address_name})
        </div>
      ))}
    </div>
  );
};

export default KakaoMap;