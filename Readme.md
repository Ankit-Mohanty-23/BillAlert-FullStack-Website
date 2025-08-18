# 🚀 BillAlert

## 📝 Problem Statement
Managing multiple recurring payments like electricity bills, Wi-Fi, utility services, streaming subscriptions (e.g., Netflix), rent, insurance, and educational fees can be overwhelming and easy to forget.  
This often results in missed due dates, late payment fees, and service disruptions.

BillAlert solves this problem by helping users stay on top of their recurring payments through **automated email reminders** before due dates.  
Additionally, it acts as a **personal finance tracker**, giving users insights into their payment habits and upcoming financial commitments.

---

## 🌐 Website Overview

- **Landing Page** – Welcomes users with project info + login/register options.  
- **Login/Register** – Secure authentication with JWT, enabling personalized dashboards.  
- **Reminder Dashboard**  
  - Displays user’s reminders in a clean list.  
  - "Add Reminder" form (title, amount, due date, category).  
  - Shortcut to **Finance Tracker Page**.  
- **Finance Tracker Page**  
  - Interactive charts & statistics of spending habits.  
  - Categories like entertainment, utilities, rent, insurance, subscriptions, etc.  
  - All data comes from user’s reminders, acting as a built-in finance tracker.  

---

## 🔐 User Accounts & Data Management
- Each user has a private, secure account.  
- All data stored in **MongoDB**.  
- **JWT-based authentication** ensures secure sessions.  

---

## 📌 Use Cases for BillAlert
- 💡 **Utility Bills** – Electricity, water, gas, or internet.  
- 📚 **Borrowed/Lent Items** – Books, gadgets, or money reminders.  
- 🏫 **College/School Fees** – Avoid late submission fines.  
- 💳 **Credit Card Payments** – On-time due date alerts.  
- 🚗 **Vehicle EMI/Insurance** – Track monthly EMIs or renewals.  
- 🛒 **Subscriptions** – Netflix, gym, OTT, or software renewals.  
- 🏠 **Rent Payments** – Monthly rent reminders.  
- 💼 **Business Invoices** – Small business owners can track client payments.  

---

## 🛠️ Tech Stack
- **Frontend**: React + Tailwind CSS  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Email Notifications**: Nodemailer  
