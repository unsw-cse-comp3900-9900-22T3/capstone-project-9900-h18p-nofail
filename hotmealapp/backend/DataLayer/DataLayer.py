import pymysql
import ConnectDB

db = ConnectDB.connectDb()

username = 'Ryan'
# email = 'AIChaos@mail.com'
password = 'liuyiyang'


def User_Register(username, email, password):
    sql = "INSERT INTO sys.User(Username, Email, Password) \
            VALUES ('%s', '%s', '%s');" % (username, email, password)
    print(sql)
    db.ping()
    insert_cursor = db.cursor()

    try:
        insert_cursor.execute(sql)
        db.commit()
        db.close()
        return True
    except Exception:
        db.rollback()
        print("register worng!!")
        db.close()
        return False

def User_Login(username, password):
    sql = "SELECT Password FROM sys.User WHERE Username = '%s';" % (username)
    print(sql)
    insert_cursor = db.cursor()
    return_password = ''
    db.ping()
    try:
        insert_cursor.execute(sql)
        return_password = insert_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("login worng!!")
    if return_password == password:
        db.close()
        # print('hello true')
        return True
    else:
        # print('noooooo')
        db.close()
        return False
def Username_Check(username):
    sql = "SELECT * FROM sys.User WHERE Username = '%s';" % (username)
    insert_cursor = db.cursor()
    return_password = ''
    db.ping()
    try:
        insert_cursor.execute(sql)
        return_password = insert_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("check worng!!")
    if return_password == '':
        db.close()
        return True
    else:
        db.close()
        return False
def Recipe_Insert_Update(recipe_name,recipe_username,recipe_discrption,recipe_style,ingredient,cooking_time,steps,recipe_photo):
    sql=""
    creat_cursor = db.cursor()
    sql_check = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name= '%s' AND Recipe_Username = '%s';" %(recipe_name,recipe_username)
    select_cursor = db.cursor()
    return_re = ''
    db.ping()
    try:
        select_cursor.execute(sql_check)
        return_re = select_cursor.fetchone()
    except Exception:
        db.rollback()
        print("select_recipe worng!!")
    if return_re==None:
        sql = "INSERT INTO sys.Recipe(Recipe_Name,Recipe_Username,Description,Recipe_Style,Ingredient,Cooking_Time,Steps,Recipe_Photo) \
        VALUE ('%s','%s','%s','%s','%s','%s','%s','%s');" %(recipe_name,recipe_username,recipe_discrption,recipe_style,ingredient,cooking_time,steps,recipe_photo)
    else:
        return_re = int(return_re[0])
        sql = "UPDATE sys.Recipe SET Recipe_Name = '%s',Recipe_Username = '%s',Description= '%s',Recipe_Style = '%s',Ingredient = '%s',Cooking_Time = '%s',\
        Steps = '%s',Recipe_Photo = '%s' WHERE Recipe_Id = '%s';" %(recipe_name,recipe_username,recipe_discrption,recipe_style,ingredient,cooking_time,steps,recipe_photo,return_re)
    try:
        creat_cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("create recipe worng!!")
        db.close()
        return False
    id_sql = "SELECT last_insert_id() FROM sys.Recipe;"
    select_cursor = db.cursor()
    return_re = ''
    db.ping()
    try:
        select_cursor.execute(id_sql)
        return_re = select_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("return id is worng!!")
    # print('kk', return_re)
    db.close()
    return return_re


