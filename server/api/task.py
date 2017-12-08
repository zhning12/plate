from flask import Blueprint, request, jsonify , session
from app import getConn
import json

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

# 获取我发起的任务
@taskBlue.route('/getSendTask/username', methods=['GET'])
def getSendTask(username):
    head = ('id', 'name', 'deadline', 'finished', 'leader')
    data = []
    with getConn() as cursor:
        cursor.execute(
            '''
            select ID,NAME,DEADLINE,FINISHED,LEADER 
            from TASK where LEADER = "%s"
            ''' % (username,))
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
    res = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(res)

# 获取我负责的任务
@taskBlue.route('/getReceiveTask/username', methods=['GET'])
def getReceiveTask():
    head = ('id', 'name', 'deadline', 'finished', 'leader')
    data = []
    with getConn() as cursor:
        cursor.execute(
            '''
            select TASK.ID,NAME,DEADLINE,FINISHED,LEADER from
            (select TASK_ID from USER_TASK where USERNAME = "%s") as 
            TEM join TASK on TEM.TASK_ID = TASK.ID
            ''' % (username,))
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
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
    teamId = request.form.get('teamId', '')
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
            ''' % (name,description,addedUrl,deadline,username,int(teamId),))
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
            ''' % (int(taskId),))
        data = dict(zip(head, cursor.fetchone()))

        # 处理负责人员
        members = []
        cursor.execute(
            '''
            select USERNAME from USER_TASK where TASK_ID = "%d"
            ''' % (int(taskId),))
        for item in cursor.fetchall():
            members.append(item[0])
        data['member'] = members

        # 处理附件信息
        cursor.execute(
            '''
            select ADDED_URL from TASK where ID = "%d"
            ''' % (int(taskId),))
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