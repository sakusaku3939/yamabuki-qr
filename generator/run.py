
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import qrcode

cred = credentials.Certificate("generator/serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
      "databaseURL": 'https://yamabuki-qr-default-rtdb.firebaseio.com',
  })

ref = db.reference('announcers/')


a = ["有田ここ",
"伊藤優音",
"露木万水",
"中村優菜",
"吉野龍馬",
"大内心温",
"大泉海渡",
"清水一聡",
"伊東大和",
"青木勇樹",
"塩入君道",
"控井翔平",
"福地陽日輝",
"STプロジェクト",
"UD",
"電通大連携",]

for i in a:
  code = ref.push(i).key
  img = qrcode.make(code)
  img.save('qr/' + i + ".png")