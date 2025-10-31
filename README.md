Saving Frontend (React + Vite + Redux Toolkit)

The Saving Frontend is a web application built with React, Vite, and Redux Toolkit that provides both Admin Management and Customer (Client) features for a digital savings system.

It allows admins to manage customers, balances, and devices, and enables customers to perform deposits, withdrawals, and view their transaction history.

🧩 Tech Stack
Layer	Technology
Framework	React 18 + Vite
Language	TypeScript
State Management	Redux Toolkit + React Redux
Styling	Tailwind CSS
Routing	React Router DOM
API Communication	RTK Query


🗂️ Folder Structure
SAVING-FRONTEND/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── app/               # Redux store setup and slices
│   ├── assets/            # Images and static resources
│   ├── Components/        # Shared reusable UI components (modals, cards, inputs)
│   ├── pages/             # Page-level components (Login, Dashboard, etc.)
│   ├── Routes/            # Route definitions & protected routes
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Entry point (React DOM rendering)
│   ├── App.css
│   └── index.css
│
├── .env                   # Environment variables
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md

🚀 Features
🧭 Admin Management Features

Authentication – Secure admin login using JWT.

Manage Customers – View, edit, and manage registered customers.

Device Verification – Validate or approve device IDs used by customers.

Balance & Transaction Management – View all balances and transaction history.

Statistics Dashboard (optional) – Display charts and metrics such as:

Total customers

Total deposits

Total withdrawals

Activity trends over time

👤 Client Features

Customer Registration & Login – Secure signup and login flow.

Dashboard – Display balance and transaction history.

Deposit / Withdraw Forms – Add or withdraw funds with instant feedback.

Low Balance Alerts – Notifications when balance falls below threshold.

Push Notifications (if mobile) –

Deposit confirmation

Withdrawal alerts

Low balance warnings

Device verification and successful login


⚙️ Setup and Installation
1️⃣ Clone the Repository
git clone https://github.com/TCorneille /saving-frontend.git
cd saving-frontend

Install Dependencies
npm install





Run Development Server
npm run dev






🧰 Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Build for production

🧪 Example Admin Credentials (for testing)
Email: corneille@example.com  
Password: password123





🧑‍💻 Author

Emmanuel Tumwizere