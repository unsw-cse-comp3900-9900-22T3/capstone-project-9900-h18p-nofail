# Store this code in 'app.py' file
import http
from os import path
import sys
# sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
# sys.path.append('..')
from collections import ChainMap
from tokenize import group
from flask_login import current_user
# from flask_qiniustorage import Qiniu

from flask import Flask, jsonify, render_template, request, redirect, url_for, session, Blueprint, Response
from flask_cors import CORS, cross_origin
import json

import pymysql

import DataLayer

from DataLayer import db as db

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



# QINIU_ACCESS_KEY = 'ia2_Xh4kW0_6fK5cvrACV6ICkv_Wvjo1tqmvM5OS'
# QINIU_SECRET_KEY = 'sfN9dqTYsi5Sm4K3IKJguIPauzz6zysMzbDrzpdw'
# QINIU_BUCKET_NAME = 'no-fail-image-bucket'
# QINIU_BUCKET_DOMAIN = 'rkipgq0yn.sabkt.gdipper.com'

# # app = Flask(__name__)
# app.config.from_object(__name__)
# qiniu_store = Qiniu(app)
# # 或者
# # qiniu_store = Qiniu()
# # qiniu_store.init_app(app)

# # 保存文件到七牛
# @app.route('/save')
# def save(data,filename):
#     # data = 'data to save'
#     # filename = 'filename'
#     print('here')
#     ret, info = qiniu_store.save(data, filename)
#     return str(ret)

# # 删除七牛空间中的文件
# @app.route('/delete')
# def delete():
#     filename = 'filename'
#     ret, info = qiniu_store.delete(filename)
#     return str(ret)

# # 根据文件名获取对应的公开URL
# @app.route('/url')
# def url():
#     filename = 'filename'
#     return qiniu_store.url(filename)

#######End connect to database#######====================

######Start of Business Layer######======================================================
headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
    }

@app.route('/register', methods =['GET', 'POST'])
def register():
    msg = 'missing parameter'
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
    msg = 'missing parameter'
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
    
    msg = 'missing parameter'
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
    msg = 'missing parameter'
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

@app.route('/recipe/delete', methods =['POST'])
def delete_recipe():
    msg = 'missing parameter'
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

@app.route('/recipe/showall', methods =['POST'])
def showall_recipe():
    msg = ''
    if request.method == 'POST':
        recipe_list = DataLayer.Recipe_show_all()
        if recipe_list:
            recipe_list = list(recipe_list)
            for i in range(len(recipe_list)):
                like_num = DataLayer.Recipe_get_like_num(recipe_list[i][1],recipe_list[i][2])
                if like_num:
                    recipe_list[i] = {"recipe_id": recipe_list[i][0], "recipe_name": recipe_list[i][1], "recipe_username": recipe_list[i][2], "recipe_style": recipe_list[i][3], "ingredient": recipe_list[i][4], "cooking_time": recipe_list[i][5], "steps": recipe_list[i][6], "recipe_photo": recipe_list[i][7],"description": recipe_list[i][9],"like_num":like_num}
                else:
                    recipe_list[i] = {"recipe_id": recipe_list[i][0], "recipe_name": recipe_list[i][1], "recipe_username": recipe_list[i][2], "recipe_style": recipe_list[i][3], "ingredient": recipe_list[i][4], "cooking_time": recipe_list[i][5], "steps": recipe_list[i][6], "recipe_photo": recipe_list[i][7],"description": recipe_list[i][9],"like_num":0}
            
            msg = {'status': 'success', 'message': 'You have successfully show all recipes!', 'recipe_list': recipe_list}

        else:
            msg = {'status': 'fail', 'message': 'Show all recipes failed!'}
    return jsonify(msg)

