from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = FastAPI()

# ✅ CORS SETTINGS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://areyoudiabetic.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load tokenizer and model directly from Hugging Face Hub
MODEL_NAME = "ShivamB15/bert-diabetes-detector"
tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)
model = BertForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()

# ✅ Input schema
class InputText(BaseModel):
    text: str

# ✅ Prediction route
@app.post("/predict")
async def predict(input_data: InputText):
    inputs = tokenizer(input_data.text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=1)
        prediction = torch.argmax(probs, dim=1).item()
        confidence = probs[0][prediction].item()
    return {"prediction": prediction, "confidence": round(confidence, 4)}
