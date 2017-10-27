from flask import Blueprint , request , jsonify
from app import getConn

userBlue = Blueprint('userBlue', __name__)

@userBlue.route('/user', methods=['POST'])
def add():
    # 获取name值，如果没有默认赋值'aa'
    print (request.form)
    name = request.form.get('name', 'aa')
    with getConn() as cursor:
        cursor.execute('INSERT INTO USER (NAME , AGE) VALUES ("%s" , "%d")' % (name,18,))
    json = {
        "name" : name
    }
    return jsonify(json)


@userBlue.route('/user', methods=['GET'])
def findAll():
    with getConn() as cursor:
        cursor.execute('SELECT * FROM USER')
        for i in range(cursor.rowcount):
            print (cursor.fetchone())
    json = {
        "str" : 'findAll'
    }
    return jsonify(json)


@userBlue.route('/user/<username>', methods=['GET'])
def find(username="user"):
    with getConn() as cursor:
        cursor.execute('SELECT * FROM USER WHERE NAME = "%s"' % (username,))
        for i in range(cursor.rowcount):
            print (cursor.fetchone())
    json = {
        "username" : username
    }
    return jsonify(json)