# 🥗 Fudex - Modern Food Delivery & Management System

**Fudex** is a comprehensive full-stack food delivery application designed to bridge the gap between food lovers and professional chefs. The platform offers a seamless experience for users to order food and for chefs to manage their kitchen pipeline in real-time.

### 🌐 [Live Site URL](https://fudex.netlify.app/)

---

## 🎯 Purpose
The goal of Fudex is to provide a streamlined, real-time dashboard for food ordering. It empowers chefs with efficient order management tools and provides customers with a secure, user-friendly interface to explore culinary delights and track their meals.

---

## ✨ Key Features

* **⚡ Real-time Order Dashboard:** Dynamic status updates (Placed, Accepted, Delivered) for chefs to manage their workflow.
* **🛡️ Secure Authentication:** Integrated Google and Email/Password login powered by Firebase.
* **🧑‍💻 Role-Based Access:** Personalized dashboards for Admins (User management), Chefs (Order management), and Customers.
* **💳 Payment Tracking:** Instant visibility of payment status (Paid/Unpaid) for every incoming order.
* **🔍 Advanced User Management:** Admin capability to monitor users, search by credentials, and flag fraudulent accounts.
* **📱 Fully Responsive:** Beautifully crafted UI optimized for Mobile, Tablet, and Desktop using Tailwind CSS.
* **🔔 Instant Notifications:** Real-time feedback via `react-hot-toast` for all user actions.

---

## 🛠️ Tech Stack & Packages Used

### **Frontend (Client)**
- **React.js**: Library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide React**: For sleek and modern iconography.
- **React Router Dom**: For handling single-page navigation.
- **TanStack Query (React Query)**: For efficient data fetching, caching, and state sync.
- **Axios**: For making clean API requests.
- **React Hot Toast**: For non-blocking, elegant popup notifications.
- **Firebase**: For handling user authentication and security.

### **Backend (Server)**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **Cors & Dotenv**: For handling cross-origin requests and environment variable security.

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Tamim-real/Fudex]
    ```
2.  **Install Client & Server dependencies:**
    ```bash
    # For Client
    cd client && npm install

    # For Server
    cd server && npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the server directory and add your `MONGODB_URI` and Firebase credentials.
4.  **Run the application:**
    ```bash
    # Client
    npm run dev
    
    # Server
    npm start
    ```

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

---
