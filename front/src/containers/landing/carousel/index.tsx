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

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // 2초마다 실행

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [currentIndex]); // currentIndex가 변경될 때마다 useEffect가 다시 실행됩니다.

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

  return (
    // <div className={styles.carouselWrapper}>
    //   <Image
    //     key={images[currentIndex]}
    //     src={images[currentIndex]}
    //     alt="Carousel slide"
    //     width={0}
    //     height={0}
    //     sizes='100vw'
    //     className={styles.carouselStyle}
    //     priority
    //   />
    // </div>
    <div className={styles.carouselWrapper}>
      <Image
        src='/images/landing/bubuicon.jpg'
        alt='Bride and Groom'
        width={500}
        height={500}
        layout='fixed'
        />
        <div className={styles.heart}>&#10084;&#65039;</div>
    </div>
  )
}

export default Carousel;
