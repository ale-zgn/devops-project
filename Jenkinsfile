pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-user') // set in Jenkins credentials
        DOCKER_PASS = credentials('dockerhub-pass')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('server') { // folder containing backend Dockerfile
                    sh 'docker build -t myuser/backend:latest .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') { // folder containing frontend Dockerfile
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
                sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                sh 'docker push myuser/backend:latest'
                sh 'docker push myuser/frontend:latest'
            }
        }
    }
}
