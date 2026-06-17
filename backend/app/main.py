from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.database import supabase, supabase_admin

app = FastAPI(title="AI Todolist API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TodoCreate(BaseModel):
    title: str
    user_id: str

class TodoUpdate(BaseModel):
    is_completed: bool

@app.get("/")
def root():
    return {"message": "AI Todolist API is running!"}

@app.get("/todos/{user_id}")
def get_todos(user_id: str):
    res = supabase.table("Todolist - AI").select("*").eq("user_id", user_id).execute()
    return res.data

@app.post("/todos")
def create_todo(todo: TodoCreate):
    res = supabase.table("Todolist - AI").insert({"title": todo.title, "user_id": todo.user_id, "is_completed": False}).execute()
    return res.data

@app.patch("/todos/{todo_id}")
def update_todo(todo_id: int, todo: TodoUpdate):
    res = supabase.table("Todolist - AI").update({"is_completed": todo.is_completed}).eq("id", todo_id).execute()
    return res.data

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    res = supabase.table("Todolist - AI").delete().eq("id", todo_id).execute()
    return {"message": "Deleted"}
class AuthRequest(BaseModel):
    email: str
    password: str

@app.post("/register")
def register(body: AuthRequest):
    res = supabase_admin.auth.admin.create_user({
        "email": body.email,
        "password": body.password,
        "email_confirm": True
    })
    return {"message": "Đăng ký thành công", "user_id": res.user.id}

@app.post("/login")
def login(body: AuthRequest):
    res = supabase.auth.sign_in_with_password({
        "email": body.email,
        "password": body.password
    })
    return {
        "access_token": res.session.access_token,
        "user_id": res.user.id,
        "email": res.user.email
    }

@app.post("/logout")
def logout():
    supabase.auth.sign_out()
    return {"message": "Đăng xuất thành công"}  