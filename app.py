from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from random_keys import router as random_keys_router

app = FastAPI()


app.mount(
    "/random_keys/static",
    StaticFiles(directory="random_keys/static"),
    name="random_keys_static",
)
templates = Jinja2Templates(directory="templates")

app.include_router(random_keys_router)


@app.get("/", response_class=HTMLResponse)
async def get_index(request: Request):
    return templates.TemplateResponse("main.html", {"request": request})
