Teebay project documentation
Project setup
frontend
clone project: https://github.com/sharif7761/teebay-frontend.git
npm i
make and edit .env file from .env.example file and update api url
npm run dev

backend
clone project: https://github.com/sharif7761/teebay-backend.git
npm i
make and edit .env file from .env.example file and update database url
npm run dev

database setup
go to your SQL Shell (psql)
create database: CREATE DATABASE teebay
now run in node terminal:
npx prisma init
npx prisma generate
npx prisma migrate dev
npx prisma studio

NB: node version used: 20.10.0

Feature implemented
User login
User registration
User can create product with multi step form 
User edit product
User view product details
User buy product
User rent product
User can see created products list
User can see other user’s created all products list
User can see sold product list
User can see bought product list
User can see borrowed product list
User can see lent product list
Product view count will be increased if a user visits product details page

Remaining task and scope of improvements
While renting a product user have to input renting period (from date - to date)
Also more query optimization, code refactoring, reusable components and error handling
 