@app.route('/recipe/showlist', methods =['POST'])
#username
def show_recipe():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_username' in request.json:
        recipe_username = request.json['recipe_username']
        re_lists = DataLayer.Recipe_Show(recipe_username)
        if re_lists:
            re_lists=list(re_lists) #convert tuple into list
            for i in range(len(re_lists)):
                like_num = DataLayer.Recipe_get_like_num( re_lists[i][1],re_lists[i][2])
                if like_num:
                    re_lists[i] = {"recipe_id": re_lists[i][0], "recipe_name": re_lists[i][1], "recipe_username": re_lists[i][2], "recipe_style": re_lists[i][3], "ingredient": re_lists[i][4], "cooking_time": re_lists[i][5], "steps": re_lists[i][6], "recipe_photo": re_lists[i][7],"description": re_lists[i][9],"like_num":like_num}
                else:
                    re_lists[i] = {"recipe_id": re_lists[i][0], "recipe_name": re_lists[i][1], "recipe_username": re_lists[i][2], "recipe_style": re_lists[i][3], "ingredient": re_lists[i][4], "cooking_time": re_lists[i][5], "steps": re_lists[i][6], "recipe_photo": re_lists[i][7],"description": re_lists[i][9],"like_num":0}
            msg = {'status': 'success', 'message': 'You have successfully get the recipe list!', 'recipe_list': re_lists}
        else:
            msg = {'status': 'fail', 'message': 'The user has no recipe!'}
    return jsonify(msg)

@app.route('/recipe/showone', methods =['POST'])  
#recipe_name,recipe_username
def show_one_recipe():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        re = DataLayer.Recipe_show_one(recipe_name, recipe_username)
        if re:
            ingredients = re[4].split(';') #convert str into list
            # get rid of the last empty element
            ingredients.pop()
            print("ingredients: ",ingredients)
            for i in range(len(ingredients)):
                ingredients[i] = ingredients[i].strip()
                print("ingredients: ",ingredients[i])
                db.ping(reconnect=True)
                cursur = db.cursor()
                sql = "SELECT `Type` FROM sys.Ingredients_type WHERE Ingredient = \"%s\"" %(ingredients[i])
                try:
                    print("sql: ",sql)
                    cursur.execute(sql)
                    # db.commit()
                    result = cursur.fetchone()
                    if result:
                        ingredients[i] = {result[0]:ingredients[i]}
                        print("result: ",ingredients[i])
                    else:
                        ingredients[i] = {"Others":ingredients[i]}
                        # print("result: ", ingredients[i])
                except:
                    db.rollback()
                    print("sql error")
            group_ingredient = {}
            for i in range(len(ingredients)):
                for key in ingredients[i]:
                    if key in group_ingredient:
                        group_ingredient[key].append(ingredients[i][key])
                    else:
                        group_ingredient[key] = [ingredients[i][key]]

            steps = re[6].split(',') #convert str into list
            group_steps = []
            # get rid of the last empty element
            steps.pop()
            for key in steps:
                group_steps.append(key.strip())
            # print("group_steps: ",group_steps)

            like_num = DataLayer.Recipe_get_like_num(recipe_name,recipe_username)
            re=list(re) #convert tuple into list
            if like_num:
                re = {"recipe_id": re[0], "recipe_name": re[1], "recipe_username": re[2], "recipe_style": re[3], "ingredient": group_ingredient, "cooking_time": re[5], "steps": group_steps, "recipe_photo": re[7], "description": re[9],"like_num":like_num} #convert tuple into dictionary
            else:
                re = {"recipe_id": re[0], "recipe_name": re[1], "recipe_username": re[2], "recipe_style": re[3], "ingredient": group_ingredient, "cooking_time": re[5], "steps": group_steps, "recipe_photo": re[7], "description": re[9],"like_num":0}
            msg = {'status': 'success', 'message': 'You have successfully got the recipe!', 'recipe': re}
        else:
            msg = {'status': 'fail', 'message': 'The recipe does not exist!'}
    return jsonify(msg)

