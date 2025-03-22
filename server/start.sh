#!/bin/bash

# ssh
/usr/sbin/sshd

exec java -jar -Dspring.config.location=live.application.properties ./core/ggmAssetBackend-0.0.1-SNAPSHOT.jar
