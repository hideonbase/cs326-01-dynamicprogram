# TEAM NAME
* Dynamicprogram
---
# WEB APPLICATION NAME
* Amherstbnb
---
# Team Overview
* Heng Huang , HengHuang123
* Jianye Nie(JY), hideonbase
* Junming Li, junmingli1
* Rui wang BaoYuZai
---
# Innovative Idea
* To meet the housing needs of college students, our team plans to coordinate the demand analysis and development and design of the housing rental mini-program and be responsible for connecting with customers and marketing, such as promoting around the campus, raising project funds, and other key development of apartments around the campus, discussing cooperation and communication with major developers and property developers.
---
# Important Data
* The Sign-in and Sign-up stores users' information and data.
* The chat section for users to communicate in real-time.
* The Search section for users to look for the sources they want.
* The four web pages content, including the specific floor plan of each apartment. If the user clicks the apartment picture, it will jump into another page for the specific details of the apartment. For example, floor plan, rent price, deposit, pet policy, location, and contact information.
* It will give the user a direct comparison of different Amherst communities. For example, parking, location, safety, school District, and Maintenance. It will help users pick the best community for them.
* Users who sign up for an account can post comments on the details of each apartment, such as their personal experience, reasonable prices and security conditions.
---

# Data Model

### Elements:

   ### 1. Main Web
   ### 2. Web Browser
   ### 3. User Profiles 
   ### 4. Box Chatting
   ### 5. Search Engine 
   ### 6. Favourite List

 
*  Main Web/Web Browser -- For any users who browse our website for house renting.
*  User profiles contains and shows user's personal information, each user has the unique user id. Also they can have other infomation that they want to store.
*  Box Chatting -- For users better connect with agents if they need.
*  Search Engine -- Search any information about the apartments.
*  Favourite List -- Add anything that users are interested in.




# Representation of APIs 

