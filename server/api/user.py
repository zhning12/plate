from flask import Blueprint , request , jsonify , session
from app import getConn
import json,datetime
from passlib.hash import sha256_crypt

userBlue = Blueprint('userBlue', __name__)

@userBlue.route('/signUp', methods=['POST'])
def signUp():
    # 获取name值，如果没有默认赋值'aa'
    print (request.form)
    username = request.form.get('username', '')
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    hashPassword = sha256_crypt.encrypt(password)
    avatar = request.form.get('avatar', '')
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
        cursor.execute('insert into USER (USERNAME , EMAIL , PASSWORD , AVATAR ) values ("%s" ,"%s" ,"%s" ,"%s")' % (username,email,hashPassword,avatar,))
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
            select PASSWORD from USER where EMAIL = "%s"
            ''' % (email,))
        hashed = cursor.fetchone()[0]
        if sha256_crypt.verify(password, hashed):
            cursor.execute(
                '''
                select USER.ID,USERNAME,EMAIL,AVATAR,TEAM_ID,USER.CREATED,USER.UPDATED,TEAM.NAME
                from USER left join TEAM on USER.TEAM_ID = TEAM.ID 
                where EMAIL = "%s"
                ''' % (email,))
            user = cursor.fetchone()
            userDict = dict(zip(head, user))
            data = json.loads(json.dumps(dict(userDict), default=datetime_handler))
            res = {
                "status" : 1,
                "message" : "success",
                "data" : data
            }
        else:
            res = {
                "status" : 0,
                "message" : "email-pwd-error"
            }
    return res

def datetime_handler(x):
    if isinstance(x, datetime.datetime) or isinstance(x, datetime.date):
        return x.isoformat()
    
    raise TypeError("Unknown type")