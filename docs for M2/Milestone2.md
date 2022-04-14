### TEAM NAME
* Dynamicprogram
---
### WEB APPLICATION NAME
* Amherstbnb
---
### Team Overview
* Heng Huang , HengHuang123
* Jianye Nie(JY), hideonbase
* Junming Li, junmingli1
* Rui wang BaoYuZai
---
### Innovative Idea
* To meet the housing needs of college students, our team plans to coordinate the demand analysis and development and design of the housing rental mini-program and be responsible for connecting with customers and marketing, such as promoting around the campus, raising project funds, and other key development of apartments around the campus, discussing cooperation and communication with major developers and property developers.
---
### Important Data
* The Sign-in and Sign-up stores users' information and data.
* The chat section for users to communicate in real-time.
* The four web pages content, including the specific floor plan of each apartment. If the user clicks the apartment picture, it will jump into another page for the specific details of the apartment. For example, floor plan, rent price, deposit, pet policy, location, and contact information.
* It will give the user a direct comparison of different Amherst communities. For example, parking, location, safety, school District, and Maintenance. It will help users pick the best community for them.
---

# Representation of APIs 
Interface List
Jy:
 First of everything, you should create an account
Register User: Request: curl --location --request PUT 'http://localhost:3000/user/create \ --header 'Content-Type: application/json' \
 --data-raw '{ "username":"",
"password":"", "telephone":"", "nickname":""
}' Response: {
"code": 0,
"message": "register success" }
After you create an account, you want to login.
Login request: Request: curl --location --request PUT 'http://localhost:3000/user/login' \ --header 'Content-Type: application/json' \
 --data-raw '{ "username":"", "password":"", }' Response: {
"code": 0,
"message": "login success" }
You also can update the infomation after you create and successfully login
Update User: Request: curl --location --request PUT
 'http://localhost:3000/user/update \ --header 'Content-Type: application/json' \ --data-raw '{// you can’t change the username "password": changed,
 "telephone": changed, "nickname": changed, }' Response: {

 "code": 0,
"message": "update success" }
You also can read all the information that the user has.
Read User: Request: curl --location --request PUT 'http://localhost:3000/user/update \ --header 'Content-Type: application/json' \
--data-raw '{ }'
 Response: { }
"code": 0,
"message": "read success" “data”:{
"username": changed,
"password": changed, "telephone": changed, "nickname": changed, }
You also can delete the current user after you successfully login
Delete User: Request: curl --location --request PUT 'http://localhost:3000/user/delete
 \ --header 'Content-Type: application/json' \ --data-raw '{ "username":,
}' Response: {
"code": 0,
"message": "delete success" }
Heng Huang:
Register User: Request:
 curl --location --request PUT 'http://localhost:3000/customer' \ --header 'Content-Type: application/json' \
--data-raw '{
 "username":"",
"password":"",
"telephone":"",

 }'
"nickname":""
Response:
Login:
Request:
curl --location --request POST 'http://localhost:3000/customer' \ --header 'Content-Type: application/json' \
--data-raw '{
"username":"", "password":"",
}' Response:
Get Customer Detail
Request:
curl --location --request GET 'http://localhost:3000/customer/test' \ --data-raw ''
Response:
 {
"code": 0,
"message": "register success" }
 {
"code": 0,
"message": "login success" }
 {
"code": 0,
    "msg": "get user detail success",
    "data": {
"username": "test", "password": "123456", "telephone": "12345678901", "nickname": "test's nickname"
}
 }
Update Customer Detail Request:
 curl --location --request PUT 'http://localhost:3000/customer/test' \
 --header 'Content-Type: application/json' \
--data-raw ' {"username": "test",
        "password": "123456",

 }'
