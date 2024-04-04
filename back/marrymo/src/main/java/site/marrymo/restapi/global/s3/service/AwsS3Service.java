package site.marrymo.restapi.global.s3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AwsS3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * S3에 이미지 업로드
     * 
     * @param dir  :S3에 저장할 폴더명
     * @param file :S3에 올릴 파일
     * @param userCode :S3 이미지명을 구별할 사용자 일련번호
     * @return
     * @throws IOException
     */
    public String uploadFileImage(String dir, MultipartFile file, String userCode) throws IOException{
        
        String fileName=dir+"/"+userCode+file.getOriginalFilename();

        // 이미 존재하는 파일명인 경우 삭제
        boolean isFileExist=amazonS3Client.doesObjectExist(bucket,fileName);
        if (isFileExist){
            amazonS3Client.deleteObject(bucket,fileName);
        }
        
        String fileUrl = "https://" + bucket + ".s3.amazonaws.com/" + fileName;
        ObjectMetadata metadata=new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        // 누구나 파일 URL을 통해 접근할 수 있도록 허용
        amazonS3Client.putObject(
                new PutObjectRequest(bucket,fileName,file.getInputStream(),metadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );
        return fileUrl;
    }

    public String uploadExcelFile(String dir, InputStream inputStream, String fileName, ObjectMetadata metadata) {
        String fileUrl = "https://" + bucket + ".s3.amazonaws.com/" + fileName;

        // 파일이 이미 존재하는 경우 삭제하는 로직은 선택 사항입니다.
        boolean isFileExist = amazonS3Client.doesObjectExist(bucket, fileName);
        if (isFileExist) {
            amazonS3Client.deleteObject(bucket, fileName);
        }

        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, inputStream, metadata)
                         .withCannedAcl(CannedAccessControlList.PublicRead));

        return fileUrl;
    }

}
