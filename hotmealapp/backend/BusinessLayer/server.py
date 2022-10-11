# Store this code in 'app.py' file

from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
from flask_cors import CORS
import json
import MySQLdb.cursors
import re

# from DataLayer import DataLayer

import pymysql



app = Flask(__name__)
CORS(app)

#######connect to database#######====================

# app.secret_key = 'your secret key'

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = '12345678'
# app.config['MYSQL_DB'] = 'sys'

# mysql = MySQL(app)
# db = mysql.connection

db = pymysql.connect(host='localhost',
                        user='root',
                        password='12345678',
                        database='sys')


#######End connect to database#######====================

######Start of Business Layer######======================================================

@app.route('/register', methods =['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'password' in request.json and 'email' in request.json:
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        if Username_Check(username):
            User_Register(username, email, password)
            msg = {'status': 'success', 'message': 'You have successfully registered!'}
        else:
            msg = {'status': 'fail', 'message': 'Username already exists!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/login', methods =['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'password' in request.json:
        username = request.json['username']
        password = request.json['password']
        if User_Login(username, password):
            msg = {'status': 'success', 'message': 'You have successfully logged in!'}
        else:
            msg = {'status': 'fail', 'message': 'Username or Password Error!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({'status': 'success', 'message': 'You have successfully logged out!'})
#######End of Business Layer#######======================================================

#######Datalayer########================================================================

def User_Register(username, email, password):
    sql = "INSERT INTO sys.User(Username, Email, Password) \
            VALUES ('%s', '%s', '%s');" % (username, email, password)
    insert_cursor = db.cursor()
    try:
        insert_cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("register wrong!!")

def User_Login(username, password):
    sql = "SELECT Password FROM sys.User WHERE Username = '%s';" % (username)
    insert_cursor = db.cursor()
    return_password = ''
    try:
        insert_cursor.execute(sql)
        return_password = insert_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("login wrong!!")
    if return_password == password:
        return True
    else:
        return False
        
def Username_Check(username):
    sql = "SELECT * FROM sys.User WHERE Username = '%s';" % (username)
    insert_cursor = db.cursor()
    return_password = ''
    try:
        insert_cursor.execute(sql)
        return_password = insert_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("check wrong!!")
    if return_password == '':
        return True
    else:
        return False

#######End of Datalayer########================================================================


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)