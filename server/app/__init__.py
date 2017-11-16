from flask import Flask
from flask_cors import CORS
from .config import SERVER, DB
from .model import Model
from .common import getConn
import api

def create():

    conn = getConn()
    with conn as cursor:
        for item in Model:
            cursor.execute(item)
        print("create table finished!")

    app = Flask(__name__)
    CORS(app)
    app.secret_key = SERVER['secretKey'] 
    app.register_blueprint(api.userBlue)
    app.register_blueprint(api.infoBlue)
    app.register_blueprint(api.taskBlue)
    app.register_blueprint(api.teamBlue)
    app.run(host=SERVER['host'], port=SERVER['port'], debug=SERVER['debug'])