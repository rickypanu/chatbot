from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from model import ask_bot

# Replace Flask Blueprint with FastAPI APIRouter
chatbot_route = APIRouter()

# Define how the incoming JSON should look
class QueryRequest(BaseModel):
    query: str

@chatbot_route.post('/ask')
def ask(request: QueryRequest):
    try:
        user_query = request.query
        print(f"User query received: {user_query}")
        
        # Call your AI model logic
        response = ask_bot(user_query)
        
        # FastAPI automatically converts dictionaries to JSON
        return {"response": response}
    
    except Exception as e:
        print("❌ Error while processing request:", e)
        # Proper error handling in FastAPI
        raise HTTPException(status_code=500, detail=str(e))