# def Recipe_Update_byid(recipe_id, recipe_discrption,recipe_style,ingredient,cooking_time,steps,recipe_photo):
#     sql=""
#     creat_cursor = db.cursor()
#     sql_check = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Id= '%s';" %(recipe_id)
#     select_cursor = db.cursor()
#     return_re = ''
#     db.ping()
#     try:
#         select_cursor.execute(sql_check)
#         return_re = select_cursor.fetchone()
#     except Exception:
#         db.rollback()
#         print("select_recipe worng!!")
#     if return_re==None:
#         return False
#     else:
#         return_re = int(return_re[0])
#         sql = "UPDATE sys.Recipe SET Recipe_Name = '%s',Recipe_Username = '%s',Description= '%s',Recipe_Style = '%s',Ingredient = '%s',Cooking_Time = '%s',\
#         Steps = '%s',Recipe_Photo = '%s' WHERE Recipe_Id = '%s';" %(recipe_name,recipe_username,recipe_discrption,recipe_style,ingredient,cooking_time,steps,recipe_photo,return_re)
#     try:
#         creat_cursor.execute(sql)
#         db.commit()
#         db.close()
#         return True
#     except Exception:
#         db.rollback()
#         print("create recipe worng!!")
#         db.close()
#         return False

def Recipe_Insert_Update_repeate(recipe_name,recipe_username,recipe_discrption,recipe_style,ingredient,cooking_time,steps,recipe_photo):
    sql=""
    creat_cursor = db.cursor()
    sql_check = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name= '%s' AND Recipe_Username = '%s';" %(recipe_name,recipe_username)
    select_cursor = db.cursor()
    return_re = ''
    db.ping()
    try:
        select_cursor.execute(sql_check)
        return_re = select_cursor.fetchone()
    except Exception:
        db.rollback()
        print("select_recipe worng!!")

    sql = "INSERT INTO sys.Recipe(Recipe_Name,Recipe_Username,Description,Recipe_Style,Ingredient,Cooking_Time,Steps,Recipe_Photo) \
    VALUE ('%s','%s','%s','%s','%s','%s','%s','%s');" %(recipe_name,recipe_username,recipe_discrption,recipe_style,ingredient,cooking_time,steps,recipe_photo)
    try:
        creat_cursor.execute(sql)
        db.commit()

        # return True
    except Exception:
        db.rollback()
        print("create recipe worng!!")
        db.close()
        return False
    id_sql = "SELECT last_insert_id() FROM sys.Recipe;"
    select_cursor = db.cursor()
    return_re = ''
    db.ping()
    try:
        select_cursor.execute(id_sql)
        return_re = select_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("return id is worng!!")
    # print('kk',return_re)
    db.close()
    return return_re

def Recipe_Delete(recipe_name,recipe_username):
    sql_check = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name= '%s' AND Recipe_Username = '%s';" % (
    recipe_name, recipe_username)
    select_cursor = db.cursor()
    return_re = ''
    sql=''
    delet_cursor = db.cursor()
    db.ping()
    try:
        select_cursor.execute(sql_check)
        return_re = select_cursor.fetchone()
    except Exception:
        db.rollback()
        print("select_recipe worng!!")
    if return_re==None:
        return False
    else:
        return_re = int(return_re[0])
        sql = "DELETE FROM sys.Recipe WHERE Recipe_Id = '%s';" %(return_re)
    try:
        delet_cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("delete recipe worng!!")
        return False
    db.close()
    return True
def Recipe_Delete_byid(recipe_id):
    sql_check = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Id= '%s';" % (
    recipe_id)
    select_cursor = db.cursor()
    return_re = ''
    sql=''
    delet_cursor = db.cursor()
    db.ping()
    try:
        select_cursor.execute(sql_check)
        return_re = select_cursor.fetchone()
    except Exception:
        db.rollback()
        print("select_recipe worng!!")
    if return_re==None:
        return False
    else:
        return_re = int(return_re[0])
        sql = "DELETE FROM sys.Recipe WHERE Recipe_Id = '%s';" %(return_re)
    try:
        delet_cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("delete recipe worng!!")
        return False
    db.close()
    return True

def Recipe_Show(username):
    sql = "SELECT * FROM sys.Recipe \
          WHERE Recipe_Username = '%s';" %(username)
    sel_cursor = db.cursor()
    return_re = ''
    db.ping()
    try:
        sel_cursor.execute(sql)
        return_re = sel_cursor.fetchall()
    except Exception:
        db.rollback()
        print("recipe show worng!!")
    db.close()
    if return_re==None:
        return None
    else:
        return return_re
