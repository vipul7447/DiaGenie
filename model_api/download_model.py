import os
import gdown

MODEL_DIR = "bert_model"
MODEL_PATH = os.path.join(MODEL_DIR, "model.safetensors")
FILE_ID = "15wAzBKhYdwYyde4Mpk4y2toDJox0AGQd"  # Replace with your actual file ID if changed

def download_model():
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
    if not os.path.exists(MODEL_PATH):
        url = f"https://drive.google.com/uc?id={FILE_ID}"
        print("Downloading model from Google Drive...")
        gdown.download(url, MODEL_PATH, quiet=False)
        print("Model download complete.")
    else:
        print("Model already exists.")

if __name__ == "__main__":
    download_model()
