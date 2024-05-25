# BOOK Record Management System
Server >> Storing certain book data
       >> User Register
       >> Subscriber

### This is  a book record management API Server/ Backend for the library system or management of records or manauals or books

File System:
User:06/04/2024 - 06/06/2024
09/06/2024 => 50*3=150/- rupees fine

## Subscription Types
3 months(Basic)
6 months(Standard)
12 months(Premium)

If the subscription type is standard  and if the subscription date is 06/03/2024
=> Then subscription valid till 06/09/2024


within subscription date >> if we miss the renewal >>50/- day
subscription date is also been missed >> and also missed the renewal >> 100 + 50/- day

>> book1
>> basic
>> 06/04/2024 -> subscription date
>> 07/04/2024 -> borred a book from library 
>> book1 renewal date is on 21/04/2024
>> 23/04/2024 -> we need to pay a fine of 50*2=100/- day

>> book1
>> Standard
>> 06/04/2024 -> subscription date
>> 07/04/2024 -> borred a book from library
>> book1 renewal date is on 21/04/2024
>> 23/07/2024 -> we need to pay a fine of 100+50 

missed by renewal date >> 50/-
missed by subscription date >> 100/-
missed by renewal && subscription date >>150/-










# Routes and Endpoints

## /users
POST : create a new user
GET : Get all the user info here

## /users/(id) >> For single user
GET:Get a user by id 
PUT : Update a user by their id
DELETE : Delete a user by id (check if he/she still have an issued book) and (is there any fine to paid)

## /users/subscription-details/(id)
GET: Get user subscription details
    >> Date of subscription
    >> valid till
    >> Is there any fine

## /books
GET: Get all the books
POST:Create/Add a new book

## /books/(id)
GET : Get a book by id 
Put : Update b book id

## /books/issued
GET: Get all issued books

## /books/issued/withFine
GET:Get all issed books with their fine

## npm init
## npm install nodemon --save-dev -> npm run dev

...each 
    "name": "Jane",
    "surname": "Doe",
    "email": "user@email.com",
    "subscriptionType": "Premium",
    "subscriptionDate": "01/01/2024"

...data 
    {
  "data":{
    "name":"likhitha",
    "surname":"N"
  }
}



MVC Arch => 
 >> M: Modal (It depicts the structure of a mongodb collection)
 >> V: View (wrt to frontend (reactjs)
 >> c: Controllers (Brain or logical part of a route)
   >> books.controllers.js
   >> users.controllers.js
   )