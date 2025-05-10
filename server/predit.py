import sys
import json
import torch
from transformers import BertTokenizer, BertForSequenceClassification

# Load model and tokenizer
model_path = "./bert_model"
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForSequenceClassification.from_pretrained(model_path)
model.eval()

# Get input text from command line
if len(sys.argv) < 2 or not sys.argv[1].strip():
    print(json.dumps({
        "error": "No valid input text provided."
    }))
    sys.exit(1)

text = sys.argv[1].strip()

# Tokenize input
inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)

# Run prediction
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits
    probs = torch.softmax(logits, dim=1)
    prediction = torch.argmax(probs, dim=1).item()
    confidence = probs[0][prediction].item()

# Return prediction as JSON
result = {
    "prediction": prediction,
    "confidence": round(confidence, 4)
}

print(json.dumps(result))
