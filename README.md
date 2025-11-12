Devops-project

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Prerequisites](#prerequisites)  
3. [Project Structure](#project-structure)  
4. [Docker & Docker Compose](#docker--docker-compose)  
5. [Jenkins CI/CD Pipeline](#jenkins-cicd-pipeline)  
6. [Kubernetes Deployment](#kubernetes-deployment)  
7. [Helm & ArgoCD](#helm--argocd)  
8. [Accessing the Application](#accessing-the-application)  
9. [Monitoring with Prometheus & Grafana](#monitoring-with-prometheus--grafana)  
10. [Additional Notes](#additional-notes)  

---

## Project Overview

This project is a **MERN (MongoDB, Express, React, Node.js) application** containerized using Docker, deployed on a local Kubernetes cluster with CI/CD integration through Jenkins, and managed with Helm & ArgoCD.  

**Main objectives:**

- Containerize backend & frontend services.  
- Automate build, test, and deployment using Jenkins.  
- Deploy on a local Kubernetes cluster (Minikube / Kind).  
- Implement GitOps workflow using ArgoCD.  
- Monitor application using Prometheus & Grafana.  

---

## Prerequisites

Before you start, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)  
- [Node.js](https://nodejs.org/en/download/)  
- [MongoDB](https://www.mongodb.com/try/download/community) or a running MongoDB service  
- [Jenkins](https://www.jenkins.io/download/)  
- [kubectl](https://kubernetes.io/docs/tasks/tools/)  
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) or Kind  
- [Helm](https://helm.sh/docs/intro/install/)  
- [ArgoCD CLI](https://argo-cd.readthedocs.io/en/stable/getting_started/)  
- [Trivy](https://github.com/aquasecurity/trivy) for container scanning  
- Optional: Prometheus & Grafana for monitoring  

---

## Project Structure

project-root/
│
├─ client/ # React frontend
│ └─ Dockerfile
│
├─ server/ # Node.js/Express backend
│ └─ Dockerfile
│
├─ docker-compose.yml # For local multi-container setup
├─ Jenkinsfile # CI/CD pipeline
├─ k8s/ # Kubernetes manifests
│ ├─ backend-deployment.yaml
│ ├─ frontend-deployment.yaml
│ └─ ...
├─ helm/ # Helm charts
│ ├─ backend/
│ ├─ frontend/
│ └─ values.yaml
├─ README.md # Project documentation
└─ .gitignore

yaml
Copy code

---

## Docker & Docker Compose

### Build & Run Locally

```bash
# From project root
docker-compose up --build
Backend accessible on: http://localhost:5000

Frontend accessible on: http://localhost:3000

Dockerfiles
server/Dockerfile → Node.js backend

client/Dockerfile → React frontend, usually served via Nginx

Jenkins CI/CD Pipeline
Pipeline defined in Jenkinsfile

Stages:

Checkout code from GitHub

Build Docker images (frontend & backend)

Push images to Docker Hub

Deploy to Kubernetes (optional with Helm/ArgoCD)

Credentials setup: Jenkins credential with Docker Hub username & password

Kubernetes Deployment
Create Cluster
bash
Copy code
minikube start 
Deploy Manifests

kubectl apply -f k8s/

Services & Deployments for backend and frontend are included

Use kubectl get pods to verify all pods are running

Port Forwarding

 minikube service frontend-service -n my-app
 minikube service backend-service -n my-app


Helm & ArgoCD
Helm Charts
Located in helm/ directory for each service


Accessing the Application
Frontend: http://localhost:3000 (or forwarded port)

Backend API: http://localhost:5000 (or forwarded port)




