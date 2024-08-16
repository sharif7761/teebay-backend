Teebay project documentation:

Project setup:
frontend:
1. clone project: https://github.com/sharif7761/teebay-frontend.git
2. npm i
3. make and edit .env file from .env.example file and update api url
4. npm run dev

backend:
1. clone project: https://github.com/sharif7761/teebay-backend.git
2. npm i
3. make and edit .env file from .env.example file and update database url
4. npm run dev

database setup:
1. go to your SQL Shell (psql)
2. create database: CREATE DATABASE teebay
now run in node terminal:
1. npx prisma init
2. npx prisma generate
3. npx prisma migrate dev
4. npx prisma studio

NB: node version used: 20.10.0

Feature implemented:
1. User login
2. User registration
3. User can create product with multi step form 
4. User edit product
5. User view product details
6. User buy product
7. User rent product
8. User can see created products list
9. User can see other user’s created all products list
10. User can see sold product list
11. User can see bought product list
12. User can see borrowed product list
13. User can see lent product list
14. Product view count will be increased if a user visits product details page

Remaining task and scope of improvements:
1. While renting a product user have to input renting period (from date - to date)
2. Also more query optimization, code refactoring, reusable components and error handling
 

