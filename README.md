# 🚀 Eventify — Where Events Meet Innovation!

Eventify is a modern event management platform designed to simplify how users **create, manage, and collaborate on events** — all while ensuring **top-notch security** and **scalability**.

---

## ✨ Key Features

### 👤 User Module (Secure Authentication)

| Feature | Description | Security Method |
| :--- | :--- | :--- |
| **User Registration** | New users can sign up with their details. **Account verification** is initiated via an **OTP (One-Time Password)** sent to the registered email. | OTP via Email |
| **Email Verification** | The user must enter the received OTP to activate and store the account details in MongoDB. | OTP Validation |
| **Login** | Verified users can log in using credentials. A **JWT (JSON Web Token)** is generated for secure session management. | JWT Token |
| **Logout** | Authenticated users can securely end their session, invalidating the **JWT token**. | JWT Token |
| **Change Password** | Allows a logged-in user to securely update their password. | Requires Valid JWT |
| **Forgot Password** | Sends an **OTP** to the registered email for password recovery. | OTP via Email |
| **Reset Password** | After OTP verification, users can set a new password securely stored in the database. | OTP Verification |

---

### 🗓️ Event Module (Creation & Management)

| Feature | Description | Authorization |
| :--- | :--- | :--- |
| **Create Event** | Authenticated users can create new events and send initial invitations via email. | Required |
| **Invite Participants** | The event creator can invite additional users even after creation. | Creator Only |
| **List Events** | Displays events the user **created** or was **invited to**. | Required |
| **Filter Events** | Filter and paginate events based on search criteria. | Required |
| **Update & Delete** | Event creators can update or delete their own events. | Creator Only |

---

## 🔒 Security Highlights

To ensure **data integrity** and protect against misuse, Eventify implements several security layers:

- **Rate Limiting:** Global GraphQL-level rate limiting using `graphql-rate-limit` to prevent brute-force and DoS attacks.  
- **JWT Authentication:** Ensures secure user sessions.  
- **Email-based OTP Verification:** Adds an extra layer of protection for sensitive operations.

---

## 🧰 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | TypeScript, Express.js, GraphQL |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication & Security** | JWT, OTP (Email Verification), Global Rate Limiting |
| **Frontend** | Angular *(under development)* |

---

## 🧩 Project Status

🚧 **Angular Frontend Under Construction — Stay Tuned!**

The backend APIs are fully functional and production-ready. The Angular frontend is currently in progress to deliver a seamless and dynamic user experience.

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!  
If you’d like to collaborate or improve Eventify, feel free to open an issue or submit a pull request.

---

## 📬 Contact

Developed with ❤️ by [Samir Shaikh]  
📧 Email: [22amtics312@gmail.com]  
🌐 LinkedIn: [https://www.linkedin.com/in/samir-shaikh-760b932a8/]

---

### ⭐ Don’t forget to star this repo if you like the project!
