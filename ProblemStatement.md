**Problem Statement**

Managing multiple recurring payments like electricity bills, Wi-Fi, utility services, streaming subscriptions (e.g., Netflix), rent, insurance, and educational fees can be overwhelming and easy to forget. This often results in missed due dates, late payment fees, and service disruptions.

The primary problem this project solves is helping users stay on top of their recurring payments by sending them automated email reminders before the due date. In addition to timely reminders, the system also functions as a personal finance tracker, giving users a clear overview of their payment habits and upcoming financial commitments.

**Website Description (Rough Overview)**

The website is designed to be user-friendly and intuitive. Here's a rough flow:

* **Landing Page**: Welcomes users with basic information about the service and options to login or register.
* **Login/Register**: Users can create a new account or log in to access their personalized dashboard.

* *Reminder Dashboard*:

  * Displays a list of all reminders set by the user.
  * If no reminders are set, the dashboard prompts users to add one.
  * Includes a button to "Add Reminder", which opens a form for setting up reminders (e.g., title, amount, due date, category).
  * Another button allows users to navigate to the 'Finance Tracker Page'.

* *Finance Tracker Page*:

  * Displays visual statistics and charts of the user's spending habits.
  * Charts categorize spending into groups like entertainment, insurance, utilities, etc.
  * These statistics are generated using the reminder data as the source of financial information.

**User Accounts and Data Management**

The platform supports multiple user accounts, allowing each user to have their own private and secure data. All user information and reminders are securely stored in MongoDB, ensuring data integrity and accessibility while maintaining user privacy. JWT-based authentication is used to ensure secure access and protect sensitive user data during every session.


**Use Case**

1. Borrowing/lending Books to friends 
2.