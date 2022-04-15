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
* The Search section for users to look for the sources they want.
* The four web pages content, including the specific floor plan of each apartment. If the user clicks the apartment picture, it will jump into another page for the specific details of the apartment. For example, floor plan, rent price, deposit, pet policy, location, and contact information.
* It will give the user a direct comparison of different Amherst communities. For example, parking, location, safety, school District, and Maintenance. It will help users pick the best community for them.
---

**Data Model**

Our web page has 几个 major components: User Profiles. 

*  User profiles contains and shows user's personal information, each user has the unique user id. Also they can have other infomation that they want to store.


# Representation of APIs 
[APInterface List .pdf](https://github.com/326-queue/project/files/8491579/APInterface.List.pdf) 
![APInterface List ](https://user-images.githubusercontent.com/73546677/163459205-c8278c33-81e1-4bc7-8d6b-cba4d572c75f.JPG)


# Four screenshots of client interface 
### HengHuang:
**►We are tyring to help users to create thier account to log in our Web.** The corresponding API is /user/login

![Create](https://user-images.githubusercontent.com/73546677/163453778-ab960f2b-1df1-4d53-b2b1-05150b8ec7db.png)

**►Absolutely, the account for SIGN UP needs to be updated or created when it is necessary.** The corresponding API is /user/update

![delete/read](https://user-images.githubusercontent.com/73546677/163453787-40a3405e-5e12-49b6-a954-ca5c2d93e330.png)

**►After signing up, users can easily use our web to search any apertments they want.** The corresponding API is /user/search

![Search/read](https://user-images.githubusercontent.com/73546677/163453780-90c1a14c-b89d-4c88-8931-df055e4855da.png)

**►Addtionally, they can readly add the one they are interested in into their Favourite, which is the sign of "STAR---★". They picture below are briefly show how does it look like.** The corresponding API is /user/read/add/update/delete

![Update](https://user-images.githubusercontent.com/73546677/163453784-84db3c39-dd49-45b1-b6a1-31aa6043dd8f.png)


### JY:
**►I set up a better interface for sign up.**
The corresponding API is /user/create
![signup](https://user-images.githubusercontent.com/90345005/163463073-2d8b09ad-a05e-46ad-912b-9d8846943bcb.jpg)

**►If we sign up, we should have a page to login.**
The corresponding API is /user/login
<img width="960" alt="login" src="https://user-images.githubusercontent.com/90345005/163463114-66e23937-e8a3-4a4b-b640-50bf8d12082c.png">

**►I also update the inteface for this part. After login, users can update to his account infomation page to change the infomation that he want to change, example would be like Name**
the corresponding API is /user/changename and /user/deleteaccount
User doesn't have 4 pages because the Update and Delete is in the same page.
<img width="960" alt="userinfo" src="https://user-images.githubusercontent.com/90345005/163463172-fdf34758-b31e-42e1-a8e0-97b7b6d2131a.png">

# The Division of Labor

### Jianye Nie:
1. Set up the page for user to create an account for using the website.
2. Set up the page for user to login.
3. Set up the page for user to update his infomation and store the important component such as favorite apartment.
4. Set up a dangerous button for user to delete his account.

### Heng Huang: 
1. Optimize the use of log in and sign up. Only people who sign up can log in our Web to look for the apartment. 
2. Add the UPDATE to user sign up.
3. Add a SEARCH, which is beneficial to search what user want.
4. Add a FAVORITE, which users can add the apartments their like into the lists folder.

# The URL of your Heroku Application



