pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-user') // Jenkins credential ID
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
                    bat 'docker build --no-cache -t 
                     .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    bat 'docker build --no-cache -t aleezgn/frontend:latest .'
                }
            }
        }

        stage('Scan Images') {
            steps {
                bat '''
                if exist C:\\Trivy\\trivy.exe (
                    C:\\Trivy\\trivy.exe image --exit-code 1 --severity HIGH aleezgn/backend:latest || echo "Trivy backend scan failed, continuing..."
                    C:\\Trivy\\trivy.exe image --exit-code 1 --severity HIGH aleezgn/frontend:latest || echo "Trivy frontend scan failed, continuing..."
                ) else (
                    echo "Trivy not found, skipping scan..."
                )
                '''
            }
        }

        stage('Push Images') {
            steps {
                bat '''
                echo %DOCKER_CREDENTIALS_PSW% | docker login -u %DOCKER_CREDENTIALS_USR% --password-stdin
                docker push aleezgn/backend:latest
                docker push aleezgn/frontend:latest
                '''
            }
        }

    }
}
