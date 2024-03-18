FROM openjdk:17-alpine

# build된 jar 파일 위치
ARG JAR_FILE=build/libs/app.jar

# jar 파일을 컨테이너 내부에 복사
COPY ${JAR_FILE} backend.jar

ENTRYPOINT ["java", "-jar", "./backend.jar"]