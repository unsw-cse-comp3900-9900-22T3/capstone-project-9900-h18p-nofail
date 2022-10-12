# Store this code in 'app.py' file

from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_cors import CORS


# from DataLayer import DataLayer

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

#######End connect to database#######====================

######Start of Business Layer######======================================================

@app.route('/register', methods =['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'password' in request.json and 'email' in request.json:
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        if username != 'kk':
            print(username, email, password)
            msg = {'status': 'success', 'message': 'You have successfully registered!'}
        if username=='kk':
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
        if username=='kk' and password=='kk':
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

#######End of Datalayer########================================================================


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)