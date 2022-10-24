# Store this code in 'app.py' file
from os import path
import sys
# sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
# sys.path.append('..')

from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_cors import CORS
# from flask_mysqldb import MySQL

import pymysql

import DataLayer

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

# db = pymysql.connect(host='localhost',
#                         user='root',
#                         password='12345678',
#                         database='sys')


#######End connect to database#######====================

######Start of Business Layer######======================================================

@app.route('/register', methods =['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'password' in request.json and 'email' in request.json:
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        if DataLayer.Username_Check(username):
            DataLayer.User_Register(username, password, email)
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
        if DataLayer.User_Login(username, password):
            msg = {'status': 'success', 'message': 'You have successfully logged in!'}
        else:
            msg = {'status': 'fail', 'message': 'Username or Password Error!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/recipe/create', methods =['GET', 'POST'])
#recipe_name,recipe_username,description, recipe_style,ingredient,cooking_time,steps,recipe_photo
def create_recipe():
    msg = 'none'
    print(request.json)
    if request.method == 'POST' and 'recipe_name' in request.json and 'recipe_username' in request.json and 'description' in request.json and 'recipe_style' in request.json and 'ingredient' in request.json and 'cooking_time' in request.json and 'steps' in request.json and 'recipe_photo' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        description = request.json['description']
        recipe_style = request.json['recipe_style']
        ingredient = request.json['ingredient']
        cooking_time = int(request.json['cooking_time'])
        steps = request.json['steps']
        recipe_photo = request.json['recipe_photo']
        if DataLayer.Recipe_Insert_Update(str(recipe_name), str(recipe_username), str(description), str(recipe_style), str(ingredient), cooking_time,str(steps), str(recipe_photo)):
            # if DataLayer.Ingredient_Insert(str(ingredient)):
            msg = {'status': 'success', 'message': 'You have successfully created recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Create recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/recipe/update', methods =['PUT'])
# def update_recipe():
#     msg = ''
#     # the recipe changes are not all required
#     if request.method == 'POST':
#             recipe_id = request.json['recipe_id']
#             recipe_name = request.json['recipe_name']
#             recipe_description = request.json['recipe_description']
#             recipe_ingredients = request.json['recipe_ingredients']
#             recipe_steps = request.json['recipe_steps']
#             recipe_image = request.json['recipe_image']
#             DataLayer.Recipe_Update(recipe_id, recipe_name, recipe_description, recipe_ingredients, recipe_steps, recipe_image)
#             msg = {'status': 'success', 'message': 'You have successfully updated a recipe!'}
#     else:
#         msg = {'status': 'fail', 'message': 'Please fill out the form!'}
#     return jsonify(msg)

@app.route('/recipe/delete', methods =['GET', 'POST'])
#recipe_name,recipe_username
def delete_recipe():
    msg = ''
    if request.method == 'POST' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        DataLayer.Recipe_Delete(recipe_name, recipe_username)
        msg = {'status': 'success', 'message': 'You have successfully deleted a recipe!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/recipe/show', methods =['GET'])
#username
def show_recipe():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        username = request.json['username']
        msg = DataLayer.Recipe_Show(username)
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/ingredient/create', methods =['GET', 'POST'])
#ingredient,in_type
def create_ingredient():
    msg = ''
    if request.method == 'POST' and 'ingredient' in request.json and 'in_type' in request.json:
        ingredient = request.json['ingredient']
        in_type = request.json['in_type']
        DataLayer.Ingredient_Insert(ingredient,in_type)
        msg = {'status': 'success', 'message': 'You have successfully created an ingredient!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/follow', methods =['POST'])
#username,follow_username
def follow_user():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'follow_username' in request.json:
        username = request.json['username']
        follow_username = request.json['follow_username']
        DataLayer.User_follow(username,follow_username)
        msg = {'status': 'success', 'message': 'You have successfully followed a user!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/unfollownum', methods =['POST'])
#username,follow_username
def unfollow_user():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'follow_username' in request.json:
        username = request.json['username']
        follow_username = request.json['follow_username']
        DataLayer.User_cancel_follow(username,follow_username)
        msg = {'status': 'success', 'message': 'You have successfully unfollowed a user!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/getfollowingnum', methods =['GET'])
#username
def get_following():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        username = request.json['username']
        msg = DataLayer.User_get_following_number(username)
    return jsonify(msg)

@app.route('/user/getfollower', methods =['GET'])
#username
def get_follower():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        username = request.json['username']
        msg = DataLayer.User_get_following_number(username)
    return jsonify(msg)

@app.route('/user/favrecipe', methods =['POST'])
# username,recipe_name,recipe_username
def fav_recipe():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        DataLayer.User_insert_favour(username,recipe_name,recipe_username)
        msg = {'status': 'success', 'message': 'You have successfully favorited a recipe!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/removefav', methods =['POST'])
# username,favourite_recipe,favourite_name
def remove_fav():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'favourite_recipe' in request.json and 'favourite_name' in request.json:
        username = request.json['username']
        favourite_recipe = request.json['favourite_recipe']
        favourite_name = request.json['favourite_name']
        DataLayer.User_remove_favourite(username,favourite_recipe,favourite_name)
        msg = {'status': 'success', 'message': 'You have successfully removed a favorite recipe!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/getfavrecipe', methods =['GET'])
#username
def get_fav_recipe():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        username = request.json['username']
        msg = DataLayer.User_show_favourite(username)
    return jsonify(msg)

@app.route('/user/getfavrecipenum', methods =['GET'])
#username
def get_fav_recipe_num():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        username = request.json['username']
        msg = DataLayer.User_get_favourite_num(username)
    return jsonify(msg)

@app.route('/recipe/like', methods =['POST'])
#username,recipe_name,recipe_username
def like_recipe():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        DataLayer.Recipe_add_like(username,recipe_name,recipe_username)
        msg = {'status': 'success', 'message': 'You have successfully liked a recipe!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/recipe/unlike', methods =['POST'])
#username,recipe_name,recipe_username
def unlike_recipe():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        DataLayer.Recipe_remove_Like(username,recipe_name,recipe_username)
        msg = {'status': 'success', 'message': 'You have successfully unliked a recipe!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/recipe/getlikenum', methods =['GET'])
#recipe_name,recipe_username
def get_like_num():
    msg = ''
    if request.method == 'GET' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        msg = DataLayer.Recipe_get_like_num(recipe_name,recipe_username)
    return jsonify(msg)

@app.route('/recipe/showcomment', methods =['GET'])
#recipe_name,recipe_username
def show_comment():
    msg = ''
    if request.method == 'GET' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        msg = DataLayer.Recipe_show_comment(recipe_name,recipe_username)
    return jsonify(msg)

@app.route('/comment/recipe', methods =['POST'])
#username,recipe_name,recipe_username,content
def add_comment_recipe():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json and 'content' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        content = request.json['content']
        DataLayer.User_comment_recipe(username,recipe_name,recipe_username,content)
        msg = {'status': 'success', 'message': 'You have successfully added a comment to a recipe!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/comment/user', methods =['POST'])
#username,recipe_name,recipe_username,comment_id,content
def add_comment_to_user():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json and 'comment_id' in request.json and 'content' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        comment_id = request.json['comment_id']
        content = request.json['content']
        DataLayer.User_comment_user(username,recipe_name,recipe_username,comment_id,content)
        msg = {'status': 'success', 'message': 'You have successfully added a comment to a user!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/comment/delete', methods =['POST'])
#comment_id
def delete_comment():
    msg = ''
    if request.method == 'POST' and 'comment_id' in request.json:
        comment_id = request.json['comment_id']
        DataLayer.Comment_delete(comment_id)
        msg = {'status': 'success', 'message': 'You have successfully deleted a comment!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/recipe/getcommentnum', methods =['GET'])
#recipe_name,recipe_username
def get_comment_num():
    msg = ''
    if request.method == 'GET' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        msg = DataLayer.Recipe_get_comment_num(recipe_name,recipe_username)
    return jsonify(msg)

@app.route('/recipe/search', methods =['GET'])
#search_content,difficult='',style_name='',ingredient=''
def search_recipe():
    msg = ''
    if request.method == 'GET' and 'search_content' in request.json:
        search_content = request.json['search_content']
        difficult = request.json['difficult']
        style_name = request.json['style_name']
        ingredient = request.json['ingredient']
        msg = DataLayer.Recipe_search(search_content,difficult,style_name,ingredient)
    return jsonify(msg)

@app.route('/user/search', methods =['GET'])
#search_content
def search_user():
    msg = ''
    if request.method == 'GET' and 'search_content' in request.json:
        search_content = request.json['search_content']
        msg = DataLayer.User_search(search_content)
    return jsonify(msg)



@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({'status': 'success', 'message': 'You have successfully logged out!'})
#######End of Business Layer#######======================================================

#######Datalayer########================================================================

# def User_Register(username, email, password):
#     sql = "INSERT INTO sys.User(Username, Email, Password) \
#             VALUES ('%s', '%s', '%s');" % (username, email, password)
#     insert_cursor = db.cursor()
#     try:
#         insert_cursor.execute(sql)
#         db.commit()
#     except Exception:
#         db.rollback()
#         print("register wrong!!")

# def User_Login(username, password):
#     sql = "SELECT Password FROM sys.User WHERE Username = '%s';" % (username)
#     insert_cursor = db.cursor()
#     return_password = ''
#     try:
#         insert_cursor.execute(sql)
#         return_password = insert_cursor.fetchone()[0]
#     except Exception:
#         db.rollback()
#         print("login wrong!!")
#     if return_password == password:
#         return True
#     else:
#         return False
        
# def Username_Check(username):
#     sql = "SELECT * FROM sys.User WHERE Username = '%s';" % (username)
#     insert_cursor = db.cursor()
#     return_password = ''
#     try:
#         insert_cursor.execute(sql)
#         return_password = insert_cursor.fetchone()[0]
#     except Exception:
#         db.rollback()
#         print("check wrong!!")
#     if return_password == '':
#         return True
#     else:
#         return False

#######End of Datalayer########================================================================


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)