# 📈 AI Stock Prediction App

<img width="1440" height="900" alt="Screenshot 2026-03-26 at 3 58 19 PM" src="https://github.com/user-attachments/assets/2c52010f-44f8-4be6-a9bf-07f26b62d871" />


A full-stack AI-powered stock prediction web application built using **FastAPI**, **React (Vite)**, and **Docker**.
It allows users to analyze stock trends and generate predictions using machine learning models.

---

## 🚀 Features

* 📊 Stock price prediction using Facebook Prophet
* ⚡ FastAPI backend for high-performance APIs
* 🎨 Modern React frontend (Vite)
* 🐳 Fully containerized using Docker
* 📉 Data visualization support (Plotly optional)

---

## 🏗️ Tech Stack

### Backend

* Python
* FastAPI
* Prophet
* Pandas / NumPy

### Frontend

* React (Vite)
* JavaScript / HTML / CSS

### DevOps

* Docker
* Docker Compose
* Nginx

---

## 📂 Project Structure

```
AI-StockPrediction/
│
├── backend/           # FastAPI backend
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend-v2/       # React frontend
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/AI-StockPrediction.git
cd AI-StockPrediction
```

---

### 🔹 2. Run with Docker

Make sure Docker is installed, then run:

```
docker compose up --build
```

---

### 🔹 3. Access the app

* Frontend → http://localhost:3000
* Backend API → http://localhost:8000
* API Docs → http://localhost:8000/docs

---

## 🐳 Docker Notes

* The project uses multi-container setup via Docker Compose
* Backend runs on port **8000**
* Frontend is served via **Nginx on port 3000**
