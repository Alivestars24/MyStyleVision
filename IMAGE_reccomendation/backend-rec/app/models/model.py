import pandas as pd
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.preprocessing import image
import numpy as np

def load_model_and_data():
    img_width, img_height = 224, 224
    base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(img_width, img_height, 3))
    base_model.trainable = False
    model = tf.keras.Sequential([
        base_model,
        GlobalMaxPooling2D()
    ])
    
    df_images = pd.read_csv('E:/IMAGE_reccomendation/backend-rec/image_data.csv')
    df_embeddings = pd.read_csv('E:/IMAGE_reccomendation/backend-rec/embeddings.csv')
    
    return model, df_images, df_embeddings

def get_embed(model, img):
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    return model.predict(x).reshape(-1)
