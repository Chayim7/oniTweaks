from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup Jinja2 templates
templates = Jinja2Templates(directory="templates")


# ============================
# MAIN PAGES
# ============================

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Homepage - Hero, guides preview, results preview, featured packs"""
    return templates.TemplateResponse("home.html", {"request": request})


@app.get("/packs", response_class=HTMLResponse)
async def packs(request: Request):
    """Packs/Products page - Premium pack listings"""
    packs_data = [
        {
            "id": "input-delay-pack",
            "title": "Input Delay Pack",
            "tag": "Controller Feel",
            "description": "Optimize controller responsiveness and reduce input lag for competitive advantage.",
            "price": "$29.99"
        },
        {
            "id": "fps-boost-pack",
            "title": "FPS Boost Pack",
            "tag": "Performance",
            "description": "Stabilize FPS and boost frame rates with tested configuration tweaks.",
            "price": "$24.99"
        },
        {
            "id": "controller-pack",
            "title": "Controller Feel Pack",
            "tag": "Precision",
            "description": "Advanced controller settings for improved aim and building precision.",
            "price": "$19.99"
        },
        {
            "id": "bundle",
            "title": "Complete Bundle",
            "tag": "Best Value",
            "description": "All optimization packs bundled together for maximum competitive edge.",
            "price": "$59.99"
        }
    ]
    return templates.TemplateResponse("packs.html", {"request": request, "packs": packs_data})


@app.get("/results", response_class=HTMLResponse)
async def results(request: Request):
    """Results/Showcase page - Before/after videos and proof"""
    results_data = [
        {
            "id": 1,
            "title": "FPS Stability Improvement",
            "category": "Performance",
            "description": "Before vs After: 60 to 144+ FPS consistency"
        },
        {
            "id": 2,
            "title": "Input Delay Reduction",
            "category": "Controller Feel",
            "description": "Competitive testing: Reduced perceived input lag"
        },
        {
            "id": 3,
            "title": "Building Fluidity",
            "category": "Precision",
            "description": "Building mechanics feel significantly smoother"
        },
        {
            "id": 4,
            "title": "Aim Consistency",
            "category": "Performance",
            "description": "Tracking and flick accuracy improvement showcase"
        },
        {
            "id": 5,
            "title": "Low-End Performance",
            "category": "Performance",
            "description": "Optimization on lower-spec systems"
        },
        {
            "id": 6,
            "title": "Network Optimization",
            "category": "Network",
            "description": "Reduced packet loss and improved latency"
        }
    ]
    return templates.TemplateResponse("results.html", {"request": request, "results": results_data})


@app.get("/tools", response_class=HTMLResponse)
async def tools(request: Request):
    """Tools/Resources page"""
    return templates.TemplateResponse("tools.html", {"request": request})


@app.get("/blog", response_class=HTMLResponse)
async def blog(request: Request):
    """Blog page"""
    return templates.TemplateResponse("blog.html", {"request": request})


# ============================
# GUIDE PAGES
# ============================

@app.get("/guides/controller-settings", response_class=HTMLResponse)
async def guide_controller_settings(request: Request):
    """Guide: Controller Settings Optimization"""
    guide_data = {
        "title": "Controller Settings Optimization",
        "slug": "controller-settings"
    }
    return templates.TemplateResponse("guides/controller-settings.html", {"request": request, "guide": guide_data})


@app.get("/guides/reduce-input-delay", response_class=HTMLResponse)
async def guide_reduce_input_delay(request: Request):
    """Guide: Reduce Input Delay"""
    guide_data = {
        "title": "Reduce Input Delay",
        "slug": "reduce-input-delay"
    }
    return templates.TemplateResponse("guides/reduce-input-delay.html", {"request": request, "guide": guide_data})


@app.get("/guides/fps-boost", response_class=HTMLResponse)
async def guide_fps_boost(request: Request):
    """Guide: FPS Boost & Stability"""
    guide_data = {
        "title": "FPS Boost & Stability",
        "slug": "fps-boost"
    }
    return templates.TemplateResponse("guides/fps-boost.html", {"request": request, "guide": guide_data})


@app.get("/guides/gpu-settings", response_class=HTMLResponse)
async def guide_gpu_settings(request: Request):
    """Guide: GPU Settings Guide"""
    guide_data = {
        "title": "GPU Settings Guide",
        "slug": "gpu-settings"
    }
    return templates.TemplateResponse("guides/gpu-settings.html", {"request": request, "guide": guide_data})


@app.get("/guides/network-optimization", response_class=HTMLResponse)
async def guide_network_optimization(request: Request):
    """Guide: Network Optimization"""
    guide_data = {
        "title": "Network Optimization",
        "slug": "network-optimization"
    }
    return templates.TemplateResponse("guides/network-optimization.html", {"request": request, "guide": guide_data})


@app.get("/guides/advanced-tweaks", response_class=HTMLResponse)
async def guide_advanced_tweaks(request: Request):
    """Guide: Advanced Tweaks & Performance"""
    guide_data = {
        "title": "Advanced Tweaks & Performance",
        "slug": "advanced-tweaks"
    }
    return templates.TemplateResponse("guides/advanced-tweaks.html", {"request": request, "guide": guide_data})
