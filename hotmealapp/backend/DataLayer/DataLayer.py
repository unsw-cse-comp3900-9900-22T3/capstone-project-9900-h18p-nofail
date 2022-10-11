import ConnectDB

db = ConnectDB.connectDb()

# username = 'HaoranNing'
# email = 'AIChaos@mail.com'
# password = '666nb!'


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

# User_Register(username, email, password)
# User_Login(username, password)
# Username_Check(username)
# cursor = db.cursor()
# cursor.execute("SELECT * FROM sys.User")
# data = cursor.fetchall()
# print(data)

db.close()
