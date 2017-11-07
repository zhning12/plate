import pymysql
from .config import DB

def getConn():
    conn = pymysql.connect(host=DB['host'], port=DB['port'],
                user=DB['user'], passwd=DB['passwd'], db=DB['db'], charset=DB['charset'])
    return conn