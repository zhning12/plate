from flask import Flask
from flask_cors import CORS
from .config import SERVER, DB
from .model import Model
from .common import getConn
import MySQLdb
import api
import sys

def create():

    conn = MySQLdb.connect(host=DB['host'], port=DB['port'],
                           user=DB['user'], passwd=DB['passwd'], db=DB['db'], charset=DB['charset'])
    with conn as cursor:
        for item in Model:
            cursor.execute(item)
        print("create table finished!",file=sys.stdout)

    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api.userBlue)
    app.register_blueprint(api.infoBlue)
    app.run(host=SERVER['host'], port=SERVER['port'], debug=SERVER['debug'])