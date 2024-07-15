import os
import openai
from typing import List, Dict, Any

def call_openai(messages: List[Dict[str, Any]]) -> str:
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY environment variable is not set")

    openai.api_key = OPENAI_API_KEY
    print(f"Using OpenAI API Key: {OPENAI_API_KEY}")

    try:
        chat_completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=2000,
        )
        print("API Response:", chat_completion)

        return chat_completion.choices[0].message["content"]
    
    except openai.error.OpenAIError as e:
        print(f"OpenAI API error: {e}")
        raise e
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise e

def call_gpt_4_turbo(messages: List[Dict[str, Any]]) -> str:
    client = openai.OpenAI()
    openai.api_type = "azure"
    openai.api_base = os.getenv("OPENAI_API_BASE")
    openai.api_version = "2024-02-01"
    openai.api_key = os.getenv("OPENAI_API_KEY")
    chat_completion = client.chat.completions.create(
        messages=messages,
        model="gpt-4-turbo",
        max_tokens=1000,
        )
            
    return chat_completion.choices[0].message.content