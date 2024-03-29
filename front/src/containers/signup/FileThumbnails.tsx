import Image from "next/image";
import Close from "../../../public/svgs/close.svg";
import {MouseEventHandler} from "react";
import * as styles from './index.css'

interface FileThumbnailsProps {
  files: File[];
  deleteFileHandler?: (fileName: string) => void;
  addFileHandler?: MouseEventHandler<HTMLDivElement>;
  onDrop?: (event: React.DragEvent) => void;
}

const FileThumbnails = ({
                          files,
                          deleteFileHandler,
                          addFileHandler,
                          onDrop
                        }: FileThumbnailsProps) => {
  return (
    <div>
      {files.map((file) => (
        <div className={styles.imageBox} key={file.name}>
          <Image
            src={URL.createObjectURL(file)}
            width={80}
            height={80}
            sizes='80px'
            alt={file.name}
            placeholder='blur'
            blurDataURL={URL.createObjectURL(file)}
          />
          <div
            role='presentation'
            className={styles.deleteButton}
            onClick={() => deleteFileHandler && deleteFileHandler(file.name)}
          >
            <Close size='0.8rem'/>
          </div>
          {/* 파일 추가 버튼 (옵셔널) */}
          {addFileHandler && (
            <div
              role='presentation'
              className={styles.addFileButton}
              onClick={addFileHandler}
            >
              파일 추가하기
            </div>
          )}

          {/* 드래그 앤 드롭 영역 (옵셔널) */}
          {onDrop && (
            <div
              className={styles.dropArea}
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
            >
              파일을 이곳에 드래그하세요
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FileThumbnails;