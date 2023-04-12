from flask import Flask
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
from sqlalchemy_utils import database_exists, create_database


url_config = 'mysql+pymysql://root:123456@localhost:3306/users_legalbots'
engine = create_engine(url_config)
if not database_exists(engine.url):
    create_database(engine.url)
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = url_config
db = SQLAlchemy(app)
ma = Marshmallow(app)


class userLegalbotsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'hash', 'token', 'register_date')

user_legalbot_schema = userLegalbotsSchema()
user_legalbots_schema = userLegalbotsSchema(many=True)

class UserLegalBots(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    hash = db.Column(db.String(255))
    token = db.Column(db.String(255))
    register_date = db.Column(db.DateTime)

    def __init__(self, user):
        self.name = user["name"]
        self.email = user["email"]
        self.hash = user["hash"]
        self.token = user["token"]
        self.register_date = datetime.now()
