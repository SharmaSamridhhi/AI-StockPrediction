# 📈 AI Stock Prediction App

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

---

## ⚠️ Known Issues

* Plotly charts may not work unless `plotly` is installed in backend
* Prophet installation may require build tools in Docker
* Ensure ports 3000 and 8000 are free before running

---

## 🌍 Deployment

You can deploy this project using:

* Render (Recommended)
* Railway
* VPS (AWS / DigitalOcean / Linode)

### Important:

* Replace `localhost` with your deployed backend URL in frontend
* Enable CORS in FastAPI for production

---

## 🛠️ Future Improvements

* Add authentication system
* Improve UI/UX
* Add more ML models (LSTM, ARIMA)
* Real-time stock data integration
* Deploy CI/CD pipeline

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Mayank Sharma**

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

---
