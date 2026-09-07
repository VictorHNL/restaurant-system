import base64, hashlib, hmac, json, os, secrets, time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

SECRET = os.getenv("JWT_SECRET", "development-secret-change-in-production").encode()
users: dict[str, dict] = {}
app = FastAPI(title="User Service")
app.add_middleware(CORSMiddleware, allow_origins=os.getenv("CORS_ORIGINS","http://localhost:5173").split(","), allow_methods=["*"], allow_headers=["*"])

class Register(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
class Login(BaseModel):
    email: EmailStr
    password: str

def password_hash(value: str, salt: str | None = None):
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", value.encode(), salt.encode(), 200_000).hex()
    return salt + "$" + digest
def password_ok(value: str, stored: str):
    salt, digest = stored.split("$", 1)
    return hmac.compare_digest(password_hash(value, salt), salt + "$" + digest)
def token_for(user):
    payload = base64.urlsafe_b64encode(json.dumps({"sub":user["id"],"email":user["email"],"exp":int(time.time())+3600}).encode()).decode().rstrip("=")
    signature = hmac.new(SECRET, payload.encode(), hashlib.sha256).hexdigest()
    return payload + "." + signature

@app.post("/auth/register", status_code=201)
def register(data: Register):
    key = data.email.lower()
    if key in users: raise HTTPException(409, "Este e-mail já possui uma conta")
    user = {"id": len(users)+1, "name": data.name, "email": key, "password": password_hash(data.password)}
    users[key] = user
    return {"token": token_for(user), "user": {"id": user["id"], "name":user["name"], "email":key}}
@app.post("/auth/login")
def login(data: Login):
    user = users.get(data.email.lower())
    if not user or not password_ok(data.password, user["password"]): raise HTTPException(401, "E-mail ou senha inválidos")
    return {"token": token_for(user), "user":{"id":user["id"],"name":user["name"],"email":user["email"]}}
@app.get("/health")
def health(): return {"status":"healthy","service":"user-service"}
