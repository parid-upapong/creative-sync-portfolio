import torch
from PIL import Image
import numpy as np
from transformers import CLIPProcessor, CLIPModel
import cv2
from sklearn.cluster import KMeans

class AssetAnalyzer:
    def __init__(self):
        # Initialize CLIP for semantic understanding and tagging
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(self.device)
        self.processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        
        # Candidate tags for creative portfolios
        self.candidate_labels = [
            "minimalist photography", "vibrant UI design", "dark mode web design", 
            "3D abstract render", "portrait photography", "architectural sketch",
            "typography focused", "pastel illustration", "industrial design"
        ]

    def extract_metadata(self, image_path: str):
        image = Image.open(image_path).convert("RGB")
        
        # 1. Semantic Tagging & Description via CLIP
        inputs = self.processor(text=self.candidate_labels, images=image, return_tensors="pt", padding=True).to(self.device)
        outputs = self.model(**inputs)
        logits_per_image = outputs.logits_per_image
        probs = logits_per_image.softmax(dim=1)
        
        top_prob, top_idx = probs[0].topk(3)
        tags = [self.candidate_labels[idx] for idx in top_idx]

        # 2. Dominant Color Extraction (K-Means)
        colors = self._get_dominant_colors(image)

        # 3. Aesthetic & Composition Analysis
        brightness, contrast = self._get_image_stats(image)

        return {
            "tags": tags,
            "confidence_scores": top_prob.tolist(),
            "palette": colors,
            "metrics": {
                "brightness": brightness,
                "contrast": contrast,
                "aspect_ratio": image.width / image.height
            }
        }

    def _get_dominant_colors(self, image, k=5):
        img_np = np.array(image)
        img_np = cv2.resize(img_np, (100, 100)) # Resize for speed
        pixels = img_np.reshape(-1, 3)
        
        kmeans = KMeans(n_clusters=k, n_init=10)
        kmeans.fit(pixels)
        
        colors = kmeans.cluster_centers_.astype(int)
        # Convert to Hex
        hex_colors = [f"#{c[0]:02x}{c[1]:02x}{c[2]:02x}" for c in colors]
        return hex_colors

    def _get_image_stats(self, image):
        img_np = np.array(image.convert('L')) # Grayscale
        brightness = np.mean(img_np) / 255.0
        contrast = np.std(img_np) / 255.0
        return float(brightness), float(contrast)