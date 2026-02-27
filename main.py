from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    return {"analysis": "Resume analyzed successfully"}

@app.post("/coding-help")
async def coding_help(data: dict):
    return {"answer": "Coding help response"}

@app.post("/roadmap")
async def roadmap(data: dict):
    return {"roadmap": "Generated roadmap"}

@app.post("/projects")
async def projects(data: dict):
    return {"projects": ["Project 1", "Project 2"]}