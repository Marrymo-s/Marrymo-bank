import { useState, useEffect } from 'react';
import * as styles from './index.css'; // Vanilla Extract 스타일
import Image from 'next/image';


const images = [
  '/images/landing/example1.png',
  '/images/landing/example2.png',
  '/images/landing/example3.png',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 1000); // 3초마다 실행
  //
  //   return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  // }, [currentIndex]); // currentIndex가 변경될 때마다 useEffect가 다시 실행됩니다.

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  // 여기서 Image에 바닐라 익스트랙트로 width를 반응형으로 만들기
  return (
    <div className={styles.carouselWrapper}>
      <Image
        src={images[currentIndex]}
        alt="Carousel slide"
        // width={500}
        // height={300}
        // // layout="responsive"
        layout="fill"
        objectFit="cover" // 이미지가 컨테이너를 완전히 채우도록 하면서 이미지의 비율을 유지
      />
    </div>
  )
}

export default Carousel;