@app.route('/recipe/showone/byid', methods =['POST'])  
#recipe_name,recipe_username
def show_one_recipe_byid():
    print(request.json,"##################")
    print(request)
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_id' in request.json:
        recipe_id = request.json['recipe_id']
        re = DataLayer.Recipe_show_one_byid(recipe_id)
        if re:
            ingredients = re[4].split(';') #convert str into list
            # get rid of the last empty element
            ingredients.pop()
            print("ingredients: ",ingredients)
            for i in range(len(ingredients)):
                ingredients[i] = ingredients[i].strip()
                print("ingredients: ",ingredients[i])
                db.ping(reconnect=True)
                cursur = db.cursor()
                sql = "SELECT `Type` FROM sys.Ingredients_type WHERE Ingredient = \"%s\"" %(ingredients[i])
                try:
                    print("sql: ",sql)
                    cursur.execute(sql)
                    # db.commit()
                    result = cursur.fetchone()
                    if result:
                        ingredients[i] = {result[0]:ingredients[i]}
                        print("result: ",ingredients[i])
                    else:
                        ingredients[i] = {"Others":ingredients[i]}
                        # print("result: ", ingredients[i])
                except:
                    db.rollback()
                    print("sql error")
            group_ingredient = {}
            for i in range(len(ingredients)):
                for key in ingredients[i]:
                    if key in group_ingredient:
                        group_ingredient[key].append(ingredients[i][key])
                    else:
                        group_ingredient[key] = [ingredients[i][key]]

            steps = re[6].split(',') #convert str into list
            group_steps = []
            # get rid of the last empty element
            steps.pop()
            for key in steps:
                group_steps.append(key.strip())
            # print("group_steps: ",group_steps)

            like_num = DataLayer.Recipe_get_like_num_byid(recipe_id)
            re=list(re) #convert tuple into list
            if like_num:
                re = {"recipe_id": re[0], "recipe_name": re[1], "recipe_username": re[2], "recipe_style": re[3], "ingredient": group_ingredient, "ingredient_previous": re[4],"cooking_time": re[5], "steps": group_steps, "steps_previous":re[6],"recipe_photo": re[7], "description": re[9],"like_num":like_num} #convert tuple into dictionary
            else:
                re = {"recipe_id": re[0], "recipe_name": re[1], "recipe_username": re[2], "recipe_style": re[3], "ingredient": group_ingredient, "ingredient_previous": re[4], "cooking_time": re[5], "steps": group_steps, "steps_previous":re[6],"recipe_photo": re[7], "description": re[9],"like_num":0}
            msg = {'status': 'success', 'message': 'You have successfully got the recipe!', 'recipe': re}
        else:
            msg = {'status': 'fail', 'message': 'The recipe does not exist!'}
    return jsonify(msg)

@app.route('/ingredient/insert', methods =['GET', 'POST'])
#ingredient,in_type
def insert_ingredient():
    msg = 'missing parameter'
    if request.method == 'POST' and 'ingredient' in request.json and 'in_type' in request.json:
        ingredient = request.json['ingredient']
        in_type = request.json['in_type']
        DataLayer.Ingredient_Insert(ingredient,in_type)
        msg = {'status': 'success', 'message': 'You have successfully created an ingredient!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/getpersonalinfo', methods =['POST'])  #username
def get_personal_info():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json:
        username = request.json['username']
        re = DataLayer.User_show(username)
        if re:
            following_num = DataLayer.User_get_follower_number(username) #get the number of followers
            follower_num = DataLayer.User_get_follower_number(username) #get the number of following
            re=list(re)
            if following_num and follower_num:
                for i in range(len(re)):
                    re[i] = {"username": re[i][0], "email": re[i][1], "description": re[i][3], "user_photo": re[i][4], "update_time": re[i][5], "following_num": following_num, "follower_num": follower_num} #convert tuple into dictionary
            else:
                for i in range(len(re)):
                    re[i] = {"username": re[i][0], "email": re[i][1], "description": re[i][3], "user_photo": re[i][4], "update_time": re[i][5], "following_num": 0, "follower_num": 0}
            msg = {'status': 'success', 'message': 'You have successfully got the user information!', 'personal_info': re}
        else:
            msg = {'status': 'fail', 'message': 'The user does not exist!'}
    return jsonify(msg)

