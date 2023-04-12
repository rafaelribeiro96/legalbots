from db_class import app, UserLegalBots, db, user_legalbot_schema
from validations import authorize_request, validate_fields, validate_email_pass, validate_user_register, create_user
from flask import request, jsonify, make_response

@app.route("/", methods=["GET"])
def index():
    authorize_request()
    return jsonify({
        "name": request.user["name"],
        "email": request.user["email"],
    }), 200


@app.route("/login", methods=["POST"])
def login():
    if request.method=="POST":
        email = request.json.get("email")
        password = request.json.get("password")
        validate_fields(email, password)
        user = validate_email_pass(email, password)
        result = {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "token": user["token"]
                  }
        # response = make_response(jsonify(result))
        # response.headers["Authorization"] = user["token"]
        return jsonify(result)


@app.route("/register", methods=["POST"])
def register():
    if request.method=="POST":
        name = request.json.get("name")
        email = request.json.get("email")
        password = request.json.get("password")
        validate_fields(email, password)
        validate_user_register(name, email)
        user = create_user(name, email, password)
        new_user = UserLegalBots(user)
        db.session.add(new_user)
        db.session.commit()
        result = {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "token": new_user.token
                  }
        return user_legalbot_schema.jsonify(result)

     
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=3000)


