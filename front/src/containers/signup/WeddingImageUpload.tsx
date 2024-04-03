'use client';

import React, {useState, useRef} from 'react';
import Image from 'next/image';
import * as styles from './index.css';
import {IconClose, IconPlus} from '#/svgs';

interface WeddingImageUploadProps {
  updateImages: (files: File[]) => void;
}

const WeddingImageUpload = ({updateImages}: WeddingImageUploadProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && images.length < 10) {
      const selectedFiles = Array.from(e.target.files).slice(0, 10 - images.length);
      const newImageArray = [...images, ...selectedFiles];
      // setImages(newImageArray);

      const newThumbnails = selectedFiles.map((file) => URL.createObjectURL(file));
      setThumbnails((prevThumbnails) => [...prevThumbnails, ...newThumbnails]);

      updateImages(newImageArray);
    }
    e.preventDefault();
  };

  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setThumbnails((prevThumbnails) => prevThumbnails.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.galleryContainer}>
      <div
        role="presentation"
        className={styles.addButton}
        onClick={() => fileInputRef.current?.click()}
      >
        <IconPlus />
      </div>
      <div className={styles.imagesScrollContainer}>
        {thumbnails.map((thumbnail, index) => (
          <div key={index} className={styles.imageBox}>
            <Image
              src={thumbnail}
              alt={`Uploaded image ${index}`}
              layout="fill"
              objectFit="cover"
            />
            <button
              className={styles.deleteButton}
              onClick={() => deleteImage(index)}
            >
              🗙
            </button>
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={selectFile}
        multiple
        style={{display: 'none'}}
      />
    </div>
  );
};

export default WeddingImageUpload;