def Recipe_show_one(recipe_name,recipe_username):
    sql = "SELECT * FROM sys.Recipe \
          WHERE Recipe_Username = '%s' AND Recipe_Name = '%s';" %(recipe_username,recipe_name)
    sel_cursor = db.cursor()
    return_re = ''
    db.ping()
    try:
        print(sql)
        sel_cursor.execute(sql)
        return_re = sel_cursor.fetchone()
    except Exception:
        db.rollback()
        print("recipe show one wrong!!")
    db.close()
    if return_re==None:
        return None
    else:
        return return_re
def Recipe_show_one_byid(recipe_id):
    sql = "SELECT * FROM sys.Recipe \
          WHERE Recipe_Id = '%s';" %(recipe_id)
    sel_cursor = db.cursor()
    return_re = ''
    db.ping()
    try:
        print(sql)
        sel_cursor.execute(sql)
        return_re = sel_cursor.fetchone()
    except Exception:
        db.rollback()
        print("recipe show one wrong!!")
    db.close()
    if return_re==None:
        return None
    else:
        return return_re
def Ingredient_Insert(ingredient,in_type):
    sql = ""
    creat_cursor = db.cursor()
    sql_check = "SELECT * FROM sys.Ingredients_type WHERE Ingredient= '%s';" % (ingredient)
    select_cursor = db.cursor()
    return_re = ''
    db.ping()
    try:
        select_cursor.execute(sql_check)
        return_re = select_cursor.fetchone()
    except Exception:
        db.rollback()
        print("select_ingredient worng!!")
    if return_re == None:
        sql = "INSERT INTO sys.Ingredients_type(Ingredient,type) \
            VALUE ('%s','%s');" % (ingredient,in_type)
    else:
        return True
    try:
        creat_cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("create ingredient worng!!")
    db.close()
    return True
def User_follow(username,follow_name):
    check_follower_sql = "SELECT * FROM sys.User_Follower WHERE Username='%s' AND Follower_name = '%s';" %(follow_name,username)
    check_following_sql = "SELECT * FROM sys.User_Following WHERE Username='%s' AND Following_name ='%s';" %(username,follow_name)
    follow_sql= "INSERT INTO sys.User_Follower(Username,Follower_name)\
                VALUE ('%s','%s');" %(follow_name,username)
    following_sql = "INSERT INTO sys.User_Following(Username,Following_name)\
                    VALUE ('%s','%s');" %(username,follow_name)
    check_follow = db.cursor()
    db.ping()
    follow_result = ''
    try:
        check_follow.execute(check_follower_sql)
        follow_result = check_follow.fetchone()

    except Exception:
        db.rollback()
        print("select_follower worng!!")
    if follow_result == None:
        insert_follow = db.cursor()
        try:
            insert_follow.execute(follow_sql)
            db.commit()
        except Exception:
            db.rollback()
            print("create follow worng!!")
    following_check = db.cursor()
    following_result = ''
    try:
        following_check.execute(check_following_sql)
        following_result = following_check.fetchone()
    except Exception:
        db.rollback()
        print("select_follower worng!!")
    if following_result == None:
        insert_following = db.cursor()
        try:
            insert_following.execute(following_sql)
            db.commit()
        except Exception:
            db.rollback()
            print("create following worng!!")
    db.close()
    return True
def User_cancel_follow(username,follow_name):
    check_follower_sql = "SELECT * FROM sys.User_Follower WHERE Username='%s' AND Follower_name = '%s';" % (
    follow_name, username)
    check_following_sql = "SELECT * FROM sys.User_Following WHERE Username='%s' AND Following_name ='%s';" % (
    username, follow_name)
    follow_sql = "DELETE FROM sys.User_Follower WHERE Username='%s' AND Follower_name = '%s';" % (follow_name, username)
    following_sql = "DELETE FROM sys.User_Following WHERE Username='%s' AND Following_name = '%s';" % (username, follow_name)
    check_follow = db.cursor()
    follow_result = ''
    db.ping()
    try:
        check_follow.execute(check_follower_sql)
        follow_result = check_follow.fetchone()
    except Exception:
        db.rollback()
        print("select_follower worng!!")
    if follow_result != None:
        insert_follow = db.cursor()
        try:
            insert_follow.execute(follow_sql)
            db.commit()
        except Exception:
            db.rollback()
            print("delete follow worng!!")
    following_check = db.cursor()
    following_result = ''
    try:
        following_check.execute(check_following_sql)
        following_result = following_check.fetchone()
    except Exception:
        db.rollback()
        print("select_follower worng!!")
    if following_result != None:
        insert_following = db.cursor()
        try:
            insert_following.execute(following_sql)
            db.commit()
        except Exception:
            db.rollback()
            print("delete following worng!!")
    db.close()
    return True
