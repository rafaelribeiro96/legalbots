

# from flask import Flask, jsonify, request, abort
# import jwt
# from sqlalchemy import create_engine
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
# from datetime import datetime
# from sqlalchemy_utils import database_exists, create_database

# def authorize_request():
#     getter = UserLegalBots.query.all()
#     data = user_legalbots_schema.dump(getter)
#     authorization = request.headers.get("Authorization")
#     if not authorization:
#         return abort(401, {"error": "O usuário precisa estar logado"})
#     token = authorization.replace("Bearer ", "")
#     user = next((user for user in data if user.get("token") == token), None)
#     if not user:
#         return abort(401, {"error": "O usuário precisa estar logado"})

#     request.user = user
#     return None


# url_config = 'mysql+pymysql://root:123456@localhost:3306/users_legalbots'

# engine = create_engine(url_config)
# if not database_exists(engine.url):
#     create_database(engine.url)


# app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = url_config
# db = SQLAlchemy(app)
# ma = Marshmallow(app)


# class userLegalbotsSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name', 'email', 'hash', 'token', 'register_date')

# user_legalbot_schema = userLegalbotsSchema()
# user_legalbots_schema = userLegalbotsSchema(many=True)

# class UserLegalBots(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(255))
#     email = db.Column(db.String(255))
#     hash = db.Column(db.String(255))
#     token = db.Column(db.String(255))
#     register_date = db.Column(db.DateTime)

#     def __init__(self, user):
#         self.name = user["name"]
#         self.email = user["email"]
#         self.hash = user["hash"]
#         self.token = user["token"]
#         self.register_date = datetime.now()


# def validate_fields(email, password):
#     if not email or not password:
#         return abort(422, description="email and password is required")
    
# def validate_email_pass(email, password):
#     try:
#         getter = UserLegalBots.query.all()
#         data = user_legalbots_schema.dump(getter)
#         user = list(filter(lambda db_field: db_field["email"] == email, data))
#         if not user:
#             return abort(401, description="invalid email or password")
#         jwt.decode(user[0]["hash"], password, algorithms="HS256")
#         return user[0]
#     except:
#         return abort(401, description="invalid email or password")

# def validate_user_register(name, email):
#     getter = UserLegalBots.query.all()
#     data = user_legalbots_schema.dump(getter)
#     user = list(filter(lambda db_field: db_field["email"] == email or db_field["name"] == name, data))    
#     if user:
#         return abort(409, description="user already exists")

# def create_user(name, email, password):
#     user = {
#       "name": name,
#       "email": email,
#       "hash": jwt.encode({"some": "payload"}, password, algorithm="HS256"),
#       "token": jwt.encode({"some": "payload"}, f'({name}, {email})', algorithm="HS256")
#     }
#     return user


# @app.route("/", methods=["GET"])
# def index():
#     authorize_request()
#     return jsonify({
#         "name": request.user["name"],
#         "email": request.user["email"],
#     }), 200

# @app.route("/login", methods=["POST"])
# def login():
#     if request.method=="POST":
#         email = request.json.get("email")
#         password = request.json.get("password")
#         validate_fields(email, password)
#         user = validate_email_pass(email, password)
#         result = {
#             "id": user["id"],
#             "name": user["name"],
#             "email": user["email"],
#             "token": user["token"]
#                   }
#         request.headers["authorization"] = "Bearer " + user["token"]
#         return jsonify(result)


# @app.route("/register", methods=["POST"])
# def register():
#     if request.method=="POST":
#         name = request.json.get("name")
#         email = request.json.get("email")
#         password = request.json.get("password")
#         validate_fields(email, password)
#         validate_user_register(name, email)
#         user = create_user(name, email, password)
#         new_user = UserLegalBots(user)
#         db.session.add(new_user)
#         db.session.commit()
#         result = {
#             "id": new_user.id,
#             "name": new_user.name,
#             "email": new_user.email,
#             "token": new_user.token
#                   }
#         return user_legalbot_schema.jsonify(result)
