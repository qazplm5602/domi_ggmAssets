FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app
EXPOSE 8080

# live.application.properties 파일 필요
ENV SPRING_CONFIG_NAME=live


COPY build/libs/ggmAssetBackend-0.0.1-SNAPSHOT.jar .

# 이미지들 넣을 폴더 만듬 (볼륨 마운트 시 직접 생성 필요함)
# RUN mkdir ./attachment
# RUN mkdir ./attachment/thumbnail
# RUN mkdir ./attachment/asset

CMD [ "java", "-jar", "ggmAssetBackend-0.0.1-SNAPSHOT.jar" ]