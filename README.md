# MyStyleVision

MyStyleVision is a revolutionary platform designed to meet GenZ's demand for customization, uniqueness, and convenience in their fashion journey. By leveraging advanced technology, MyStyleVision provides users with the ability to generate unique fashion designs, integrate the latest trends, and receive similar product recommendations from Myntra.

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Setup](#setup)
6. [Images](#images)
7. [Tech Stack](#tech-stack)

### Overview
A large consumer segment of Myntra, GenZ, prefers personalized content. This segment seeks unique choices, customized options, and interactive shopping experiences. MyStyleVision addresses these preferences by offering a platform that allows users to create and explore fashion in a way that is both personal and convenient.

The Isobar-Ipsos survey on the Indian Gen-Z by Business Insider reveals that "78 percent of GenZ will personalize to look good and 79 percent will make their own fashion statement to stand out." Additionally, a study by Vogue on how Indian GenZ’s shop states that GenZ’s want less clutter and more convenience even in shopping experiences.

## Key Features
- **Design Generation:** Users can create a collection of five unique clothing items in real-time by providing the name of a theme and its description.
- **Trend Integration:** Scrapes the Internet for the latest trends, which are used to help create a collection.
- **Fashion Blueprints:** Download tech packs for every design that includes details such as fabric, measurements, and adornments to make the design production ready.
- **Similar Recommendations:** Discover similar items on Myntra to purchase instantly, ensuring a seamless and clutter-free shopping experience.

### Architecture
![Architecture Diagram](https://github.com/user-attachments/assets/43f919cc-8026-4dd2-82bb-9a0ad8b0ada1)

**Component** | **Functionality**
--- | ---
Create Collection | - User inputs the name and description of the collection.
Generate Collection Description (gpt-3.5-turbo) | - Generates a description for the entire collection.
Generate Cover Image (dall-e-3) | - Generates a cover image for the collection and uploads it to Amazon S3.
Generate Entire Collection (consists of 5 items) | - Generates a complete collection consisting of five items.
Generate Item Names (gpt-3.5-turbo) | - Generates names for individual items in the collection.
Generate Description for Item (gpt-3.5-turbo) | - Generates detailed descriptions for each item.
Get Related Context and References | - Retrieves related context and references for items.
Generate Item Image (dall-e-3) | - Generates images for each item and uploads them to Amazon S3.
Bing Search to Gather Latest Outfit Images | - Searches the web for the latest outfit images using Bing.
Process Images (resizing and format change) | - Processes images by resizing and changing their format.
Generate Trend Summary from Images (gpt-3.5-turbo) | - Generates a summary of fashion trends based on the processed images.
Vector Store (OpenAIEmbeddings) | - Stores generated vectors for efficient retrieval.
Amazon S3 | - Stores generated images and other assets.
MongoDB | - Stores collection data and other related information.


## Installation

### 1.Clone the repository:
```bash
git clone https://github.com/Alivestars24/MyStyleVision.git
```

### 2.Install Dependancies for frontend
```bash
cd MyStyleVision-frontend

npm install
```
### 3.Install Dependancies for backend
```bash
cd MyStyleVision-backend
pip install -r requirements.txt

cd IMAGE_recommendation
pip install -r requirements.txt

```
## Setup

### 1.Run the frontend
- After installation navigate to the frontend directory.
- Run the following command to start the frontend:
```bash
npm start
```
Open your web browser and go to http://localhost:3000 to access the application

### 2.Run the Backend
- After installation navigate to the backend directory.
- Locate the sample.env file.
- Rename sample.env to .env.
- Open the .env file in a text editor and fill in the required values for the environment variables.
- Run the following command to start the backend:
 ```bash
 cd MyStyleVision-backend
 uvicorn app.main:app --reload
 cd IMAGE_recommendation
 uvicorn app.main:app --reload
```

## Images

### 1.Home Page 
![Home](https://github.com/user-attachments/assets/6a5f0303-de3a-4f9c-932f-975ecb0acb22)

### 2.Create your own Collection
![create_collection_page](https://github.com/user-attachments/assets/a1809dc9-9f65-477f-9e70-96c09a7c79cc)

### 3.Explore collections
![Explore_collections_page](https://github.com/user-attachments/assets/0dd19e19-e85b-4574-8470-cc727b91bf2b)

### 4.View a Collection
![View_collection_page](https://github.com/user-attachments/assets/7339fa93-3360-4550-acf1-12e76b2de298)

### 5.View an Item
![View_item_page](https://github.com/user-attachments/assets/fcebe611-58f9-4ac0-b998-d7a1ba2632a5)

### 6.Similar Recommendations
![Similar_recommendations_page](https://github.com/user-attachments/assets/3d07a941-ec4c-4126-a9dc-56f2e2c93168)



## TechStack
![Tech_stack_image](https://github.com/user-attachments/assets/46177345-7791-4ac9-bf6c-4800747df414)




