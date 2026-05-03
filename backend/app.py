from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import chatbot_route
import os

# Initialize FastAPI App
app = FastAPI(title="SMG-EV Chatbot API")

# Setup CORS to allow your React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Security tip: In production, change "*" to your React website URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the routes
app.include_router(chatbot_route)

# Simple health check to see if backend is running
@app.get("/")
def home():
    return {"message": "FastAPI Backend is running successfully! Send POST requests to /ask"}