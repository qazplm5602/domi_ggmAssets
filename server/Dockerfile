FROM openjdk:21-slim

VOLUME [ "/domi/attachment" ]
WORKDIR /domi

ARG SSH_PASSWORD
ENV SSH_PASSWORD=${SSH_PASSWORD}

EXPOSE 8080

COPY build/libs ./core
COPY start.sh .
COPY live.application.properties .

# SSH 설치 ㄱㄱ
RUN apt-get update && apt-get install -y openssh-server

# ssh 설정
RUN mkdir /var/run/sshd
RUN echo "root:${SSH_PASSWORD}" | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

RUN chmod -R 777 ./start.sh

# 이미지들 넣을 폴더 만듬
RUN mkdir ./attachment
RUN mkdir ./attachment/thumbnail
RUN mkdir ./attachment/asset

CMD [ "./start.sh" ]