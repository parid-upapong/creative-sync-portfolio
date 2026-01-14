from fastapi import FastAPI, UploadFile, File, HTTPException
from app.engine.analyzer import AssetAnalyzer
import shutil
import os
import uuid

app = FastAPI(title="AI Portfolio CV Service")
analyzer = AssetAnalyzer()

UPLOAD_DIR = "temp_assets"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/health")
async def health_check():
    return {"status": "active", "engine": "CLIP-ViT-B/32"}

@app.post("/analyze")
async def analyze_asset(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image assets are supported currently.")

    file_extension = file.filename.split(".")[-1]
    temp_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.{file_extension}")

    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run CV Analysis
        analysis_results = analyzer.extract_metadata(temp_path)
        
        return {
            "filename": file.filename,
            "analysis": analysis_results,
            "suggestions": {
                "theme_hint": "dark" if analysis_results['metrics']['brightness'] < 0.4 else "light",
                "layout_style": "grid" if analysis_results['metrics']['aspect_ratio'] > 0.8 else "masonry"
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)