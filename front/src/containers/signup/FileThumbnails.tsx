import Image from 'next/image';
import Close from '../../../public/svgs/close.svg';
import {MouseEventHandler} from 'react';
import * as styles from './index.css';
import Button from '@/components/Button';

interface FileThumbnailsProps {
  files: File[];
  deleteFileHandler?: (fileName: string) => void;
  addFileHandler?: MouseEventHandler<HTMLDivElement>;
}

const FileThumbnails = ({
                          files,
                          deleteFileHandler,
                          addFileHandler,
                        }: FileThumbnailsProps) => {
  console.log(files[0]);
  return (
    <div>
      {files.map((file, index) => {
        // 파일이 유효한지 확인
        if (!(file instanceof File)) {
          console.error('Invalid file object', file);
          return null;
        }
        const fileURL = URL.createObjectURL(file);
        return (
          <div className={styles.imageBox} key={index}>
            {/*<Image*/}
            {/*  src={URL.createObjectURL(file)}*/}
            {/*  width={60}*/}
            {/*  height={60}*/}
            {/*  sizes="80px"*/}
            {/*  alt={file.name}*/}
            {/*  placeholder="blur"*/}
            {/*  blurDataURL={URL.createObjectURL(file)}*/}
            {/*/>*/}
            <img
              src={fileURL}
              alt={`Wedding preview ${index}`}
              width={60}
              height={60}
              className={styles.image}
              onLoad={() => URL.revokeObjectURL(fileURL)}
            />
            <div className={styles.deleteButton}>
              <Button
                type="button"
                onClick={() => {
                  if (deleteFileHandler) {
                    deleteFileHandler(file.name);
                    URL.revokeObjectURL(fileURL);
                  }
                }}
              >
                <Close size="0.8rem" />
              </Button>
            </div>
            {/* 파일 추가 버튼 (옵셔널) */}
            {/*{addFileHandler && (*/}
            {/*  <div*/}
            {/*    role='presentation'*/}
            {/*    className={styles.addFileButton}*/}
            {/*    onClick={addFileHandler}*/}
            {/*  >*/}
            {/*   파일 추가하기*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
        );
      })}
    </div>
  );
};

export default FileThumbnails;