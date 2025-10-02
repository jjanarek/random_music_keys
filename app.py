from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

import random

app = FastAPI()

KEYS = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def get_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/generate-keys")
async def generate(data: dict):
    try:
        bars = int(data.get("bars", 0))
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Parameter 'bars' has to be an integer number between 1 and 24",
        )
    if bars < 1 or bars > 24:
        raise HTTPException(
            status_code=400, detail="Number of bars has to be between 1 and 24"
        )

    result = [random.choice(KEYS) for _ in range(bars)]
    return JSONResponse(content={"bars": bars, "keys": result})
