from flask import Blueprint, request, jsonify , session
from app import getConn

taskBlue = Blueprint('taskBlue', __name__)

# 获取用户所在团队的全部任务
@taskBlue.route('/getAllTask/<email>', methods=['GET'])
def getAllTask(email=""):
    head = ('name', 'deadline', 'finished', 'leader')
    data = []
    with getConn() as cursor:
        cursor.execute(
            '''
            select NAME,DEADLINE,FINISHED,USERNAME from 
            (select NAME,DEADLINE,FINISHED,LEADER_ID from 
            TASK join USER on TASK.TEAM_ID = USER.TEAM_ID 
            where EMAIL = "%s") as 
            TEM join USER on TEM.LEADER_ID = USER.ID
            ''' % (email,))
        for item in cursor.fetchall():
            data.append(dict(zip(head, item)))
    json = {
        'status': 1,
        'message': 'success',
        'data': data
    }
    return jsonify(json)


@taskBlue.route('/getSendTask/<email>', methods=['GET'])
def getStartTask(email=""):
    json = {
        "status": 1
    }
    return jsonify(json)


@taskBlue.route('/getReceiveTask/<email>', methods=['GET'])
def getReceiveTask(email=""):
    json = {
        "status": 1
    }
    return jsonify(json)

@taskBlue.route('/addTask', methods=['POST'])
def addTask():
    print (session)
    json = {
        "status": 1
    }
    return jsonify(json)