from flask import Blueprint , request , jsonify , session
from app import getConn

teamBlue = Blueprint('teamBlue', __name__)

# 获取用户所在当前团队的全部成员信息
@teamBlue.route('/getMember', methods=['GET'])
def getMember():
    print (session)
    head = ('id', 'username', 'email', 'head')
    data = []
    with getConn() as cursor:
        cursor.execute(
            '''
            select ID,USERNAME,EMAIL,HEAD
            from USER where TEAM_ID = "%d"
            ''' % (session['teamId'],))
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
    res = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(res)

# 获取到全部团队信息
@teamBlue.route('/getTeam', methods=['GET'])
def getTeam():
    head = ('id', 'name', 'sum', 'created', 'updated')
    data = []
    with getConn() as cursor:
        cursor.execute('select * from TEAM')
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
    res = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(res)

# 更新用户团队信息
@teamBlue.route('/updateTeam', methods=['POST'])
def updateTeam():
    print (session)
    teamId = request.form.get('teamId', '')
    with getConn() as cursor:
        # 更新用户团队信息
        cursor.execute(
            '''
            update USER set TEAM_ID = "%d" where USERNAME = "%s"
            ''' % (int(teamId),session['username'],))
        
        # 更新团队人数
    res = {
        'status': 1,
        'message': 'success'
    }
    return jsonify(res)

# 添加团队并加入
@teamBlue.route('/addTeam', methods=['POST'])
def addTeam():
    print (session)
    name = request.form.get('name', '')
    with getConn() as cursor:
        # 更新用户团队信息
        cursor.execute('insert ignore into TEAM (NAME) values ("%s")' % (name,))
        cursor.execute(
            '''
            select LAST_INSERT_ID();
            '''
        )
        teamId = cursor.fetchone()[0]
        cursor.execute(
            '''
            update USER set TEAM_ID = "%d" where USERNAME = "%s"
            ''' % (int(teamId),session['username'],))
        
        # 更新团队人数
    res = {
        'status': 1,
        'message': 'success'
    }
    return jsonify(res)