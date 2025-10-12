from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates

from .generator import generatae_keys

router = APIRouter(prefix="/random_keys")
templates = Jinja2Templates(directory="random_keys/templates")


@router.get("", response_class=HTMLResponse)
@router.get("/", response_class=HTMLResponse)
async def keys_page(request: Request):
    return templates.TemplateResponse("random_keys.html", {"request": request})


@router.post("/generate-keys")
async def generate(data: dict):
    try:
        bars = int(data.get("bars"), 0)
        keys = generatae_keys(bars)

    except (ValueError, TypeError):
        raise HTTPException(
            status_code=400, detail="Number of bars has to be an int between 1 and 24"
        )
    return JSONResponse({"keys": keys, "bars": bars})
