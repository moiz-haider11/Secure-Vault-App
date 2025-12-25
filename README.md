# 🔐 Secure Vault - Share Secrets Securely

Secure Vault is a full-stack web application designed to share sensitive information (like passwords, API keys, or secret notes) securely. Once the conditions (Time or View Limit) are met, the secret is permanently deleted from the database.

## 🚀 Live Demo
*(Link will be added after deployment)*

## ✨ Features

- **Auto-Destruction:** Secrets are automatically deleted after a set time (e.g., 1 hour) or specific view count (e.g., 5 views).
- **Secure Links:** Unique, one-time generation links for every secret.
- **Passcode Protection:** Optional extra security layer with a password for accessing the secret.
- **User Dashboard:** Users can track their active vaults and view status.
- **Authentication:** Secure Login & Registration using JWT (JSON Web Tokens).

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with TTL Indexing for auto-expiry)
- **Authentication:** JWT & Bcrypt
- **Styling:** CSS3

## ⚙️ How It Works

1. **Create:** Log in and create a secret message.
2. **Set Rules:** Choose how long the message lasts (e.g., 10 mins) or how many people can see it.
3. **Share:** Copy the generated link and send it to the recipient.
4. **Vanish:** Once the limit is reached, the message is gone forever!

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/moiz-haider11/Secure-Vault-App.git](https://github.com/moiz-haider11/Secure-Vault-App.git)

2. Backend Setup
Go to the backend folder and install dependencies:
```bash
   cd backend
   npm install
```
Create a .env file inside the backend folder and add the following keys:
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=some_super_secret_key
PORT=5000

3. Frontend Setup
Go to the frontend folder and install dependencies:

```bash

cd ../frontend
npm install
```
4. Run the Application
Open two separate terminals (one for backend, one for frontend).

Terminal 1 (Backend):

```bash

cd backend
npm start
```
Server will run on https://secure-vault-api.vercel.app

Terminal 2 (Frontend):

```Bash

cd frontend
npm start
```
App will open on http://localhost:3000

📂 Project Structure
secure-vault/
│
├── backend/          # Node.js & Express Server
│   ├── models/       # Database Schemas
│   ├── routes/       # API Routes
│   └── server.js     # Entry point
│
├── frontend/         # React Application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
└── README.md         # Project Documentation

🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

Built with ❤️ using the MERN Stack.