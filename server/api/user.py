from flask import Blueprint , request , jsonify
from app import getConn

userBlue = Blueprint('userBlue', __name__)

@userBlue.route('/signUp', methods=['POST'])
def signUp():
    json = {
        "status" : 1,
        "message" : "success"
    }
    # 获取name值，如果没有默认赋值'aa'
    print (request.form)
    username = request.form.get('username', '')
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    team = request.form.get('team', '')
    with getConn() as cursor:
        cursor.execute('select * from USER where EMAIL = "%s"' % (email,))
        if cursor.fetchone():
            json = {
                "status" : 0,
                "message" : "email-existed-error"
            }
            return jsonify(json)
        cursor.execute('insert ignore into TEAM (NAME) values ("%s")' % (team,))
        cursor.execute('select ID from TEAM where NAME = "%s"' % (team,))
        teamId = cursor.fetchone()[0]
        cursor.execute('insert into USER (USERNAME , EMAIL , PASSWORD , TEAM_ID) values ("%s" ,"%s" ,"%s" , "%d")' % (username,email,password,teamId,))
    return jsonify(json)


@userBlue.route('/signIn', methods=['POST'])
def signIn():
    json = {
        "status" : 1,
        "message" : "success"
    }
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    with getConn() as cursor:
        cursor.execute('select * from USER where EMAIL = "%s" and PASSWORD = "%s"' % (email,password,))
        if not cursor.fetchone():
            json = {
                "status" : 0,
                "message" : "email-pwd-error"
            }
    return jsonify(json)