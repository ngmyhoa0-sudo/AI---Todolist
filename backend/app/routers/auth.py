from fastapi import APIRouter
from app.schemas.auth import UserRegister, UserLogin, ForgotPassword, ResetPassword
from app.database import supabase

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(body: UserRegister):
    res = supabase.auth.sign_up({
        "email": body.email,
        "password": body.password
    })
    return {"message": "Đăng ký thành công, vui lòng kiểm tra email!"}

@router.post("/login")
def login(body: UserLogin):
    res = supabase.auth.sign_in_with_password({
        "email": body.email,
        "password": body.password
    })
    return {
        "access_token": res.session.access_token,
        "user_id": res.user.id,
        "email": res.user.email
    }

@router.post("/logout")
def logout():
    supabase.auth.sign_out()
    return {"message": "Đăng xuất thành công"}

@router.post("/forgot-password")
def forgot_password(body: ForgotPassword):
    supabase.auth.reset_password_email(body.email)
    return {"message": "Email đặt lại mật khẩu đã được gửi!"}