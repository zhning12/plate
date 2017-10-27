import MySQLdb
from .config import DB

def getConn():
    conn = MySQLdb.connect(host=DB['host'], port=DB['port'],
                user=DB['user'], passwd=DB['passwd'], db=DB['db'], charset=DB['charset'])
    return conn