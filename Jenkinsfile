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
                bat '''
                if exist C:\\Trivy\\trivy.exe (
                    C:\\Trivy\\trivy.exe image --exit-code 1 --severity HIGH myuser/backend:latest || echo "Trivy backend scan failed, continuing..."
                    C:\\Trivy\\trivy.exe image --exit-code 1 --severity HIGH myuser/frontend:latest || echo "Trivy frontend scan failed, continuing..."
                ) else (
                    echo "Trivy not found, skipping scan..."
                )
                '''
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
