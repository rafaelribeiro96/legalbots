from db_class import UserLegalBots, user_legalbots_schema
from flask import request, abort
import jwt


def authorize_request():
    getter = UserLegalBots.query.all()
    data = user_legalbots_schema.dump(getter)
    authorization = request.headers.get("Authorization")
    if not authorization:
        return abort(401, {"error": "O usuário precisa estar logado"})
    token = authorization.replace("Bearer ", "")
    user = next((user for user in data if user.get("token") == token), None)
    if not user:
        return abort(401, {"error": "O usuário precisa estar logado"})

    request.user = user
    return None


def validate_fields(email, password):
    if not email or not password:
        return abort(422, description="email and password is required")
    
def validate_email_pass(email, password):
    try:
        getter = UserLegalBots.query.all()
        data = user_legalbots_schema.dump(getter)
        user = list(filter(lambda db_field: db_field["email"] == email, data))
        if not user:
            return abort(401, description="invalid email or password")
        jwt.decode(user[0]["hash"], password, algorithms="HS256")
        return user[0]
    except:
        return abort(401, description="invalid email or password")

def validate_user_register(name, email):
    getter = UserLegalBots.query.all()
    data = user_legalbots_schema.dump(getter)
    user = list(filter(lambda db_field: db_field["email"] == email or db_field["name"] == name, data))    
    if user:
        return abort(409, description="user already exists")

def create_user(name, email, password):
    user = {
      "name": name,
      "email": email,
      "hash": jwt.encode({"some": "payload"}, password, algorithm="HS256"),
      "token": jwt.encode({"some": "payload"}, f'({name}, {email})', algorithm="HS256")
    }
    return user
