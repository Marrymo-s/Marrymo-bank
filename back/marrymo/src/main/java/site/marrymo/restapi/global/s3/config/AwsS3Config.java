package site.marrymo.restapi.global.s3.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {

    // S3를 등록한 사람이 전달받은 key 값 (접속을 위함)
    @Value("${cloud.aws.credentials.accesskey}")
    private String accessKey;

    // S3를 등록한 사람이 전달받은 key 값 (접속을 위함)
    @Value("${cloud.aws.credentials.secretkey}")
    private String secretKey;

    // S3를 등록한 사람이 S3를 사용할 지역
    @Value("${cloud.aws.region.static}")
    private String region;

    @Bean
    public AmazonS3Client amazonS3Client(){
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey,secretKey);
        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }

}