@app.route('/user/updatepersonalinfo', methods =['POST'])  #username,password,email,phone,address,photo
def update_personal_info():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json:
        username = request.json['username']
        re = DataLayer.User_show(username)
        if re:
            re=list(re)
            for i in range(len(re)):
                re[i] = {"username": re[i][0], "email": re[i][1], "password": re[i][2], "description": re[i][3], "user_photo": re[i][4], "update_time": re[i][5]}
        else:
            msg = {'status': 'fail', 'message': 'The user does not exist!'}
            return jsonify(msg)
        if 'password' in request.json:
            re[0]['password'] = request.json['password']
        if 'email' in request.json:
            re[0]['email'] = request.json['email']
        if 'description' in request.json:
            re[0]['description'] = request.json['description']
        if 'user_photo' in request.json:
            re[0]['user_photo'] = request.json['user_photo']
        #username,email, password, describe, user_photo

        if DataLayer.User_update(username, re[0]['email'], re[0]['password'], re[0]['description'], re[0]['user_photo']):
            msg = {'status': 'success', 'message': 'You have successfully updated the user information!'}
        else:
            msg = {'status': 'fail', 'message': 'Update user information failed!'}
    return jsonify(msg)

@app.route('/user/follow', methods =['POST'])
#username,follow_username
def follow_user():
    msg = 'missing parameter'
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

@app.route('/user/checkfollowerstatus', methods =['POST'])
#username,follow_username
def check_follower_status():
    msg = 'missing parameter'
    if request.method == 'POST' and 'self_username' in request.json and 'query_username' in request.json:
        username = request.json['self_username']
        follow_username = request.json['query_username']
        if DataLayer.check_user_follow(username,follow_username):
            msg = {'status': 'success', 'message': 'You have this user in your follower list!'}
        else:
            msg = {'status': 'fail', 'message': 'You do not have this user in your follower list!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/checkfollowingstatus', methods =['POST'])
#username,follow_username
def check_following_status():
    msg = 'missing parameter'
    if request.method == 'POST' and 'self_username' in request.json and 'query_username' in request.json:
        follow_username = request.json['self_username']
        username = request.json['query_username']
        if DataLayer.check_user_following(follow_username,username):
            msg = {'status': 'success', 'message': 'This user is following you!'}
        else:
            msg = {'status': 'fail', 'message': 'This user is not following you!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/unfollow', methods =['POST'])
#username,follow_username
def unfollow_user():
    msg = 'missing parameter'
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

@app.route('/user/getfollowernum', methods =['POST'])
#username,follow_username
def getfollowernum():
    msg = 'missing parameter'
    # if request.method == 'POST' and 'username' in request.json:
    
    username = request.json['username']
    num = DataLayer.User_get_follower_number(username)
    if num:
        msg = {'status': 'success', 'message': 'You have successfully got the number of followers!','follower_num':num}
    else:
        msg = {'status': 'fail', 'message': 'Get number of followers failed!'}
    return jsonify(msg)

@app.route('/user/getfollowingnum', methods =['POST'])
#username
#backup_1
def get_following():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json:
        username = request.json['username']
        num = DataLayer.User_get_following_number(username)
        if num:
            msg = {'status': 'success', 'message': 'You have successfully got the number of following!','following_num':num}
        else:
            msg = {'status': 'fail', 'message': 'Get number of following failed!'}
    return jsonify(msg)

@app.route('/user/getfollowinglist', methods =['POST'])
#username
def getfollowinglist():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json:
        username = request.json['username']
        re = DataLayer.Following_Show(username)
        if re:
            re = list(re)
            for i in range(len(re)):
                re[i] = {'following_username':re[i][0],'time':re[i][1]}
            msg = {'status': 'success', 'message': 'You have successfully got the following list!','following_list':re}
        else:
            msg = {'status': 'fail', 'message': 'Get following list failed!'}
    return jsonify(msg)

@app.route('/user/getfollowerlist', methods =['POST'])
#username
def getfollowerlist():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json:
        username = request.json['username']
        re = DataLayer.Follow_Show(username)
        if re:
            re = list(re)
            for i in range(len(re)):
                re[i] = {'follower_username':re[i][0],'time':re[i][1]}
            msg = {'status': 'success', 'message': 'You have successfully got the follower list!','follower_list':re}
        else:
            msg = {'status': 'fail', 'message': 'Get follower list failed!'}
    return jsonify(msg)