def User_get_follower_number(username):
    sql="SELECT count(*) FROM sys.User_Follower WHERE Username ='%s';" %(username)
    cursor = db.cursor()
    re_num = ''
    db.ping()
    try:
        cursor.execute(sql)
        re_num = cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("count_follower worng!!")
    re_num = int(re_num)
    db.close()
    return re_num
def User_get_following_number(username):
    sql="SELECT count(*) FROM sys.User_Following WHERE Username ='%s';" %(username)
    cursor = db.cursor()
    re_num = ''
    db.ping()
    try:
        cursor.execute(sql)
        re_num = cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("count_following worng!!")
    re_num = int(re_num)
    db.close()
    return re_num
def User_insert_favour(username,recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" %(recipe_name,recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    insert_favour = "INSERT INTO sys.User_Favourite(Favourite_Name,Favourite_Recipe) VALUE('%s','%s');" %(username,re_id)
    insert_cursor = db.cursor()
    try:
        insert_cursor.execute(insert_favour)
        db.commit()
        return True
    except Exception:
        db.rollback()
        print("insert favour worng!!")
    db.close()
    return False
def User_insert_favour_byid(username,recipe_id):
    re_id = int(recipe_id)
    insert_favour = "INSERT INTO sys.User_Favourite(Favourite_Name,Favourite_Recipe) VALUE('%s','%s');" %(username,re_id)
    insert_cursor = db.cursor()
    db.ping()
    try:
        insert_cursor.execute(insert_favour)
        db.commit()
        return True
    except Exception:
        db.rollback()
        print("insert favour worng!!")
    db.close()
    return False
def User_show_favourite(username):
    sql = "SELECT * FROM sys.Recipe WHERE Recipe_Id IN(SELECT Favourite_Recipe FROM sys.User_Favourite WHERE Favourite_Name = '%s');" %(username)
    cursor = db.cursor()
    re = ''
    db.ping()
    try:
        cursor.execute(sql)
        re = cursor.fetchall()
    except Exception:
        db.rollback()
        print("show recipe id worng!!")
    db.close()
    print(re)
    return re
def User_remove_favourite(username,favourite_recipe,favourite_name):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
    favourite_recipe, favourite_name)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    insert_favour = "DELETE FROM sys.User_Favourite WHERE Favourite_Name='%s' AND Favourite_Recipe = '%s';" % (username, re_id)
    insert_cursor = db.cursor()
    try:
        insert_cursor.execute(insert_favour)
        db.commit()
    except Exception:
        db.rollback()
        print("delete favour worng!!")
    db.close()
    return True
def User_remove_favourite_byid(username,recipe_id):
    re_id = int(recipe_id)
    insert_favour = "DELETE FROM sys.User_Favourite WHERE Favourite_Name='%s' AND Favourite_Recipe = '%s';" % (username, re_id)
    insert_cursor = db.cursor()
    db.ping()
    try:
        insert_cursor.execute(insert_favour)
        db.commit()
    except Exception:
        db.rollback()
        print("delete favour worng!!")
    db.close()
    return True
def User_get_favourite_num(username):
    sql="SELECT COUNT(*) FROM sys.User_Favourite WHERE Favourite_Name='%s';"%(username)
    cursor = db.cursor()
    re_num=''
    db.ping()
    try:
        cursor.execute(sql)
        re_num = cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("count_favourite worng!!")
    re_num = int(re_num)
    db.close()
    return re_num
