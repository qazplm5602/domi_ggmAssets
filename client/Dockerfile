FROM ubuntu

VOLUME [ "/domi" ]
WORKDIR /domi

ARG SSH_PASSWORD
ENV SSH_PASSWORD=${SSH_PASSWORD}

COPY dist ./static
COPY start.sh .

# SSH 설치 ㄱㄱ
RUN apt-get update && apt-get install -y openssh-server

# ssh 설정
RUN mkdir /var/run/sshd
RUN echo "root:${SSH_PASSWORD}" | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

RUN chmod -R 777 ./start.sh

CMD [ "./start.sh" ]