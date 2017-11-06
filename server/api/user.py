from flask import Blueprint , request , jsonify
from app import getConn

userBlue = Blueprint('userBlue', __name__)

@userBlue.route('/sign-up', methods=['POST'])
def signUp():
    json = {
        "status" : 0
    }
    # 获取name值，如果没有默认赋值'aa'
    print (request.form)
    username = request.form.get('username', '')
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    team = request.form.get('team', '')
    with getConn() as cursor:
        cursor.execute('SELECT * FROM USER WHERE EMAIL = "%s"' % (email,))
        if cursor.fetchone():
            json = {
                "status" : 1,
                "content" : "email-existed"
            }
            return jsonify(json)
        cursor.execute('INSERT IGNORE INTO TEAM (NAME) VALUES ("%s")' % (team,))
        cursor.execute('SELECT ID FROM TEAM WHERE NAME = "%s"' % (team,))
        team_id = cursor.fetchone()[0]
        cursor.execute('INSERT INTO USER (USERNAME , EMAIL , PASSWORD , TEAM_ID) VALUES ("%s" ,"%s" ,"%s" , "%d")' % (username,email,password,team_id,))
    return jsonify(json)


@userBlue.route('/sign-in', methods=['POST'])
def signIn():
    json = {
        "status" : 0
    }
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    with getConn() as cursor:
        cursor.execute('SELECT * FROM USER WHERE EMAIL = "%s" AND PASSWORD = "%s"' % (email,password,))
        if not cursor.fetchone():
            json = {
                "status" : 1,
                "content" : "email-pwd-error"
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