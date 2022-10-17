import pymysql
import ConnectDB

db = ConnectDB.connectDb()

username = 'Ryan'
# email = 'AIChaos@mail.com'
password = 'liuyiyang'


def User_Register(username, email, password):
    sql = "INSERT INTO sys.User(Username, Email, Password) \
            VALUES ('%s', '%s', '%s');" % (username, email, password)
    insert_cursor = db.cursor()
    try:
        insert_cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("register worng!!")
    db.close()

def User_Login(username, password):
    sql = "SELECT Password FROM sys.User WHERE Username = '%s';" % (username)
    print('q11111',sql)
    insert_cursor = db.cursor()
    return_password = ''
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
def Recipe_Insert_Update(recipe_name,recipe_username,recipe_style,ingredient,cooking_time,steps,recipe_photo):
    sql=""
    creat_cursor = db.cursor()
    sql_check = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name= '%s' AND Recipe_Username = '%s';" %(recipe_name,recipe_username)
    select_cursor = db.cursor()
    return_re = ''
    try:
        select_cursor.execute(sql_check)
        return_re = select_cursor.fetchone()
    except Exception:
        db.rollback()
        print("select_recipe worng!!")
    if return_re==None:
        sql = "INSERT INTO sys.Recipe(Recipe_Name,Recipe_Username,Recipe_Style,Ingredient,Cooking_Time,Steps,Recipe_Photo) \
        VALUE ('%s','%s','%s','%s','%s','%s','%s');" %(recipe_name,recipe_username,recipe_style,ingredient,cooking_time,steps,recipe_photo)
    else:
        return_re = int(return_re[0])
        sql = "UPDATE sys.Recipe SET Recipe_Name = '%s',Recipe_Username = '%s',Recipe_Style = '%s',Ingredient = '%s',Cooking_Time = '%s',\
         Steps = '%s',Recipe_Photo = '%s' WHERE Recipe_Id = '%s';" %(recipe_name,recipe_username,recipe_style,ingredient,cooking_time,steps,recipe_photo,return_re)
    try:
        creat_cursor.execute(sql)
        db.commit()
    except Exception:
        db.rollback()
        print("create recipe worng!!")
    db.close()

def Recipe_Delete(recipe_name,recipe_username):
    sql_check = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name= '%s' AND Recipe_Username = '%s';" % (
    recipe_name, recipe_username)
    select_cursor = db.cursor()
    return_re = ''
    sql=''
    delet_cursor = db.cursor()
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
    db.close()
    return True

def Recipe_Show(username):
    sql = "SELECT Recipe_Name,Recipe_Username,Recipe_Style,Ingredient,Cooking_Time,Steps,Recipe_Photo FROM sys.Recipe \
          WHERE Recipe_Username = '%s';" %(username)
    sel_cursor = db.cursor()
    return_re = ''
    try:
        sel_cursor.execute(sql)
        return_re = sel_cursor.fetchall()
    except Exception:
        db.rollback()
        print("recipe show worng!!")
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
    except Exception:
        db.rollback()
        print("insert favour worng!!")
    db.close()
    return True
def User_show_favourite(username):
    sql = "SELECT * FROM sys.Recipe WHERE Recipe_Id IN(SELECT Favourite_Recipe FROM sys.User_Favourite WHERE Favourite_Name = '%s');" %(username)
    cursor = db.cursor()
    re = ''
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
def User_get_favourite_num(username):
    sql="SELECT COUNT(*) FROM sys.User_Favourite WHERE Favourite_Name='%s';"%(username)
    cursor = db.cursor()
    re_num=''
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
def Recipe_remove_Like(username,recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
        recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
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
def Recipe_get_like_num(recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
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
    print(re_num)
    db.close()
    return re_num
def Recipe_show_comment(recipe_name,recipe_username):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
    recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
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
def User_comment_recipe(username,recipe_name,recipe_username,content):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
        recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
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
def User_comment_user(username,recipe_name,recipe_username,comment_id,content):
    qury_recipe = "SELECT Recipe_Id FROM sys.Recipe WHERE Recipe_Name = '%s' AND Recipe_Username = '%s';" % (
        recipe_name, recipe_username)
    qury_cursor = db.cursor()
    re_id = ''
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
def Comment_delete(comment_id):
    sql = "DELETE FROM sys.Recipe_Comment WHERE Comment_Id='%s' OR Comment_To='%s';"%(comment_id,comment_id)
    cursor = db.cursor()
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
    return True
def Search_Recipe(search_content,difficult='',style_name='',ingredient=''):
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
    try:
        ur_cursor.execute(ur_sql)
        re_ur = ur_cursor.fetchall()
    except Exception:
        db.rollback()
        print("get username num worng!!")
    db.close()
    return re_ur




# re='fry chicken'
fname = 'Ryan'
uname='Ryan'
frecipe = 'fry chicken'

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
# resty='fast food'
# ingr='chicken,oil'
# co_time=40
# ste='pure oil and fry chicken'
# rephoto='hhhhh'
# ing='potato'
# t='vegetable'
# Ingredient_Insert(ing,t)
# Recipe_Show(uname)
# Recipe_Delete(re,uname)
# Recipe_Insert_Update(re,uname,resty,ingr,co_time,ste,rephoto)
# User_Register(username, email, password)
# User_Login(username, password)
# print('hello world')
# Username_Check(username)
# cursor = db.cursor()
# cursor.execute("SELECT * FROM sys.User")
# data = cursor.fetchall()
# print(data)

# db.close()
