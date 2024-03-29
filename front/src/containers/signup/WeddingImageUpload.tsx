'use client';

import React, {useState} from 'react';

import * as styles from './index.css';

import ImageInput from '@/containers/signup/ImageInput';

const WeddingImageUpload = () => {
  const [images, setImages] = useState<File[]>([]);

  return (
    <>
      <ImageInput files={images} setFiles={setImages}/>
    </>
  );
};

export default WeddingImageUpload;