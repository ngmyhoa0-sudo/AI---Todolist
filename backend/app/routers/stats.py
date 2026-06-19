from fastapi import APIRouter, Depends
from app.database import supabase
from app.dependencies import verify_token

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("/")
def get_stats(user=Depends(verify_token)):
    res = supabase.table("tasks").select("*").eq("user_id", user["id"]).execute()
    tasks = res.data

    total = len(tasks)
    completed = len([t for t in tasks if t["is_completed"]])
    active = total - completed

    return {
        "total": total,
        "completed": completed,
        "active": active,
    }