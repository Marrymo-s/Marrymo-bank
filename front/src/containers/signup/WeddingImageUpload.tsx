'use client';

import React, {useState, useRef} from 'react';
import Image from 'next/image';
import * as styles from './index.css';
import CloseIcon from '../../../public/svgs/close.svg';
import Button from '@/components/Button';

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
      setImages(newImageArray);
    }
    e.preventDefault();
    const selectedFiles: File[] = e.target.files ? Array.from(e.target.files) : [];
    const newThumbnails = selectedFiles.map((file) => URL.createObjectURL(file));

    updateImages(selectedFiles);

    setImages((prevImages) => [...prevImages, ...selectedFiles]);
    setThumbnails((prevThumbnails) => [...prevThumbnails, ...newThumbnails]);
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    // setThumbnails((prevThumbnails) => prevThumbnails.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className={styles.galleryContainer}>
      {images.map((image, index) => (
        <div key={index} className={styles.imageBox}>
          <img
            src={URL.createObjectURL(image)}
            alt={`Wedding Gallery ${index + 1}`}
            width={60}
            height={60}
            onLoad={(event) => URL.revokeObjectURL((event.target as HTMLImageElement).src)}
          />
          <div className={styles.deleteButton}>
            <Button
              type="button"
              onClick={() => deleteImage(index)}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
      ))};
      {/*{images.length < 10 && (*/}
      {/*  <div className={styles.addButton}>*/}
      {/*    <Button*/}
      {/*      type='button'*/}
      {/*      onClick={() => fileInputRef.current?.click()}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className={styles.imagesContainer}>
        {thumbnails.map((thumbnail, index) => (
          <div key={index} className={styles.imageBox}>
            <Image
              src={thumbnail}
              alt={`Uploaded image ${index}`}
              layout="fill"
              objectFit="cover"
            />
            {/*<button*/}
            {/*  className={styles.deleteButton}*/}
            {/*  onClick={() => deleteFile(index)}*/}
            {/*>*/}
            {/*  <Close size="0.8rem" />*/}
            {/*</button>*/}
          </div>
        ))}
        <div
          role="presentation"
          className={styles.addButton}
          onClick={() => fileInputRef.current?.click()}
        >
          +
        </div>
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