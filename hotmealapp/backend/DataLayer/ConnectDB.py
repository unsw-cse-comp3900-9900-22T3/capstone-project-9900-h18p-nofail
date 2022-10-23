import pymysql

# from flask_mysqldb import MySQL

def connectDb():
    db = pymysql.connect(host='localhost',
                         user='root',
                         password='12345678',
                         database='sys')
    return db

