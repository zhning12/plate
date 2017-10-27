from flask import Blueprint , request , jsonify


infoBlue = Blueprint('infoBlue', __name__)

@infoBlue.route('/info', methods=['POST'])
def add():
    # 获取name值，如果没有默认赋值'aa'
    name = request.form.get('name', 'aa')
    json = {
        "name" : name
    }
    return jsonify(json)


@infoBlue.route('/info', methods=['GET'])
def findAll():
    json = {
        "str" : 'findAll'
    }
    return jsonify(json)


@infoBlue.route('/info/<username>', methods=['GET'])
def find(username="user"):
    json = {
        "username" : username
    }
    return jsonify(json)