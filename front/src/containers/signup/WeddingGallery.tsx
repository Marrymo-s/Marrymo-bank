'use client';

import React, {useState} from 'react';
import * as styles from './index.css';

const WeddingGalleryUploader = () => {
  const [images, setImages] = useState<[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const newImages = [...images, {imgUrl: e.target.result}];
        if (newImages.length <= 12) {
          setImages(newImages);
        } else {
          alert('You can upload up to 12 images.');
        }
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeader}>
        웨딩 갤러리
        <button onClick={() => document.getElementById('imageUpload').click()} className={styles.uploadButton}>
          웨딩 화보 추가하기
        </button>
        <input type="file" id="imageUpload" style={{display: 'none'}} onChange={handleImageUpload}/>
      </div>
      <div className={styles.imagesContainer}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img src={image.imgUrl} alt={`Wedding image ${index + 1}`} className={styles.image}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingGalleryUploader;