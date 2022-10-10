import sqlite3, json
from flask import g, Flask, request

# https://www.jianshu.com/p/41d079549102

app = Flask(__name__)

DATABASE = './sqltest.db'

def get_db():
  db = getattr(g, '_database', None)
  if db is None:
    db = g._database = sqlite3.connect(DATABASE)
  return db

@app.teardown_appcontext
def close_connection(exception):
  db = getattr(g, '_database', None)
  if db is not None:
    db.close()

@app.route('/')
def index():
  cur = get_db().cursor()


@app.route('/select', methods=["GET"])
def hello():
  return_info = {}
  return_meta = { 'code'  : '200',
                  'status': 'success',
                  'msg'   : None }
  return_info['data'] = {}
  return_info['meta'] = return_meta
  db = get_db()
  cursor = db.cursor()
  cursor.execute("SELECT * FROM user_info")
  res    = cursor.fetchall()
  user_list = []
  for i in res:
    t_info = { 'user_id'   : str(i[0]),
               'user_name' : str(i[1]),
               'user_pass' : str(i[2]) }
    #return_info['data'][str(index)] = t_info
    user_list.append(t_info)
  return_info['data'] = user_list
  return json.dumps(return_info, ensure_ascii=False)


@app.route('/login', methods=["POST"])
def login():
  # 模板
  return_info  = {}
  return_meta = { 'code'  : '200',
                  'status': 'success',
                  'msg'   : None }
  return_info['data'] = None
  return_info['meta'] = return_meta
  # 获取请求值
  if request.get_data() is None:
    return_info['meta'] = { 'code'   : '504',
                            'status' : 'fail',
                            'msg'    : '请求参数为空' }
    return json.dumps(return_info, ensure_ascii=False)
  get_data = request.get_data()
  get_data = json.loads(get_data)
  username = get_data.get('username')
  password = get_data.get('password')
  return_info = {}
  return_info['data'] = {}
  return_info['meta'] = return_meta
  db     = get_db()
  cursor = db.cursor()
  sql    = ("SELECT * FROM user_info WHERE user_name='%s'" % username)
  cursor.execute(sql)
  user_list = cursor.fetchall()
  if len(user_list) != 1:
    return_info['meta'] = { 'code'   : '404',
                            'status' : 'fail',
                            'msg'    : '用户名不存在' }
    return json.dumps(return_info, ensure_ascii=False)
  db_password         = user_list[0][2]
  if db_password == password:
    return_info['meta'] = { 'code'   : '200',
                            'status' : 'success',
                            'msg'    : '登录成功' }
  else:
    return_info['meta'] = { 'code'   : '401',
                            'status' : 'fail',
                            'msg'    : '用户密码不匹配' }
  return json.dumps(return_info, ensure_ascii=False)

if __name__ == '__main__':
  app.debug = True # 设置调试模式，生产模式的时候要关掉debug
  app.run()