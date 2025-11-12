pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-user') // single Jenkins credential ID
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('server') {
                    sh 'docker build -t myuser/backend:latest .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'docker build -t myuser/frontend:latest .'
                }
            }
        }

        stage('Scan Images') {
            steps {
                sh 'trivy image myuser/backend:latest'
                sh 'trivy image myuser/frontend:latest'
            }
        }

        stage('Push Images') {
            steps {
                // Jenkins automatically sets:
                // $DOCKER_CREDENTIALS_USR → username
                // $DOCKER_CREDENTIALS_PSW → password
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
                sh 'docker push myuser/backend:latest'
                sh 'docker push myuser/frontend:latest'
            }
        }
    }
}
