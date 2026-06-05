FROM node:23-slim

WORKDIR /app
EXPOSE 3000

# 설정 기본값
ENV API_PORT=3000
ENV IMAGE_PATH=images/
ENV IMAGE_EXPIRE=300

# IMAGE_PATH env 변경 시 의미 없어짐 (코드에서 생성하도록 해야할듯)
RUN mkdir ./images

# 의존성 설치
COPY ./package*.json .
RUN npm i

# 소스코드 복사
COPY . .

# 시작 ㄱㄱ
CMD [ "npm", "run", "start" ]