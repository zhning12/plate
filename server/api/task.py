from flask import Blueprint, request, jsonify , session
from app import getConn
import json,datetime

taskBlue = Blueprint('taskBlue', __name__)

# 获取用户所在团队的全部任务
@taskBlue.route('/getTeamTask/<int:teamId>', methods=['GET'])
def getTeamTask(teamId):
    head = ('id', 'name', 'deadline', 'finished', 'leader')
    data = []
    with getConn() as cursor:
        cursor.execute(
            '''
            select ID,NAME,DEADLINE,FINISHED,LEADER 
            from TASK where TEAM_ID = "%d"
            ''' % (teamId,))
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
    res = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(res)

# 获取日历需要的用户所在团队的全部任务
@taskBlue.route('/getCalendarTask/<int:teamId>', methods=['GET'])
def getCalendarTask(teamId):
    head = ('id', 'title', 'end' , 'start')
    color = ['#257e4a','#ff9f89','#3a87ad']
    data = []
    with getConn() as cursor:
        cursor.execute(
            '''
            select ID,NAME,DEADLINE,CREATED 
            from TASK where TEAM_ID = "%d"
            ''' % (teamId,))
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
    for item in data:
        item['url'] = '/detail/' + str(item['id'])
        item['color'] = color[ item['id']%3 ]
    data = json.loads(json.dumps(data, default=calendar_handler))
    res = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(res)

# 获取我发起的任务
@taskBlue.route('/getSendTask/<username>/<int:teamId>', methods=['GET'])
def getSendTask(username,teamId):
    head = ('id', 'name', 'deadline', 'finished', 'leader')
    data = []
    with getConn() as cursor:
        cursor.execute(
            '''
            select ID,NAME,DEADLINE,FINISHED,LEADER 
            from TASK where LEADER = "%s" and TEAM_ID = "%d"
            ''' % (username,teamId,))
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
    data = json.loads(json.dumps(data, default=datetime_handler))
    res = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(res)

# 获取我负责的任务
@taskBlue.route('/getReceiveTask/<username>/<int:teamId>', methods=['GET'])
def getReceiveTask(username,teamId):
    head = ('id', 'name', 'deadline', 'finished', 'leader')
    data = []
    with getConn() as cursor:
        cursor.execute(
            '''
            select TASK.ID,NAME,DEADLINE,FINISHED,LEADER from
            (select TASK_ID from USER_TASK where USERNAME = "%s") as 
            TEM join TASK on TEM.TASK_ID = TASK.ID where TEAM_ID = "%d"
            ''' % (username,teamId,))
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
    data = json.loads(json.dumps(data, default=datetime_handler))
    res = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(res)

# 添加任务
@taskBlue.route('/addTask', methods=['POST'])
def addTask():
    print (request.form)
    teamId = int(request.form.get('teamId', ''))
    username = request.form.get('username', '')
    name = request.form.get('name', '')
    description = request.form.get('description', '')
    addedUrl = request.form.get('addedUrl', '')
    deadline = request.form.get('deadline', '')
    members = request.form.get('members', '')
    with getConn() as cursor:
        cursor.execute(
            '''
            insert into TASK 
            (NAME, DESCRIPTION,ADDED_URL,DEADLINE,LEADER,TEAM_ID ) 
            values ("%s", "%s","%s","%s","%s","%d")
            ''' % (name,description,addedUrl,deadline,username,teamId,))
        cursor.execute(
            '''
            select LAST_INSERT_ID();
            '''
        )
        taskId = cursor.fetchone()[0]
        members = members.split(',')
        for member in members:
            cursor.execute(
                '''
                insert into USER_TASK 
                ( USERNAME , TASK_ID ) 
                values ("%s", "%d")
                '''% (member,int(taskId),)
            )
    res = {
        "status": 1,
        'message': 'success'
    }
    return jsonify(res)

# 获取单个任务详情
@taskBlue.route('/getTask/<int:taskId>', methods=['GET'])
def getTask(taskId=0):
    head = ('id', 'name','description', 'deadline', 'finished', 'leader','created','updated')
    data = {}
    with getConn() as cursor:
        cursor.execute(
            '''
            select ID,NAME,DESCRIPTION,DEADLINE,FINISHED,LEADER,CREATED,UPDATED
            from TASK where ID = "%d"
            ''' % (taskId,))
        data = dict(zip(head, cursor.fetchone()))
        data = json.loads(json.dumps(data, default=datetime_handler))
        # 处理负责人员
        members = []
        cursor.execute(
            '''
            select USERNAME from USER_TASK where TASK_ID = "%d"
            ''' % (taskId,))
        for item in cursor.fetchall():
            members.append(item[0])
        data['member'] = members

        # 处理附件信息
        cursor.execute(
            '''
            select ADDED_URL from TASK where ID = "%d"
            ''' % (taskId,))
        addedUrls = cursor.fetchone()[0].split(',')
        for item in cursor.fetchall():
            members.append(item[0])
        data['addedUrl'] = addedUrls

    res = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(res)

# 更新用户团队信息
@taskBlue.route('/updateState', methods=['POST'])
def updateState():
    taskId = int(request.form.get('taskId'))
    finished = int(request.form.get('finished'))
    with getConn() as cursor:
        # 更新用户团队信息
        cursor.execute(
            '''
            update TASK set FINISHED = "%d" where ID = "%d"
            ''' % (finished,taskId,))
    res = {
        'status': 1,
        'message': 'success'
    }
    return jsonify(res)

def datetime_handler(x):
    if isinstance(x, datetime.datetime) or isinstance(x, datetime.date):
        return x.isoformat()
    
    raise TypeError("Unknown type")

def calendar_handler(x):
    if isinstance(x, datetime.datetime) or isinstance(x, datetime.date):
        return x.strftime("%Y-%m-%d")

    raise TypeError("Unknown type")