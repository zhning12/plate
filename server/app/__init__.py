from flask import Flask
from flask_cors import CORS
from .config import SERVER, DB
from .model import Model
from .common import getConn
import MySQLdb
import api

def create():

    conn = getConn()
    with conn as cursor:
        for item in Model:
            cursor.execute(item)
        print("create table finished!")

    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api.userBlue)
    app.register_blueprint(api.infoBlue)
    app.run(host=SERVER['host'], port=SERVER['port'], debug=SERVER['debug'])