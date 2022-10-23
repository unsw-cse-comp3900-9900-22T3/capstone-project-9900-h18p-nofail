import pymysql

# def connectDb():
#     db = pymysql.connect(host='localhost',
#                          user='root',
#                          password='L69111a555!',
#                          database='sys')
#     return db
def connectDb():
    db = pymysql.connect(host='database-2.cihwwseytivg.ap-southeast-2.rds.amazonaws.com',
                         user='admin',
                         password='liuyiyang',
                         database='sys')
    return db