def Recipe_add_like(username,recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
    recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    insert_favour = "INSERT INTO sys.Recipe_Like(Recipe_Id,Like_Username) VALUE('%s','%s');" % (re_id,username)
    insert_cursor = db.cursor()
    try:
        insert_cursor.execute(insert_favour)
        db.commit()
    except Exception:
        db.rollback()
        print("insert like worng!!")
    db.close()
    return True
def Recipe_add_like_byid(username,recipe_id):
    db.ping()
    re_id = int(recipe_id)
    insert_favour = "INSERT INTO sys.Recipe_Like(Recipe_Id,Like_Username) VALUE('%s','%s');" % (re_id,username)
    insert_cursor = db.cursor()
    try:
        insert_cursor.execute(insert_favour)
        db.commit()
    except Exception:
        db.rollback()
        print("insert like worng!!")
    db.close()
    return True
def Recipe_remove_Like(username,recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
        recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    insert_favour = "DELETE FROM sys.Recipe_Like WHERE Recipe_Id='%s' AND Like_Username = '%s';" % (re_id,username)
    insert_cursor = db.cursor()
    try:
        insert_cursor.execute(insert_favour)
        db.commit()
    except Exception:
        db.rollback()
        print("delete like worng!!")
    db.close()
    return True
def Recipe_remove_Like_byid(username,recipe_id):
    db.ping()
    re_id = int(recipe_id)
    insert_favour = "DELETE FROM sys.Recipe_Like WHERE Recipe_Id='%s' AND Like_Username = '%s';" % (re_id,username)
    insert_cursor = db.cursor()
    try:
        insert_cursor.execute(insert_favour)
        db.commit()
    except Exception:
        db.rollback()
        print("delete like worng!!")
    db.close()
    return True
def Recipe_get_like_num(recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    sql = "SELECT COUNT(*) FROM sys.Recipe_Like WHERE Recipe_Id='%s';" % (re_id)
    cursor = db.cursor()
    re_num = ''
    try:
        cursor.execute(sql)
        re_num = cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("count_favourite worng!!")
    re_num = int(re_num)
    # print(re_num)
    db.close()
    return re_num
def Recipe_get_like_num_byid(recipe_id):
    db.ping()
    re_id = int(recipe_id)
    sql = "SELECT COUNT(*) FROM sys.Recipe_Like WHERE Recipe_Id='%s';" % (re_id)
    cursor = db.cursor()
    re_num = ''
    try:
        cursor.execute(sql)
        re_num = cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("count_favourite worng!!")
    re_num = int(re_num)
    print(re_num)
    db.close()
    return re_num
def Recipe_show_comment(recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
    recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    sql = "SELECT * FROM sys.Recipe_Comment WHERE Comment_Recipe_Id = '%s';" %(re_id)
    print(sql)
    cursor = db.cursor()
    re = ''
    try:
        cursor.execute(sql)
        re = cursor.fetchall()
    except Exception:
        db.rollback()
        print("show comment id worng!!")
    return re
def Recipe_show_comment_byid(recipe_id):
    db.ping()
    re_id = int(recipe_id)
    sql = "SELECT * FROM sys.Recipe_Comment WHERE Comment_Recipe_Id = '%s';" %(re_id)
    print(sql)
    cursor = db.cursor()
    re = ''
    try:
        cursor.execute(sql)
        re = cursor.fetchall()
    except Exception:
        db.rollback()
        print("show comment id worng!!")
    return re
def User_comment_recipe(username,recipe_name,recipe_username,content):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
        recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    sql = "INSERT INTO Recipe_Comment(Comment_Username,Comment_Recipe_Id,Comment_Content) \
          VALUE ('%s','%s','%s');" %(username,re_id,content)
    cursor = db.cursor()
    try:
        cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("insert like worng!!")
    db.close()
    return True
def User_comment_recipe_byid(username,recipe_id,content):
    db.ping()
    re_id = int(recipe_id)
    sql = "INSERT INTO Recipe_Comment(Comment_Username,Comment_Recipe_Id,Comment_Content) \
          VALUE ('%s','%s','%s');" %(username,re_id,content)
    cursor = db.cursor()
    try:
        cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("insert like worng!!")
    db.close()
    return True
def User_comment_user(username,recipe_name,recipe_username,comment_id,content):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
        recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    sql = "INSERT INTO Recipe_Comment(Comment_Username,Comment_Recipe_Id,Comment_To,Comment_Content) \
              VALUE ('%s','%s','%s','%s');" % (username, re_id,comment_id, content)
    cursor = db.cursor()
    try:
        cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("insert comment worng!!")
    db.close()
    return True
def User_comment_user_byid(username,recipe_id,comment_id,content):
    db.ping()
    re_id = int(recipe_id)
    sql = "INSERT INTO Recipe_Comment(Comment_Username,Comment_Recipe_Id,Comment_To,Comment_Content) \
              VALUE ('%s','%s','%s','%s');" % (username, re_id,comment_id, content)
    cursor = db.cursor()
    try:
        cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("insert comment worng!!")
    db.close()
    return True
def Comment_delete(comment_id):
    sql = "DELETE FROM sys.Recipe_Comment WHERE Comment_Id='%s' OR Comment_To='%s';"%(comment_id,comment_id)
    cursor = db.cursor()
    db.ping()
    try:
        cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("delete comment worng!!")
    db.close()
    return True
def Recipe_get_comment_num(recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
        recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    sql = "SELECT count(*) FROM sys.Recipe_Comment WHERE Comment_Recipe_Id='%s';"%(re_id)
    cursor = db.cursor()
    re_num = ''
    try:
        cursor.execute(sql)
        re_num = cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("get comment num worng!!")
    db.close()
    print(re_num)
    return re_num
def Recipe_get_comment_num_byid(recipe_id):
    db.ping()
    re_id = int(recipe_id)
    sql = "SELECT count(*) FROM sys.Recipe_Comment WHERE Comment_Recipe_Id='%s';"%(re_id)
    cursor = db.cursor()
    re_num = ''
    try:
        cursor.execute(sql)
        re_num = cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("get comment num worng!!")
    db.close()
    print(re_num)
    return re_num
def Search_Recipe(search_content='',difficult='',style_name='',ingredient=''):
    db.ping()
    if difficult!='':
        if difficult=='easy':
            difficult=" AND Cooking_Time <= 30"
        elif difficult=='middle':
            difficult = " AND Cooking_Time <= 60 AND Cooking_Time>30"
        else:
            difficult=" AND Cooking_Time>60"
    if style_name!='':
        style_name=" AND Recipe_Style='%s'"%(style_name)
    if ingredient!='':
        ingredient=" AND locate('%s',Ingredient)>0"%(ingredient)
    re_sql = "SELECT * FROM sys.Recipe WHERE Recipe_Name Like '%"+search_content+"%'"+difficult+style_name+ingredient+";"
    cursor = db.cursor()
    print(re_sql)
    re_re = ''
    try:
        cursor.execute(re_sql)
        re_re = cursor.fetchall()
    except Exception:
        db.rollback()
        print("get recipe worng!!")
    db.close()
    print(re_re)
    return re_re
def search_user(search_content):
    ur_sql = "SELECT * FROM sys.User WHERE Username Like '%" + search_content + "%';"
    ur_cursor = db.cursor()
    re_ur = ''
    db.ping()
    try:
        ur_cursor.execute(ur_sql)
        re_ur = ur_cursor.fetchall()
    except Exception:
        db.rollback()
        print("get username num worng!!")
    db.close()
    return re_ur

def Recipe_show_comment_backup(recipe_name, recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
        recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
    db.ping()
    try:
        qury_cursor.execute(qury_recipe)
        re_id = qury_cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("search recipe id worng!!")
    re_id = int(re_id)
    sql = "SELECT * FROM sys.Recipe_Comment WHERE Comment_Recipe_Id = '%s';" % (re_id)
    print(sql)
    cursor = db.cursor()
    re = ''
    try:
        cursor.execute(sql)
        re = cursor.fetchall()
    except Exception:
        db.rollback()
        print("show comment id worng!!")
    db.close()
    return re
def Recipe_show_comment_backup_byid(recipe_id):
    db.ping()
    re_id = int(recipe_id)
    sql = "SELECT * FROM sys.Recipe_Comment WHERE Comment_Recipe_Id = '%s';" % (re_id)
    print(sql)
    cursor = db.cursor()
    re = ''
    try:
        cursor.execute(sql)
        re = cursor.fetchall()
    except Exception:
        db.rollback()
        print("show comment id worng!!")
    db.close()
    return re

def check_recipe_like(reicpe_id,username):
    sql = "SELECT * FROM sys.Recipe_Like WHERE Recipe_Id = '%s' AND Like_Username = '%s';" %(reicpe_id,username)
    db.ping()
    qury_cursor = db.cursor()
    re_id=''
    try:
        qury_cursor.execute(sql)
        re_id = qury_cursor.fetchone()
    except Exception:
        db.rollback()
        print("search recipe like worng!!")
    db.close()
    # print(re_id)
    if re_id!=None:
        return True
    else:
        return False

def check_user_favourite(reicpe_id,username):
    sql = "SELECT * FROM sys.User_Favourite WHERE Favourite_Recipe = '%s' AND Favourite_Name = '%s';" %(reicpe_id,username)
    db.ping()
    qury_cursor = db.cursor()
    re_id=''
    try:
        qury_cursor.execute(sql)
        re_id = qury_cursor.fetchone()
    except Exception:
        db.rollback()
        print("search recipe like worng!!")
    db.close()
    # print(re_id)
    if re_id!=None:
        return True
    else:
        return False
def check_user_follow(username,follower_name):
    sql = "SELECT * FROM sys.User_Follower WHERE Username = '%s' AND Follower_name = '%s';" %(username,follower_name)
    db.ping()
    qury_cursor = db.cursor()
    re_id=''
    try:
        qury_cursor.execute(sql)
        re_id = qury_cursor.fetchone()
    except Exception:
        db.rollback()
        print("search user follower worng!!")
    db.close()
    # print(re_id)
    if re_id!=None:
        return True
    else:
        return False
def check_user_following(username,following_name):
    sql = "SELECT * FROM sys.User_Following WHERE Username = '%s' AND Following_name = '%s';" %(username,following_name)
    db.ping()
    qury_cursor = db.cursor()
    re_id=''
    try:
        qury_cursor.execute(sql)
        re_id = qury_cursor.fetchone()
    except Exception:
        db.rollback()
        print("search user following worng!!")
    db.close()
    # print(re_id)
    if re_id!=None:
        return True
    else:
        return False
def Follow_Show(username):
    sql = "SELECT Follower_name,Follow_Time FROM sys.User_Follower WHERE Username='%s';" %(username)
    db.ping()
    cur = db.cursor()
    re_id = ''
    try:
        cur.execute(sql)
        re_id = cur.fetchall()
    except Exception:
        db.rollback()
        db.close()
        print("show follower worng!!")
        return False
    # print(re_id)
    db.close()
    return re_id
def Following_Show(username):
    sql = "SELECT Following_name,Following_Time FROM sys.User_Following WHERE Username='%s';" %(username)
    db.ping()
    cur = db.cursor()
    re_id = ''
    try:
        cur.execute(sql)
        re_id = cur.fetchall()
    except Exception:
        db.rollback()
        db.close()
        print("show following worng!!")
        return False
    # print(re_id)
    db.close()
    return re_id
def User_show(username):
    sql="SELECT * From sys.User WHERE Username = '%s' ;" %(username)
    db.ping()
    cur = db.cursor()
    re=''
    try:
        cur.execute(sql)
        re = cur.fetchall()
    except Exception:
        db.rollback()
        print("show user worng!!")
        db.close()
        return False
    # print(re_id)
    db.close()
    # print(re)
    return re
def User_update(username,email, password, describe, user_photo):
    sql="UPDATE sys.User SET email = '%s', Password = '%s', `Describe`='%s', User_photo='%s' WHERE Username='%s';"%(email,password,describe,user_photo,username)
    db.ping()
    cur = db.cursor()
    try:
        cur.execute(sql)
        db.commit()
        db.close()
        return True
    except Exception:
        db.rollback()
        print("update user worng!!")
        db.close()
        return False
def Recipe_show_all():
    sql = "SELECT * FROM sys.Recipe"
    db.ping()
    cur = db.cursor()
    re = ''
    try:
        cur.execute(sql)
        re = cur.fetchall()
    except Exception:
        db.rollback()
        print("show recipe all worng!!")
        db.close()
        return False
    # print(re_id)
    db.close()
    # print(re)
    return re
def Ingredient_find(ingredient):
    sql="SELECT * From sys.Ingredients_type WHERE Ingredient = '%s'"%(ingredient)
    db.ping()
    cur=db.cursor()
    re = ''
    try:
        cur.execute(sql)
        re = cur.fetchone()
    except Exception:
        db.rollback()
        print("search user follower worng!!")
        return False
    db.close()
    print(re)
    return re
def Recipe_get_fav_num(recipe_id):
    db.ping()
    re_id = int(recipe_id)
    sql = "SELECT COUNT(*) FROM sys.User_Favourite WHERE Favourite_Recipe='%s';" % (re_id)
    cursor = db.cursor()
    re_num = ''
    try:
        cursor.execute(sql)
        re_num = cursor.fetchone()[0]
    except Exception:
        db.rollback()
        print("count_favourite worng!!")
    re_num = int(re_num)
    print(re_num)
    db.close()
    return re_num

# Ingredient_find('chicken')
# Recipe_get_fav_num(2)
# Recipe_Insert_Update('red meet','Ryan','good style','so good','beef;chicken',60,'no step','root')


re='fry fish'
fname = 'Ryan'
uname='Ryan'
frecipe = 'fry fish'

# Recipe_show_all()
# User_update('k1','k1','123','hhhhh','hhhh')
# User_show('Ryan')
# check_user_following('Ryan','Katherine')
# Follow_Show('Ryan')
# Following_Show('Ryan')
# check_user_following('Ryan','Katherine')
# check_user_favourite(1,'Ryan')
# check_recipe_like(2,'Ryan')

# Search_Recipe('a',difficult='easy',style_name='Home cooking')
# Recipe_get_comment_num('Malatang','Katherine')
# Comment_delete(5)
# User_comment_user('Ryan','Malatang','Katherine',2,'talk too much')
# User_comment_recipe('Ryan','Malatang','Katherine','so good hhhhhhh')
# Recipe_show_comment('Malatang','Katherine')
# Recipe_get_like_num('Tomato fry eggs','Ryan')
# Recipe_remove_Like(fname,frecipe,uname)
# Recipe_add_like(fname,frecipe,uname)
# User_get_favourite_num(fname)
# User_remove_favourite(fname,frecipe,uname)
# User_show_favourite(fname)
# User_insert_favour(fname,frecipe,uname)
# User_get_following_number(uname)
# User_get_follower_number(fname)
# User_cancel_follow(uname,fname)
# User_follow(uname,fname)
resty='fast food'
ingr='fish,oil'
co_time=30
ste='pure oil and fry fish'
rephoto='lol'
des='true good'
# ing='potato'
# t='vegetable'
# Ingredient_Insert(ing,t)
# kk=Recipe_Show(uname)
# print(kk)
# Recipe_Delete(re,uname)
# Recipe_Insert_Update(re,uname,des,resty,ingr,co_time,ste,rephoto)
# User_Register(username, email, password)
# print(User_Login(username, password))
# print('hello world')
# Username_Check(username)
# cursor = db.cursor()
# cursor.execute("SELECT * FROM sys.User")
# data = cursor.fetchall()
# print(data)

# db.close()
