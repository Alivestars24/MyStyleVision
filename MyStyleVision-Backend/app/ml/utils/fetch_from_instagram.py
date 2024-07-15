import datetime
import os
from contentlibraryapi import ContentLibraryAPIClient
import requests
from PIL import Image
from io import BytesIO
import boto3
from pymongo import MongoClient

# Initialize MongoDB client
mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["FashionReference"]

# Initialize S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

def process_and_upload_image(image_url, bucket_name):
    try:
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))
        img = img.resize((500, 500))  # Resize or process the image as needed
        buffer = BytesIO()
        img.save(buffer, "JPEG")
        buffer.seek(0)
        filename = f"{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
        s3_client.upload_fileobj(buffer, bucket_name, filename)
        s3_url = f"https://{bucket_name}.s3.amazonaws.com/{filename}"
        return s3_url
    except Exception as e:
        print(f"Error processing and uploading image: {e}")
        return None

def process_image(person: str, gender: str) -> None:
    keyword = f"{person} outfits {datetime.datetime.now().year}"
    total_images = 4
    bucket_name = "mystylevision-images"
    
    # Initialize Instagram Graph API client
    client = ContentLibraryAPIClient.get_instance(version='3')

    # Search for Instagram posts
    ig_post_search = client.search_ig_posts(q=keyword)
    posts = ig_post_search.query_next_page()

    image_urls = [post['media_url'] for post in posts if 'media_url' in post][:total_images]

    for image_url in image_urls:
        s3_url = process_and_upload_image(image_url, bucket_name)
        if s3_url:
            document = {
                "url": s3_url,
                "gender": gender,
                "created_at": datetime.datetime.now(),
            }
            db.FashionReference.insert_one(document)
            if db.FashionReference.find_one(document):
                print("Document inserted successfully")
            else:
                print("Failed to insert document")
        else:
            print(f"Failed to process image {image_url}")

# process_image("trending", "female")
# process_image("trending", "male")