[Heng Huang APInterface List.pdf](https://github.com/hideonbase/cs326-01-dynamicprogram/files/8517667/Heng.Huang.APInterface.List.pdf.pdf)

[JianYe Nie APInterface List.pdf](https://github.com/hideonbase/cs326-01-dynamicprogram/files/8517671/JianYe.Nie.pdf)

[Juming Li API Planning.pdf](https://github.com/hideonbase/cs326-01-dynamicprogram/files/8517666/Juming.Li.API.Planning.pdf)

[RuiWangAPIplan.pdf](https://github.com/hideonbase/cs326-01-dynamicprogram/files/8517669/RuiWangAPIplan.pdf)

![APInterface List ](https://user-images.githubusercontent.com/73546677/163459205-c8278c33-81e1-4bc7-8d6b-cba4d572c75f.JPG)
![RW1](https://user-images.githubusercontent.com/78442520/164129519-2676e08a-9a61-4608-b5cd-c8ef2a5d44db.PNG)
![RW2](https://user-images.githubusercontent.com/78442520/164129538-3c3ff9f7-c981-4077-b0a4-cd6b17713ad1.PNG)
![RW3](https://user-images.githubusercontent.com/78442520/164129547-cbefefda-db71-49d8-9422-c50f4e479f03.PNG)
![RW4](https://user-images.githubusercontent.com/78442520/164129557-a6361505-141f-4009-a4a3-5a13fee0f51a.PNG)
![APi](https://user-images.githubusercontent.com/98610173/163722588-e481d35a-e254-4b1d-adf8-6560965d5d56.png)

# Four screenshots of client interface 
### HengHuang:
**???We are tyring to help users to create thier account to log in our Web. The corresponding API is /user/login.**

![Create](https://user-images.githubusercontent.com/73546677/163453778-ab960f2b-1df1-4d53-b2b1-05150b8ec7db.png)

**???Absolutely, the account for SIGN UP needs to be updated or created when it is necessary. The corresponding API is /user/update.** 

![delete/read](https://user-images.githubusercontent.com/73546677/163453787-40a3405e-5e12-49b6-a954-ca5c2d93e330.png)

**???After signing up, users can easily use our web to search any apertments they want. The corresponding API is /user/search.** 

![Search/read](https://user-images.githubusercontent.com/73546677/163453780-90c1a14c-b89d-4c88-8931-df055e4855da.png)

**???Addtionally, they can readly add the one they are interested in into their Favourite, which is the sign of "STAR---???". They picture below are briefly show how does it look like. The corresponding API is /user/read/add/update/delete.** 

![Update](https://user-images.githubusercontent.com/73546677/163453784-84db3c39-dd49-45b1-b6a1-31aa6043dd8f.png)

### Rui Wang:
**???The user can add their comments in the bottom of our webpage.**
![KPcommentsShow](https://user-images.githubusercontent.com/78442520/163698092-4f524ae6-fd05-4e88-ad7a-f221deeb43a3.PNG)

**???Details of the apartment introduction in our webpage.**
![DETAIL1](https://user-images.githubusercontent.com/78442520/164131182-c46fa684-7053-4891-aaea-0d4eff373505.PNG)
![DETAIL2](https://user-images.githubusercontent.com/78442520/164131199-71ac1b87-c35f-4b9d-8f46-114e9589468c.PNG)


### Junming Li
**???People can like/dislike the apartment to show their preferences.**
![7bbf6c24cc5892e2a7446cdb0b74934](https://user-images.githubusercontent.com/98610173/163722722-dca3b652-01bb-424c-923a-e48b7c2084ae.png)
### JY:
**???I set up a better interface for sign up. The corresponding API is /user/create.**

![signup](https://user-images.githubusercontent.com/90345005/163463073-2d8b09ad-a05e-46ad-912b-9d8846943bcb.jpg)

**???If we sign up, we should have a page to login. The corresponding API is /user/login.**

<img width="960" alt="login" src="https://user-images.githubusercontent.com/90345005/163463114-66e23937-e8a3-4a4b-b640-50bf8d12082c.png">

**???I also update the inteface for this part. After login, users can update to his account infomation page to change the infomation that he want to change, example would be like Name. User doesn't have 4 pages because the Update and Delete is in the same page. The corresponding API is /user/changename and /user/deleteaccount.**

<img width="960" alt="userinfo" src="https://user-images.githubusercontent.com/90345005/163463172-fdf34758-b31e-42e1-a8e0-97b7b6d2131a.png">

# The Division of Labor

### Jianye Nie:
1. Set up the page for user to create an account for using the website.
2. Set up the page for user to login.
3. Set up the page for user to update his/her infomation and store the important component such as favorite apartment.
4. Set up a dangerous button for user to delete his/her account.
5. Assist Heng Huang to merge the project.

### Heng Huang: 
1. Optimize the use of log in and sign up. Only people who sign up can log in our Web to look for the apartment. 
2. Add the UPDATE to user sign up.
3. Add a SEARCH, which is beneficial to search what user want.
4. Add a FAVORITE, which users can add the apartments their like into the lists folder.
5. Merging all the codes together into a big project.
6. Depoly to Heroku

### Rui Wang:

1. The user comment function has been implemented in four pages of the website.
2. Only registered users can review apartments.
3. Administrators can manage the content of user comments in the back-end database.
4. Optimized web content.The previous introduction pages of the four different apartments contained few contents, only the apartment type map, apartment policies and  rental prices.A lot of new content has been added.For example, the text description of the apartment, the features of the apartment, the facilities offered by the apartment and the specific photos of the apartment.
5. More elements are added to CSS documents to improve the aesthetics of the page.

### Junming Li:
1. Add new css/html feature to the page.
2. Follow Heng Huang's instructions to assist the project.
3. The number of clicks liked/disliked by users for the four different apartments is calculated.
4. Adding 4 different API on the like/dislike(In the code folder need to merge). 

# The URL of your Heroku Application
### Version one : https://amherst-bnb.herokuapp.com/
### Version two : https://amherstbnb3.herokuapp.com


