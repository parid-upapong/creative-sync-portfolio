import os
from typing import List
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_site_structure(assets_summary: str, user_intent: str):
    """
    Takes analyzed asset data and user goals to produce a SiteManifest.
    """
    prompt = f"""
    Act as a World-Class Web Designer. 
    User Context: {user_intent}
    Asset Analysis: {assets_summary}
    
    Task: Create a JSON SiteManifest for a creative portfolio.
    Requirements:
    - Use a 'Minimalist' aesthetic if assets are high-contrast.
    - Generate compelling copywriting for the hero section.
    - Map assets into logical project galleries.
    
    Output must strictly follow the SiteManifest JSON schema.
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": prompt}],
        response_format={ "type": "json_object" }
    )
    
    return response.choices[0].message.content

# Logic for triggering the vision analysis on uploaded images
def analyze_image(image_url: str):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe the style, dominant colors, and mood of this creative work."},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ],
            }
        ]
    )
    return response.choices[0].message.content