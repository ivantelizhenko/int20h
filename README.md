## FRONTEND STACK FOR HACKATHON
<a href="https://skillicons.dev">
    <img width="100px" src="https://skillicons.dev/icons?i=react,ts,vite" />
  </a>



## BACKEND STACK FOR HACKATHON
<a href="https://skillicons.dev">
    <img width="200px" src="https://skillicons.dev/icons?i=nodejs,express,js,postgres,postman" />
  </a>



# How to run project (Backend)

You can run the project locally and connect to your own server instance.

Alternatively, you can use the deployed version hosted on Render.

⚠️ Note: The Render free-tier server may experience a cold start.
If the service has been inactive, the first request can take up to 2–3 minutes while the server spins up.

# Instruction for setuping project (**Local development**)

## Zero Step
Open your code editor -> Open Terminal -> Clone this repository to your computer using 
```bash
  git clone https://github.com/ivantelizhenko/int20h.git
```
## First Step
Move to backend directory and install the dependencies for your backend application

```bash
  cd backend
  npm i
```


## Second Step

Copy env-example structure for your .env file 

```bash
cp .env-example .env
```

After this fill the fields with your database values (⚠️ Note that sequelize in this project designed for postgresql database so you need to use postgresql database for successful connection)

## Third Step

Run your backend application

In your backend directory run command
```bash
npm run dev 
```
It runs backend on  http://localhost:3000



Note:  You can test this application via Postman 


# ROUTES

All backend routes are grouped under the `/api` prefix.

This approach provides:

- Clear separation between API endpoints and frontend routes
- Better scalability for future microservices
- Cleaner versioning strategy (e.g., `/api/v1`)
- Improved readability of the project structure

## LOCAL ROUTES

**GET ALL ORDERS (GET)**
<br>
http://localhost:3000/api/orders



**CREATE ORDER (POST)**
<br>
http://localhost:3000/api/orders



**IMPORT CSV FILE WITH ORDERS (POST)**
<br>
http://localhost:3000/api/orders/import


## RENDER ROUTES

**GET ALL ORDERS (GET)**
<br>
https://int20h-bm85.onrender.com/api/orders


**CREATE ORDER (POST)**
<br>
https://int20h-bm85.onrender.com/api/orders

**IMPORT CSV FILE WITH ORDERS (POST)**
<br>
https://int20h-bm85.onrender.com/api/orders/import



