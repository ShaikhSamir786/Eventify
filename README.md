# 🚀 Eventify — Where Events Meet Innovation!

## ✨ Key Features

### 👤 User Module (Secure Authentication)

| Feature | Description | Security Method |
| :--- | :--- | :--- |
| **User Registration** | A new user signs up by providing details. **Account verification** is initiated via **OTP (One-Time Password)** sent to the registered email. | OTP via Email |
| **Email Verification** | The user must enter the received OTP to activate and store the account details in MongoDB. | OTP Validation |
| **Login** | Verified users can log in using credentials. Successful login generates a **JWT (JSON Web Token)** for session management. | JWT Token |
| **Logout** | Authenticated users can securely end their session. The **JWT (JSON Web Token)** is invalidated or removed from the client. | JWT Token |
| **Change Password** | Allows a logged-in user to securely change their password. | Requires Valid JWT |
| **Forgot Password** | If a password is forgotten, an **OTP** is sent to the registered email to start the recovery process. | OTP via Email |
| **Reset Password** | After successful OTP verification, the user can set a new password, which is then securely saved in the database. | OTP Verification |

-----

### 🗓️ Event Module (Creation & Management)

| Feature | Description | Authorization |
| :--- | :--- | :--- |
| **Create Event** | Authenticated users can create a new event, including setting all details and sending initial invitations via email. | Required |
| **Invite Participants** | The creator can invite additional users via email even after the event has been created. | Creator Only |
| **List Events** | Users can view all relevant events, which includes: 1. **Events they created** and 2. **Events they were invited to**. | Required |
| **Filter Events** | Allows users to filter the list of events based on various criteria (e.g., pagination, search, etc.). | Required |
| **Update & Delete** | Event creators have full control to modify or completely remove their own events. | Creator Only |

-----

## 🔒 Security Note

To enhance the application's resilience against abuse and ensure data integrity, the following security measures are implemented:

  * **Rate Limiting:** Using **`graphql-rate-limit`** applied Globally to prevent **Brute-Force attacks** and denial-of-service attempts.



## 🚧 Angular Frontend Under Construction — Stay Tuned!


