import pymysql

def connectDb():
    db = pymysql.connect(host='database-2.cihwwseytivg.ap-southeast-2.rds.amazonaws.com',
                         user='admin',
                         password='liuyiyang',
                         database='sys')
    return db

