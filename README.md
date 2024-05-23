# miniproject
<b>ส่งงาน miniproject</b>

ชื่อ project : โปรแกรมระบบหลังบ้าน การจัดการสินค้า<br>
โดย เพชรไพฑูรย์ ศรีเมือง รหัส 7727031<br>
หน่วยงาน SOD<br>
ฟีเจอร์ node js<br>
<br>
วิธีการใช้งาน คือ <br>
1.ให้ติดตั้ง phpmyadmin เพื่อทำการ import file .sql เข้าที่ database ของเรา ซึ่งไฟล์จะอยู่ที่ folder ชื่อ database_install ให้ติดตั้งจากคู่มือด้านใน<br><br>
2.ให้ทำการ ติดตั้ง lib node js ให้ครับ<br>
  2.1) npm i express<br>
  2.2) npm i express-generator<br>
  2.3) npm i mysql2<br>
  2.4) npm i body-parser<br>
  2.5) npm i express-session<br>
  2.6) npm i ejs<br>
  2.7) npm i jquery<br>
  2.8) npm i create-react-app<br>
  2.9) npm i nodemon หรือ npm start<br><br>
3.ให้ทำการสั่งคำสั่งที่ terminal หรือ command line ว่า npm create-react-app frontend จากนั้นเมื่อติดตั้ง react เสร็จก็ให้สั่งทำการ npx nodemon ระบบก็จะสามารถเข้าหน้าเว็บไปที่ fronend ของ port 3001 คือ http://localhost:3000 อัตโนมัติ<br><br>
4.จากนั้นก็ เราจะมาที่หน้า backend นั้นคือ http://localhost:3001 ก็จะเข้าสู่่หน้า login ให้ทำการ register ลงทะเบียนจาก ปุ่ม register เพื้อไปสร้าง username และ password ก่อน<br><br>
5.จากนั้นทำการ login และเข้าไปที่หน้า dashboard ซึ่งจะไม่มีข้อมูลที่ฐานข้อมูลอะไร ให้ทำการคลิกปุ่ม เพิ่มสินค้า และใส่รายละเอียดเสร็จแล้วบันทึก<br><br>
6.จากนั้นจะทำการกลับมาหน้า dashboard ก็จะเห็นข้อมูล รายละเอียดสินค้าเป็นตาราง<br><br>
7.และถ้ากดปุ่ม logout ก็จะออก และลบ session ทิ้งไป หรือ จะรอประมาณ 1 ชั่วโมง ก็จะออกครับ<br><br>

ใน project ต่อยอดต่อในการทำให้สวยงามขึ้น และทำหน้า frontend ที่เชิ่อมต่อไว้แล้ว ที่ link : localhost:3001 ก็จะไปที่หน้า frontend สามารถทดสอบได้