@app.route('/user/favrecipe', methods =['POST'])
# username,recipe_name,recipe_username
def fav_recipe():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json and 'recipe_name' in request.json and 'recipe_username' in request.json:
        username = request.json['username']
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        if DataLayer.User_insert_favour(username,recipe_name,recipe_username):
            msg = {'status': 'success', 'message': 'You have successfully favorited a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Favorite recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/favrecipe/byid', methods =['POST'])
# username,recipe_id
def fav_recipe_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json and 'recipe_id' in request.json:
        username = request.json['username']
        recipe_id = request.json['recipe_id']
        if DataLayer.User_insert_favour_byid(username,recipe_id):
            msg = {'status': 'success', 'message': 'You have successfully favorited a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Favorite recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/checkfav', methods =['POST'])
# recipe_id, username
def check_fav():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_id' in request.json and 'username' in request.json:
        recipe_id = request.json['recipe_id']
        username = request.json['username']
        if DataLayer.check_user_favourite(recipe_id, username):
            msg = {'status': 'success', 'message': 'You have favorited this recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'You have not favorited this recipe!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/getfavlist', methods =['POST'])
# username
def fav_list():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json:
        username = request.json['username']
        favlist = DataLayer.User_show_favourite(username)
        favlist = list(favlist)
        for i in range(len(favlist)):
            favlist[i] = {"recipe_id": favlist[i][0], "recipe_name": favlist[i][1], "recipe_username": favlist[i][2], "recipe_style": favlist[i][3], "ingredient": favlist[i][4], "cooking_time": favlist[i][5], "steps": favlist[i][6], "recipe_photo": favlist[i][7], "recipe_create_time": favlist[i][8]}
        if favlist:
            msg = {'status': 'success', 'message': 'You have successfully got your favorite list!','fav_list':favlist}
        else:
            msg = {'status': 'fail', 'message': 'Get favorite list failed!'}
    return jsonify(msg)

@app.route('/user/unfavrecipe', methods =['POST'])
# username,recipe_name,recipe_username
def remove_fav():
    msg = 'missing parameter'
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

@app.route('/user/unfavrecipe/byid', methods =['POST'])
# username,recipe_name,recipe_username
def remove_fav_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json and 'recipe_id' in request.json:
        username = request.json['username']
        recipe_id = request.json['recipe_id']
        if DataLayer.User_remove_favourite_byid(username,recipe_id):
            msg = {'status': 'success', 'message': 'You have successfully removed a favorite recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Remove favorite recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/getfavrecipenum', methods =['POST'])
#username
# backup_1
def get_fav_recipe_num():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_id' in request.json:
        recipe_id = request.json['recipe_id']
        #backup_2
        fav_num = DataLayer.Recipe_get_fav_num(recipe_id)
        if fav_num:
            msg = {'status': 'success', 'message': 'You have successfully got your favorite recipe number!','fav_num':fav_num}
        else:
            msg = {'status': 'fail', 'message': 'Get favorite recipe number failed!','fav_num':0}
    return jsonify(msg)

@app.route('/user/likerecipe', methods =['POST'])
#username,recipe_name,recipe_username
def like_recipe():
    msg = 'missing parameter'
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

@app.route('/user/likerecipe/byid', methods =['POST'])
#username,recipe_name,recipe_username
def like_recipe_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json and 'recipe_id' in request.json:
        username = request.json['username']
        recipe_id = request.json['recipe_id']
        if DataLayer.Recipe_add_like_byid(username,recipe_id):
            msg = {'status': 'success', 'message': 'You have successfully liked a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Like recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)


@app.route('/user/checklike', methods =['POST'])
# recipe_id, username
def check_like():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_id' in request.json and 'username' in request.json:
        recipe_id = request.json['recipe_id']
        username = request.json['username']
        if DataLayer.check_recipe_like(recipe_id, username):
            msg = {'status': 'success', 'message': 'You have liked this recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'You have not liked this recipe!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/user/unlikerecipe', methods =['POST'])
#username,recipe_name,recipe_username
def unlike_recipe():
    msg = 'missing parameter'
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

@app.route('/user/unlikerecipe/byid', methods =['POST'])
#username,recipe_name,recipe_username
def unlike_recipe_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json and 'recipe_id' in request.json:
        username = request.json['username']
        recipe_id = request.json['recipe_id']
        if DataLayer.Recipe_remove_Like_byid(username,recipe_id):
            msg = {'status': 'success', 'message': 'You have successfully unliked a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Unlike recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/recipe/getlikenum', methods =['POST'])
#recipe_name,recipe_username
# backup_1
def get_like_num():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        #backup_2
        re_like_num = DataLayer.Recipe_get_like_num(recipe_name,recipe_username)
        if re_like_num:
            msg = {'status': 'success', 'message': 'You have successfully got the recipe like number!','re_like_num':re_like_num}
        else:
            msg = {'status': 'fail', 'message': 'Get recipe like number failed!','re_like_num':0}
    return jsonify(msg)

@app.route('/recipe/getlikenum/byid', methods =['POST'])
#recipe_name,recipe_username
# backup_1
def get_like_num_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_id' in request.json:
        recipe_id = request.json['recipe_id']
        #backup_2
        re_like_num = DataLayer.Recipe_get_like_num_byid(recipe_id)
        if re_like_num:
            msg = {'status': 'success', 'message': 'You have successfully got the number of likes!','re_like_num':re_like_num}
        else:
            msg = {'status': 'fail', 'message': 'You have failed to get the number of likes!','re_like_num':0}
    return jsonify(msg)

@app.route('/comment/showlist', methods =['POST'])
#recipe_name,recipe_username
def show_comment():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        comm = DataLayer.Recipe_show_comment(recipe_name,recipe_username)
        if comm:
            msg = {'status': 'success', 'message': 'You have successfully got the comment list!','comm':comm}
        else:
            msg = {'status': 'fail', 'message': 'Get comment list failed!'}
    return jsonify(msg)

@app.route('/comment/showlist/byid', methods =['POST'])
#recipe_name,recipe_username
def show_comment_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_id' in request.json:
        recipe_id = request.json['recipe_id']
        comm = DataLayer.Recipe_show_comment_byid(recipe_id)
        if comm:
            msg = {'status': 'success', 'message': 'You have successfully got the comment list!','comm':comm}
        else:
            msg = {'status': 'fail', 'message': 'Get comment list failed!'}
    return jsonify(msg)

@app.route('/comment/add', methods =['POST'])
#username,recipe_name,recipe_username,content
def add_comment_recipe():
    msg = 'missing parameter'
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

@app.route('/comment/add/byid', methods =['POST'])
#username,recipe_id ,content
def add_comment_recipe_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json and 'recipe_id' in request.json and 'content' in request.json:
        username = request.json['username']
        recipe_id = request.json['recipe_id']
        content = request.json['content']
        if DataLayer.User_comment_recipe_byid(username,recipe_id,content):
            msg = {'status': 'success', 'message': 'You have successfully added a comment to a recipe!'}
        else:
            msg = {'status': 'fail', 'message': 'Add comment to a recipe failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)


@app.route('/comment/reply', methods =['POST'])
#username,recipe_name,recipe_username,comment_id,content
def add_comment_to_user():
    msg = 'missing parameter'
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

@app.route('/comment/reply/byid', methods =['POST'])
#username,recipe_id,comment_id,content
def add_comment_to_user_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'username' in request.json and 'recipe_id' in request.json and 'comment_id' in request.json and 'content' in request.json:
        username = request.json['username']
        recipe_id = request.json['recipe_id']
        comment_id = request.json['comment_id']
        content = request.json['content']
        if DataLayer.User_comment_user_byid(username,recipe_id,comment_id,content):
            msg = {'status': 'success', 'message': 'You have successfully added a comment to a user!'}
        else:
            msg = {'status': 'fail', 'message': 'Add comment to a user failed!'}
    elif request.method == 'GET':
        msg = {'status': 'fail', 'message': 'Please fill out the form!'}
    return jsonify(msg)

@app.route('/comment/delete', methods =['POST'])
#comment_id
def delete_comment():
    msg = 'missing parameter'
    if request.method == 'POST' and 'comment_id' in request.json:
        comment_id = request.json['comment_id']
        if DataLayer.Comment_delete(comment_id):
            msg = {'status': 'success', 'message': 'You have successfully deleted a comment!'}
        else:
            msg = {'status': 'fail', 'message': 'Delete comment failed!'}
    return jsonify(msg)

@app.route('/comment/getnum', methods =['POST'])
#recipe_name,recipe_username
def get_comment_num():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_name' in request.json and 'recipe_username' in request.json:
        recipe_name = request.json['recipe_name']
        recipe_username = request.json['recipe_username']
        comm_num = DataLayer.Recipe_get_comment_num(recipe_name,recipe_username)
        if comm_num:
            msg = {'status': 'success', 'message': 'You have successfully got the number of comments!','comm_num':comm_num}
        else:
            msg = {'status': 'fail', 'message': 'Get number of comments failed!'}
    return jsonify(msg)

@app.route('/comment/getnum/byid', methods =['POST'])
#recipe_id
def get_comment_num_byid():
    msg = 'missing parameter'
    if request.method == 'POST' and 'recipe_id' in request.json:
        recipe_id = request.json['recipe_id']
        comm_num = DataLayer.Recipe_get_comment_num_byid(recipe_id)
        if comm_num:
            msg = {'status': 'success', 'message': 'You have successfully got the number of comments!','comm_num':comm_num}
        else:
            msg = {'status': 'fail', 'message': 'Get number of comments failed!'}
    return jsonify(msg)

@app.route('/search/recipe', methods =['POST'])
#search_content,difficult='',style_name='',ingredient=''
def search_recipe():
    msg = 'missing parameter'
    if request.method == 'POST' and 'search_content' in request.json:
        search_content = request.json['search_content']
        difficult = request.json['difficult']
        style_name = request.json['style_name']
        ingredient = request.json['ingredient']
        return_recipe = DataLayer.Search_Recipe(search_content,difficult,style_name,ingredient)
        if return_recipe:
            return_recipe = list(return_recipe) #convert tuple to list
            for i in range(len(return_recipe)):
                return_recipe[i] = {'recipe_id':return_recipe[i][0],'recipe_name':return_recipe[i][1],'recipe_username':return_recipe[i][2],'recipe_style':return_recipe[i][3],'ingredient':return_recipe[i][4],'cooking_time':return_recipe[i][5],'steps':return_recipe[i][6],'recipe_photo':return_recipe[i][7],'recipe_create_time':return_recipe[i][8],'description':return_recipe[i][9]} #convert tuple to dict
            msg = {'status': 'success', 'message': 'You have successfully searched a recipe!','return_recipe':return_recipe}
        else:
            msg = {'status': 'fail', 'message': 'Search recipe failed!'}
    return jsonify(msg)

@app.route('/search/user', methods =['POST'])
#search_content
def search_user():
    msg = 'missing parameter'
    if request.method == 'POST' and 'search_content' in request.json:
        search_content = request.json['search_content']
        return_user = DataLayer.search_user(search_content)
        if return_user:
            return_user = list(return_user) #convert tuple to list
            for i in range(len(return_user)):
                return_user[i] = {'username':return_user[i][0],'email':return_user[i][1],'bio':return_user[i][3],'user_photo':return_user[i][4]}
            msg = {'status': 'success', 'message': 'You have successfully searched a user!','return_user':return_user}
        else:
            msg = {'status': 'fail', 'message': 'Search user failed!'}
    return jsonify(msg)

@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({'status': 'success', 'message': 'You have successfully logged out!'})


#######End of Business Layer#######======================================================


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)