Response
get house list Request
Response:
"telephone": "12345678901", "nickname": "test'\''s nickname"
 {
"code": 0,
"message": "update user info success" }
 curl --location --request GET 'http://localhost:3000/house' \ --data-raw ''
{
"code": 0,
    "msg": "get house list success",
    "data": [
{
"id": 1,
            "cover": "/imgs/2.jpg",
            "title": "Kendrick Place",
            "address": "beijin hai ding",
            "type": "3 house 2 halls",
            "typeImage": "/imgs/details/KP1B.JPG",
            "area": "100",
  "floor": "1", "price": "100000", "fav": true
}, {
"id": 2,
"cover": "/imgs/3.jpg",
"title": "Aspen Heights",
"address": "ShangHai",
"type": "3 house 2 halls",
"typeImage": "imgs/details/AS3B2B.PNG",
 "area": "120", "floor": "8", "price": "2000", "fav": false
},
 {
"id": 3,
    "cover": "/imgs/4.jpg",

     "title": "North square",
    "address": "JiangSu",
    "type": "3 house 2 halls",
    "typeImage": "imgs/details/AS3B2B.PNG",
    "area": "130",
"floor": "20", "price": "9876", "fav": false
},
 } ]
}
{
"id": 4,
"cover": "/imgs/5.jpg",
"title": "Olympia Place",
"address": "ChnagZhou",
"type": "3 house 2 halls",
"typeImage": "imgs/details/AS3B2B.PNG",
"area": "88",
"floor": "6", "price": "1234", "fav": true
Search House Request:
Response:
 curl --location --request GET 'http://localhost:3000/search?kw=sth' \ --data-raw ''
 {
"code": 0,
    "msg": "get house list success",
    "data": [
{
"id": 3,
            "cover": "/imgs/4.jpg",
 "title": "North square",
"address": "JiangSu",
"type": "3 house 2 halls",
"typeImage": "imgs/details/AS3B2B.PNG",
"area": "130",
     "floor": "20",
    "price": "9876"
}

 ] }
Get House Detail Request:
Response:
 curl --location --request GET 'http://localhost:3000/house/1' \ --data-raw ''
 {
"code": 0,
     "msg": "get house list success",
    "id": 4,
    "cover": "/imgs/5.jpg",
    "title": "Olympia Place",
    "address": "ChnagZhou",
"type": "3 house 2 halls", "typeImage": "imgs/details/AS3B2B.PNG", "area": "88",
"floor": "6",
"price": "1234"
}
get favorite
Request:
curl --location --request POST 'http://localhost:3000/favourite' \ --header 'Content-Type: application/json' \
--data-raw '{
"username":"username" }'
Response:
 {
"code": 0,
    "msg": "get favourite list success",
    "data": [
{
"id": 1,
            "cover": "/imgs/2.jpg",
            "title": "Kendrick Place",
 "address": "beijin hai ding",
"type": "3 house 2 halls",
"typeImage": "/imgs/details/KP1B.JPG",
"area": "100",
"floor": "1",
     "price": "100000",
"fav": true },

 {
"id": 4,
    "cover": "/imgs/5.jpg",
    "title": "Olympia Place",
    "address": "ChnagZhou",
    "type": "3 house 2 halls",
    "typeImage": "imgs/details/AS3B2B.PNG",
    "area": "88",
    "floor": "6",
 ] }
    "price": "1234",
"fav": true }
add favorite
Request:
curl --location --request POST 'http://localhost:3000/favorite/1' \ --header 'Content-Type: application/json' \
--data-raw '{
"username":"username" }'
Response
delete favorite
Request:
curl --location --request DELETE 'http://localhost:3000/favorite/1' \ --header 'Content-Type: application/json' \
--data-raw '{
"username":"username" }'
Response:
 {
"code": 0,
"message": "add favourite success"
 }
 {
 "code": 0,
"message": "delete favourite success" }


# Four screenshots of your client interface 
We are tyring to help users to create thier account to log in our Web. 
![Create](https://user-images.githubusercontent.com/73546677/163453778-ab960f2b-1df1-4d53-b2b1-05150b8ec7db.png)
Absolutely, the account for SIGN UP needs to be updated or created when it is necessary. 
![Search/read](https://user-images.githubusercontent.com/73546677/163453780-90c1a14c-b89d-4c88-8931-df055e4855da.png)
After signing up, users can easily use our web to search any apertments they want. 
![Update](https://user-images.githubusercontent.com/73546677/163453784-84db3c39-dd49-45b1-b6a1-31aa6043dd8f.png)
Addtionally, they can readly add the one they are interested in into their Favourite, which is the sign of "STAR---★". They picture below are briefly show how does it look like.
![delete/read](https://user-images.githubusercontent.com/73546677/163453787-40a3405e-5e12-49b6-a954-ca5c2d93e330.png)

**The division of labor**

Heng Huang: 
1. Optimize the use of log in and sign up. Only people who sign up can log in our Web to look for the apartment. 
2. Add the UPDATE to user sign up.
3. Add a SEARCH, which is beneficial to search what user want.
4. Add a FAVORITE, which users can add the apartments their like into the lists folder.
 
