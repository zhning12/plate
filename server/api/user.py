from flask import Blueprint , request , jsonify , session
from app import getConn
import json,datetime

userBlue = Blueprint('userBlue', __name__)

@userBlue.route('/signUp', methods=['POST'])
def signUp():
    # 获取name值，如果没有默认赋值'aa'
    print (request.form)
    username = request.form.get('username', '')
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    avatar = request.form.get('avatar', '')
    team = request.form.get('team', '')
    with getConn() as cursor:
        cursor.execute('select * from USER where EMAIL = "%s"' % (email,))
        if cursor.fetchone():
            res = {
                "status" : 0,
                "message" : "email-existed-error"
            }
            return jsonify(res)
        cursor.execute('select * from USER where USERNAME = "%s"' % (username,))
        if cursor.fetchone():
            res = {
                "status" : 0,
                "message" : "username-existed-error"
            }
            return jsonify(res)
        cursor.execute('insert ignore into TEAM (NAME) values ("%s")' % (team,))
        # 更新团队人数
        cursor.execute('select ID from TEAM where NAME = "%s"' % (team,))
        teamId = cursor.fetchone()[0]
        cursor.execute('insert into USER (USERNAME , EMAIL , PASSWORD , AVATAR , TEAM_ID) values ("%s" ,"%s" ,"%s" ,"%s" ,"%d")' % (username,email,password,avatar,teamId,))
    # 获取用户信息
    res = getUser(email,password)
    return jsonify(res)


@userBlue.route('/signIn', methods=['POST'])
def signIn():
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    res = getUser(email,password)
    print (res)
    return jsonify(res)

def getUser(email,password):
    head = ('id','username', 'email','avatar', 'teamId', 'created', 'updated','teamName')
    with getConn() as cursor:
        cursor.execute(
            '''
            select USER.ID,USERNAME,EMAIL,AVATAR,TEAM_ID,USER.CREATED,USER.UPDATED,TEAM.NAME
            from USER join TEAM on USER.TEAM_ID = TEAM.ID 
            where EMAIL = "%s" and PASSWORD = "%s"
            ''' % (email,password,))
        user = cursor.fetchone()
        if not user:
            res = {
                "status" : 0,
                "message" : "email-pwd-error"
            }
        else:
            userDict = dict(zip(head, user))
            data = json.loads(json.dumps(dict(userDict), default=datetime_handler))
            res = {
                "status" : 1,
                "message" : "success",
                "data" : data
            }
    return res

def datetime_handler(x):
    if isinstance(x, datetime.datetime) or isinstance(x, datetime.date):
        return x.isoformat()
    
    raise TypeError("Unknown type")