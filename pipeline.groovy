pipeline {
    agent any
    tools {
        jdk 'openJDK-21'
        nodejs 'node-23'
    }

    stages {
        stage('git clone') {
            steps {
                git branch: 'main', credentialsId: 'git-domi', url: 'https://github.com/qazplm5602/domi_ggmAssets'
            }
        }

        stage("backend test config create") {
            steps {
                dir('server/src/main/resources') {
                    sh "mv application.properties application.properties.tmp"
                    sh "echo -e \"spring.datasource.url=jdbc:h2:mem:db;DB_CLOSE_DELAY=-1;NON_KEYWORDS=USER\n spring.datasource.username=sa\n spring.datasource.password=sa\n domi.allow.email.domain=ggh.goe.go.kr\n domi.jwt.access.expire = 3600\n domi.jwt.refresh.expire = 21600\n domi.files.path=/test\n domi.crawler.url=sa\n spring.security.oauth2.client.registration.google.client-id=domi\n domi.jwt.key=${JWT_KEY}\" > ./application.properties"
                }
            }
        }

        stage("backend test") {
            steps {
                 dir('server') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew test'
                }
            }
        }

        stage("backend live config apply") {
            steps {
                dir('server/src/main/resources') {
                    sh "rm application.properties"
                    sh "mv application.properties.tmp application.properties"
                }
            }
        }

        stage('backend build') {
            steps {
                dir('server') {
                    sh './gradlew build -x test'
                }
            }
        }

        stage('frontend build') {
            steps {
                dir('client') {
                    sh 'npm install' // 패키지 설치
                    sh 'npm run build'
                }
            }
        }

        stage('backend server apply') {
            steps {
                sshPublisher(
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'ggmAsset-server',
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    cleanRemote:false,
                                    sourceFiles: 'server/build/libs/',
                                    removePrefix: 'server/build/libs/',
                                    remoteDirectory: '',
                                ),
                                sshTransfer(
                                    execCommand: 'kill -SIGTERM 1'
                                )
                            ]
                        )
                    ]
                )
            }
        }

        stage('frontend server apply') {
            steps {
                sshPublisher(
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'ggmAsset-client',
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    cleanRemote:false,
                                    sourceFiles: 'client/dist',
                                    removePrefix: 'client/dist',
                                    remoteDirectory: '',
                                ),
                                sshTransfer(
                                    execCommand: 'kill -SIGTERM 1'
                                )
                            ]
                        )
                    ]
                )
            }
        }

        stage('crawler apply') {
            steps {
                sshPublisher(
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'ggmAsset-crawler',
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    cleanRemote:false,
                                    sourceFiles: 'crawler/',
                                    removePrefix: 'crawler/',
                                    remoteDirectory: '',
                                ),
                                sshTransfer(
                                    execCommand: 'kill -SIGTERM 1'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}
