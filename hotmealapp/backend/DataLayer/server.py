# Store this code in 'app.py' file
import http
from os import path
import sys
# sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
# sys.path.append('..')

from flask import Flask, jsonify, render_template, request, redirect, url_for, session, Blueprint, Response
from flask_cors import CORS, cross_origin
import json

import pymysql

import DataLayer

app = Flask(__name__)
# app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"*": {"origins": "*"}})

# class MyResponse(Response):
#     def __init__(self, response=None, **kwargs):
#         kwargs['headers'] = ''
#         headers = kwargs.get('headers')
# build = Blueprint("build", __name__)
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
headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
    }

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
    print(request)
    print(request.json)
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

# @cross_origin(supports_credentials=True)
@app.route('/recipe/create', methods =['GET','POST'])
# @cross_origin()
#recipe_name,recipe_username,description, recipe_style,ingredient,cooking_time,steps,recipe_photo
def create_recipe():
    
    msg = 'none'
    print(request)
    print(request.json)
    if 'recipe_name' in request.json :
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        description = request.json['description']
        recipe_style = request.json['recipe_style']
        ingredient = request.json['ingredient']
        # make "{"Egg": ["qwe", "ewq", "tre"], "meat": ["beef", "chicken", "pork"]}" into "qwe;ewq;tre;beef;chicken;pork;"
        str_ingredient = ""
        for key in ingredient:
            ingredient[key] = ';'.join(ingredient[key]) # join the list into string
            str_ingredient += ingredient[key] + ';'
        for key in ingredient:
            in_type = key
            for i in ingredient[key].split(';'):
                if i != '':
                    if DataLayer.Ingredient_Insert(i, in_type):
                        print('Ingredient Insert Success')
                    else:
                        print('Ingredient Insert Fail')
        cooking_time = int(request.json['cooking_time'])
        steps = request.json['steps']
        # make "["qwe","ewq","tre"]" into "qwe,ewq,tre"
        str_steps = ""
        for step in steps:
            str_steps += step + ','
        recipe_photo_directory = request.json['recipe_photo']

        #change mac directory into json format
        recipe_photo_directory = recipe_photo_directory.replace("\\","/")
        print("recipe_photo_directory: ",recipe_photo_directory)

        if DataLayer.Recipe_Insert_Update(str(recipe_name), str(recipe_username), str(description), str(recipe_style), str(str_ingredient), cooking_time,str(str_steps), str(recipe_photo_directory)):
            msg = {'status': 'success', 'message': 'You have successfully created a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Create recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg),headers

@app.route('/recipe/update', methods =['PUT'])
def update_recipe():
    msg = ''
    print(request)
    print(request.json)
    if 'recipe_name' in request.json :
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        description = request.json['description']
        recipe_style = request.json['recipe_style']
        ingredient = request.json['ingredient']
        # make "{"Egg": ["qwe", "ewq", "tre"], "meat": ["beef", "chicken", "pork"]}" into "qwe,ewq,tre,beef,chicken,pork"
        str_ingredient = ""
        for key in ingredient:
            ingredient[key] = ';'.join(ingredient[key])
            str_ingredient += ingredient[key] + ';'

        for key in ingredient:
            in_type = key
            for i in ingredient[key].split(';'):
                if i != '':
                    if DataLayer.Ingredient_Insert(i, in_type):
                        print('Ingredient Insert Success')
                    else:
                        print('Ingredient Insert Fail')

        # print str_ingredient
        print("ingredient string: ",str_ingredient)
        cooking_time = int(request.json['cooking_time'])
        steps = request.json['steps']
        # make "["qwe","ewq","tre"]" into "qwe,ewq,tre"
        str_steps = ""
        for step in steps:
            str_steps += step + ','
        recipe_photo_directory = request.json['recipe_photo']
        #change mac directory into json format
        recipe_photo_directory = recipe_photo_directory.replace("\\","/")
        print("recipe_photo_directory: ",recipe_photo_directory)
        if DataLayer.Recipe_Insert_Update(str(recipe_name), str(recipe_username), str(description), str(recipe_style), str(str_ingredient), cooking_time,str(str_steps), str(recipe_photo_directory)):
            msg = {'status': 'success', 'message': 'You have successfully updated a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Update recipe failed!'}
    return jsonify(msg)

@app.route('/recipe/delete', methods =['DELETE'])
def delete_recipe():
    msg = ''
    print(request)
    print(request.json)
    if 'recipe_name' in request.json :
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        if DataLayer.Recipe_Delete(str(recipe_name), str(recipe_username)):
            msg = {'status': 'success', 'message': 'You have successfully deleted a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Delete recipe failed!'}
    return jsonify(msg)

@app.route('/recipe/showlist', methods =['GET'])
#username
def show_recipe():
    msg = ''
    if request.method == 'GET' and 'recipe_username' in request.json:
        recipe_username = request.json['recipe_username']
        re_lists = DataLayer.Recipe_Show(recipe_username)
        if re_lists:
            re_lists=list(re_lists) #convert tuple into list
            for i in range(len(re_lists)):
                re_lists[i] = {"recipe_name": re_lists[i][0], "recipe_username": re_lists[i][1], "recipe_style": re_lists[i][2], "ingredient": re_lists[i][3], "cooking_time": re_lists[i][4], "steps": re_lists[i][5], "recipe_photo": re_lists[i][6], "description": re_lists[i][7]}
            msg = {'status': 'success', 'message': 'You have successfully get the recipe list!', 'recipe_list': re_lists}
        else:
            msg = {'status': 'fail', 'message': 'The user has no recipe!'}
    return jsonify(msg)

@app.route('/recipe/showone', methods =['GET'])  
#recipe_name,recipe_username
def show_one_recipe():
    msg = ''
    if request.method == 'GET' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        re = DataLayer.Recipe_show_one(recipe_name, recipe_username)
        if re:
            re=list(re) #convert tuple into list
            re = {"recipe_name": re[0], "recipe_username": re[1], "recipe_style": re[2], "ingredient": re[3], "cooking_time": re[4], "steps": re[5], "recipe_photo": re[6], "description": re[7]}
            msg = {'status': 'success', 'message': 'You have successfully got the recipe!', 'recipe': re}
        else:
            msg = {'status': 'fail', 'message': 'The recipe does not exist!'}
    return jsonify(msg)

@app.route('/ingredient/insert', methods =['GET', 'POST'])
#ingredient,in_type
def insert_ingredient():
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
    if request.method == 'POST' and 'from_username' in request.json and 'to_username' in request.json:
        username = request.json['from_username']
        follow_username = request.json['to_username']
        if DataLayer.User_follow(username,follow_username):
            msg = {'status': 'success', 'message': 'You have successfully followed a user!'}
        else:
            msg = {'status': 'fail', 'message': 'Follow user failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/unfollow', methods =['POST'])
#username,follow_username
def unfollow_user():
    msg = ''
    if request.method == 'POST' and 'from_username' in request.json and 'to_username' in request.json:
        username = request.json['from_username']
        follow_username = request.json['to_username']
        if DataLayer.User_cancel_follow(username,follow_username):
            msg = {'status': 'success', 'message': 'You have successfully unfollowed a user!'}
        else:
            msg = {'status': 'fail', 'message': 'You have not followed this user!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/getfollowernum', methods =['GET'])
#username,follow_username
def getfollowernum():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        
        username = request.json['username']
        num = DataLayer.User_get_follower_number(username)
        if num:
            msg = {'status': 'success', 'message': 'You have successfully got the number of followers!','follower_num':num}
        else:
            msg = {'status': 'fail', 'message': 'Get number of followers failed!'}
    return jsonify(msg)

@app.route('/user/getfollowingnum', methods =['GET'])
#username
#backup_1
def get_following():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        username = request.json['username']
        num = DataLayer.User_get_following_number(username)
        if num:
            msg = {'status': 'success', 'message': 'You have successfully got the number of following!','following_num':num}
        else:
            msg = {'status': 'fail', 'message': 'Get number of following failed!'}
    return jsonify(msg)



@app.route('/user/favrecipe', methods =['POST'])
# username,recipe_name,recipe_username
def fav_recipe():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        #backup_3
        if DataLayer.User_insert_favour(username,recipe_name,recipe_username):
            msg = {'status': 'success', 'message': 'You have successfully favorited a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Favorite recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/getfavlist', methods =['GET'])
# username
def fav_list():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        username = request.json['username']
        favlist = DataLayer.User_show_favourite(username)
        favlist = list(favlist)
        for i in range(len(favlist)):
            favlist[i] = {"recipe_id": favlist[i][0], "recipe_name": favlist[i][1], "recipe_username": favlist[i][2], "recipe_style": favlist[i][3], "ingredient": favlist[i][4], "cooking_time": favlist[i][5], "steps": favlist[i][6], "recipe_photo": favlist[i][7], "description": favlist[i][8]}
        if favlist:
            msg = {'status': 'success', 'message': 'You have successfully got your favorite list!','fav_list':favlist}
        else:
            msg = {'status': 'fail', 'message': 'Get favorite list failed!'}
    return jsonify(msg)

@app.route('/user/unfavrecipe', methods =['POST'])
# username,recipe_name,recipe_username
def remove_fav():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        if DataLayer.User_remove_favourite(username,recipe_name,recipe_username):
            msg = {'status': 'success', 'message': 'You have successfully removed a favorite recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Remove favorite recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/getfavrecipenum', methods =['GET'])
#username
# backup_1
def get_fav_recipe_num():
    msg = ''
    if request.method == 'GET' and 'username' in request.json:
        username = request.json['username']
        #backup_2
        fav_num = DataLayer.User_get_favourite_num(username)
        msg = {'status': 'success', 'message': 'You have successfully got the number of favorite recipes!','fav_num':fav_num}
    return jsonify(msg)

@app.route('/user/likerecipe', methods =['POST'])
#username,recipe_name,recipe_username
def like_recipe():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        if DataLayer.Recipe_add_like(username,recipe_name,recipe_username):
            msg = {'status': 'success', 'message': 'You have successfully liked a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Like recipe failed!'}  
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/unlikerecipe', methods =['POST'])
#username,recipe_name,recipe_username
def unlike_recipe():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        if DataLayer.Recipe_remove_Like(username,recipe_name,recipe_username):
            msg = {'status': 'success', 'message': 'You have successfully unliked a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Unlike recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/recipe/getlikenum', methods =['GET'])
#recipe_name,recipe_username
# backup_1
def get_like_num():
    msg = ''
    if request.method == 'GET' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        #backup_2
        re_like_num = DataLayer.Recipe_get_like_num(recipe_name,recipe_username)
        msg = {'status': 'success', 'message': 'You have successfully got the number of likes!','re_like_num':re_like_num}
    return jsonify(msg)

@app.route('/comment/showlist', methods =['POST'])
#recipe_name,recipe_username
def show_comment():
    msg = ''
    if request.method == 'GET' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        comm = DataLayer.Recipe_show_comment(recipe_name,recipe_username)
        if comm:
            msg = {'status': 'success', 'message': 'You have successfully got the comment list!','comm':comm}
        else:
            msg = {'status': 'fail', 'message': 'Get comment list failed!'}
    return jsonify(msg)

@app.route('/comment/add', methods =['POST'])
#username,recipe_name,recipe_username,content
def add_comment_recipe():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json and 'content' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        content = request.json['content']
        if DataLayer.User_comment_recipe(username,recipe_name,recipe_username,content):
            msg = {'status': 'success', 'message': 'You have successfully added a comment to a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Add comment to a recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/comment/reply', methods =['POST'])
#username,recipe_name,recipe_username,comment_id,content
def add_comment_to_user():
    msg = ''
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json and 'comment_id' in request.json and 'content' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        comment_id = request.json['comment_id']
        content = request.json['content']
        if DataLayer.User_comment_user(username,recipe_name,recipe_username,comment_id,content):
            msg = {'status': 'success', 'message': 'You have successfully added a comment to a user!'}
        else:
            msg = {'status': 'fail', 'message': 'Add comment to a user failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/comment/delete', methods =['POST'])
#comment_id
def delete_comment():
    msg = ''
    if request.method == 'POST' and 'comment_id' in request.json:
        comment_id = request.json['comment_id']
        if DataLayer.Comment_delete(comment_id):
            msg = {'status': 'success', 'message': 'You have successfully deleted a comment!'}
        else:
            msg = {'status': 'fail', 'message': 'Delete comment failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/comment/getnum', methods =['GET'])
#recipe_name,recipe_username
def get_comment_num():
    msg = ''
    if request.method == 'GET' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        comm_num = DataLayer.Recipe_get_comment_num(recipe_name,recipe_username)
        if comm_num:
            msg = {'status': 'success', 'message': 'You have successfully got the number of comments!','comm_num':comm_num}
        else:
            msg = {'status': 'fail', 'message': 'Get number of comments failed!'}
    return jsonify(msg)

@app.route('/search/recipe', methods =['GET'])
#search_content,difficult='',style_name='',ingredient=''
def search_recipe():
    msg = ''
    if request.method == 'GET' and 'search_content' in request.json:
        search_content = request.json['search_content']
        difficult = request.json['difficult']
        style_name = request.json['style_name']
        ingredient = request.json['ingredient']
        return_recipe = DataLayer.Search_Recipe(search_content,difficult,style_name,ingredient)
        if return_recipe:
            msg = {'status': 'success', 'message': 'You have successfully searched a recipe!','return_recipe':return_recipe}
        else:
            msg = {'status': 'fail', 'message': 'Search recipe failed!'}
    return jsonify(msg)

@app.route('/search/user', methods =['GET'])
#search_content
def search_user():
    msg = ''
    if request.method == 'GET' and 'search_content' in request.json:
        search_content = request.json['search_content']
        return_user = DataLayer.search_user(search_content)
        if return_user:
            msg = {'status': 'success', 'message': 'You have successfully searched a user!','return_user':return_user}
        else:
            msg = {'status': 'fail', 'message': 'Search user failed!'}
    return jsonify(msg)

@app.route('/recipe/showcomment', methods =['POST'])
#recipe_name,recipe_username
def show_comment_backup():
    msg = ''
    if request.method == 'POST' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        msg = DataLayer.Recipe_show_comment_backup(recipe_name,recipe_username)
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