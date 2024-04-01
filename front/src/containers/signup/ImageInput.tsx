import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';

import * as styles from './index.css';
import FileThumbnails from './FileThumbnails';
import Button from '@/components/Button';

interface FileInputProps {
  files: File[],
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageInput = ({files, setFiles}: FileInputProps) => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(thumbnails);
  }, [thumbnails]);
  const selectFile = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const selectedFiles: File[] = e.target.files ? Array.from(e.target.files) : [];
    console.log(selectedFiles);
    // 이미지 URL을 생성하고 상태에 추가
    const newImageUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setThumbnails(prevFiles => [...prevFiles, ...newImageUrls]);
    console.log(files);
  };

  const deleteFile = (imageUrl: string) => {
    // 썸네일 URL에 해당하는 실제 파일을 찾아서 삭제
    const newFiles = files.filter(file => URL.createObjectURL(file) !== imageUrl);
    setThumbnails(prevThumbnails => prevThumbnails.filter(url => url !== imageUrl));
    // 실제 파일 상태도 업데이트(상태 업데이트 함수 호출)
    setFiles(newFiles);
  };

  return (
    <div className={styles.galleryContainer}>

      {/* 이미지 목록 */}
      <div className={styles.imageContainer}>
        {/* 이미지 추가 버튼 */}
        <div
          role="presentation"
          className={styles.addFileButton}
          onClick={() => fileInputRef.current?.click()}
        >
          +
        </div>
        <FileThumbnails files={thumbnails} deleteFileHandler={deleteFile} />
      </div>
      {/*{thumbnails.map((thumbnailUrl, index) => (*/}
      {/*  <div className={styles.imageBox} key={index}>*/}
      {/*    <Image*/}
      {/*      src={thumbnailUrl}*/}
      {/*      alt={`Wedding Gallery ${index + 1}`}*/}
      {/*      className={styles.imagePreview}*/}
      {/*    />*/}
      {/*    <button className={styles.deleteButton} onClick={() => deleteFile(thumbnailUrl)}>X</button>*/}
      {/*  </div>*/}
      {/*))}*/}
      <input ref={fileInputRef} type="file" onChange={selectFile} multiple style={{display: 'none'}} />
    </div>

    //   {/* 이미지 추가 버튼 */}
    //   <Button
    //     onClick={() => fileInputRef.current?.click()}
    //     type="button"
    //     size="large"
    //   >
    //     웨딩화보 사진 업로드
    //   </Button>
    //   <input ref={fileInputRef} type="file" onChange={selectFile} multiple style={{display: 'none'}} />
    //
    //   {/*이미지 미리보기 및 삭제 버튼*/}
    //   <FileThumbnails
    //     files={files}
    //     deleteFileHandler={deleteFile}
    //   />
    // </div>
  );
};

export default ImageInput;