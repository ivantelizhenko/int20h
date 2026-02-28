# Instant Wellness Kits - Tax Calculator Admin Panel

## 💡 Solution Overview
Because of the extreme time limit, our primary focus was on building a reliable business solution rather than a complex technical architecture. We created a functional admin panel that includes:

* **Importing CSV:** A feature to upload files with historical order data for automated tax calculation.
* **Manual Creation:** A form to enter geographic coordinates (or select a point on the map) and the order price to instantly calculate and save the applicable taxes.
* **Orders List:** A comprehensive data table showing all orders, the calculated taxes, and options for filtering and pagination.

## 🚀 Perspectives & Backlog (Future Work)
This solution successfully prevents immediate regulatory action, but it remains a Minimum Viable Product. For future iterations, the following improvements are planned:

* **Authentication & Authorization:** Adding a secure Auth system (like JWT) and managing User/Role access is the highest priority for this internal tool.
* **Security Enhancements:** Implementing rate limiting, strict CORS policies, and advanced validation for backend endpoints.
* **Frontend Refactoring:** Moving shared UI components into a common folder to keep the codebase clean and maintainable.
* **Localization (i18n):** Translating the interface to support a multi-language workforce.

---

# 💻 Frontend Application

## Instruction for setuping project (Local development)

### Zero Step
Open your code editor -> Open Terminal -> Clone this repository to your computer using:
```bash
    git clone https://github.com/ivantelizhenko/int20h.git
```
### First Step
Move to the frontend directory and install the dependencies:
```bash
    cd frontend
    npm install
```
### Second Step
Copy env-example structure for your .env file:
```bash
    cp .env-example .env
```
### Third Step
Run your frontend application:
```bash
    npm run dev
```
It runs the frontend on http://localhost:5174

---

# ⚙️ Backend Application

You can run the project locally and connect to your own server instance.
Alternatively, you can use the deployed version hosted on Render.

⚠️ **Note:** The Render free-tier server may experience a cold start. If the service has been inactive, the first request can take up to 2–3 minutes while the server spins up.

## Instruction for setuping project (Local development)

### Zero Step
(If you haven't cloned the repo yet)
Open your code editor -> Open Terminal -> Clone this repository to your computer using:
```bash
    git clone https://github.com/ivantelizhenko/int20h.git
```
### First Step
Move to the backend directory and install the dependencies for your backend application:
```bash
    cd backend
    npm i
```
### Second Step
Copy env-example structure for your .env file:
```bash
    cp .env-example .env
```
After this fill the fields with your database values. (⚠️ Note: Sequelize in this project is designed for PostgreSQL databases, so you need to use a PostgreSQL database for a successful connection).

### Third Step
Run your backend application. In your backend directory run the command:
```bash
    npm run dev
```
It runs backend on http://localhost:3000

Note: You can test this application via Postman.

---

# 📡 ROUTES

All backend routes are grouped under the /api prefix.
This approach provides:
- Clear separation between API endpoints and frontend routes
- Better scalability for future microservices
- Cleaner versioning strategy (e.g., /api/v1)
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