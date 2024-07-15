from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
from sklearn.metrics.pairwise import pairwise_distances
import requests
from io import BytesIO
from PIL import Image
import numpy as np
from ..models.model import load_model_and_data, get_embed

router = APIRouter()

class RecommendRequest(BaseModel):
    url: str
    top_n: int = 5

# Load the model and data
model, df_images, df_embeddings = load_model_and_data()

# Load the CSV file with image URLs
csv_file_path = 'E:/IMAGE_reccomendation/backend-rec/images.csv'
df_urls = pd.read_csv(csv_file_path)

def load_image_from_url(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    img = img.resize((224, 224))  # Resize image to match model input size
    return img

def get_image_url(filename):
    match = df_urls[df_urls['filename'] == filename]
    if not match.empty:
        return match.iloc[0]['link']
    return None

@router.post("/recommend")
def recommend(request: RecommendRequest):
    url = request.url
    top_n = request.top_n
    img = load_image_from_url(url)
    embedding = get_embed(model, img)
    sim_scores = 1 - pairwise_distances([embedding], df_embeddings.values, metric='cosine').flatten()
    top_indices = np.argsort(sim_scores)[::-1][:top_n]
    recommended_items = df_images.iloc[top_indices]

    # Ensure the column exists before applying the function
    if 'image' not in recommended_items.columns:
        raise KeyError("The 'image' column is missing in the DataFrame")

    similarities = sim_scores[top_indices]

    # Add the image URLs to the recommended items
    recommended_items = recommended_items.copy()
    recommended_items['image_url'] = recommended_items['image'].apply(get_image_url)

    return {"recommendations": recommended_items.to_dict(orient='records'), "similarities": similarities.tolist()}
