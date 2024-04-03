'use client';

import React, {useState, useEffect, useRef, SetStateAction, Dispatch} from 'react';
import {getKakaoMap} from '@/services/kakaoMap';
import InputBox from '@/components/InputBox';
import {Place} from '@/types/kakaoMap';
import * as styles from './index.css';

interface Props {
  setWeddingLocation: Dispatch<SetStateAction<string>>;
  closeModal: () => void;
  onValidationPassed: () => void;
}

const KakaoMap = ({setWeddingLocation, closeModal, onValidationPassed}: Props) => {
  const [inputText, setInputText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState('');
  const mapContainer = useRef(null);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const mapRef = useRef<any>(null);
  // TODO: eslint/no-explicit-any 사용하지 않고 타입 지정하는 방법 찾기
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
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
  }, []);

  const initializeMap = () => {
    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(37.50129337391822, 127.03962604736338);
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
      const marker = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: position,
      });
      bounds.extend(position);
      // TODO: 마커 관련 로직 추가
    });

    mapRef.current.setBounds(bounds);
  };


  const handleSearch = async () => {
    const results = await getKakaoMap(inputText);
    if (results && results.documents.length > 0) {
      setSearchResults(results.documents);
      displayMarkers(results.documents);
      setValidationMessage('');
    } else {
      setSearchResults([]);
      setValidationMessage('검색 결과가 존재하지 않습니다.');
    }
  };

  const searchButtonProps = {
    text: '검색',
    onClick: handleSearch,
    type: 'button' as const,
    size: 'small' as const,
  };

  const selectLocation = (location: string) => {
    setSelectedPlace(location);
    setWeddingLocation(location);
    closeModal();
    onValidationPassed();
  };

  useEffect(() => {
    if (selectedPlace) {
      // selectedPlace 가 설정되면 검색 결과 목록을 비우는 useEffect
      setSearchResults([]);
    }
  }, [selectedPlace]);

  // 엔터 키를 누를 때 호출될 함수
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <InputBox
        placeholder="결혼식 장소를 입력하세요"
        value={inputText}
        onValueChange={setInputText}
        onKeyDown={handleKeyDown}
        button={searchButtonProps}
        validate={(value) => {
          if (!value.trim()) {
            return '검색어를 입력해주세요.';
          }
          return validationMessage;
        }}
      />
      <div
        id="map"
        style={{width: '100%', height: '200px'}}
        ref={mapContainer}
      ></div>
      {searchResults.length > 0 && (
        <ul className={styles.searchResultsList}>
          {searchResults.map((place, index) => (
            <li
              className={styles.searchResultsItem}
              role="presentation"
              key={index}
              onClick={() => selectLocation(place.road_address_name || place.address_name)}
            >
              {place.place_name} ({place.road_address_name || place.address_name})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KakaoMap;