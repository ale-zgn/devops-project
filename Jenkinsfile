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
                    bat 'docker build --no-cache -t myuser/backend:latest .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    bat 'docker build --no-cache -t myuser/frontend:latest .'
                }
            }
        }

        stage('Scan Images') {
            steps {
                bat 'trivy image --exit-code 1 --severity HIGH myuser/backend:latest'
                bat 'trivy image --exit-code 1 --severity HIGH myuser/frontend:latest'
            }
        }

        stage('Push Images') {
            steps {
                bat 'docker login -u %DOCKER_CREDENTIALS_USR% -p %DOCKER_CREDENTIALS_PSW%'
                bat 'docker push myuser/backend:latest'
                bat 'docker push myuser/frontend:latest'
            }
        }
    }
}
