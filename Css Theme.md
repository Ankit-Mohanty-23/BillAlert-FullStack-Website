# BillAlert Landing Page Theme Guide

## Core Color Palette

### Background Colors
- **Primary Background**: `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`
- **Secondary Background**: `bg-slate-800/50` (semi-transparent overlay)
- **Section Backgrounds**: 
  - `bg-gradient-to-r from-purple-900/50 to-pink-900/50`
  - `bg-gradient-to-r from-purple-600 to-pink-600`
  - `bg-slate-900` (footer)

### Brand Colors
- **Purple Accent**: `text-purple-400`, `bg-purple-600`, `border-purple-400`
- **Pink Accent**: `text-pink-400`, `bg-pink-600`
- **Gradient Text**: `bg-gradient-to-r from-purple-400 to-pink-400`
- **Button Gradients**: `bg-gradient-to-r from-purple-600 to-pink-600`

### Status/Accent Colors
- **Success Green**: `text-green-400`, `bg-green-600`
- **Warning Red**: `text-red-400`, `bg-red-500/20`
- **Info Blue**: `bg-blue-600`
- **Warning Yellow**: `text-yellow-400`

### Text Colors
- **Primary Text**: `text-white`
- **Secondary Text**: `text-gray-300`
- **Muted Text**: `text-gray-400`, `text-gray-500`
- **Light Text**: `text-purple-100`

## Typography Scale

### Headings
- **Hero Title**: `text-5xl md:text-7xl font-bold`
- **Section Headers**: `text-4xl font-bold`
- **Subsection Headers**: `text-2xl font-bold`
- **Card Titles**: `text-xl font-semibold`
- **Feature Titles**: `text-lg font-semibold`

### Body Text
- **Hero Subtitle**: `text-xl md:text-2xl`
- **Large Text**: `text-2xl`
- **Regular Text**: `text-lg`
- **Small Text**: Default size

## Layout & Spacing

### Container Widths
- **Main Container**: `max-w-6xl mx-auto`
- **Content Container**: `max-w-4xl mx-auto`
- **Text Container**: `max-w-3xl mx-auto`

### Padding & Margins
- **Section Padding**: `px-6 py-20`
- **Navigation**: `px-6 py-4`
- **Hero Section**: `px-6 pt-20 pb-32`
- **Card Padding**: `p-6`, `p-8`
- **Button Padding**: `px-6 py-2`, `px-8 py-4`

### Grid Systems
- **Feature Grid**: `grid md:grid-cols-2 lg:grid-cols-4 gap-8`
- **Stats Grid**: `grid md:grid-cols-3 gap-6`
- **Two Column**: `grid lg:grid-cols-2 gap-12`

## Interactive Elements

### Buttons
- **Primary CTA**: 
  ```
  bg-gradient-to-r from-purple-600 to-pink-600 
  hover:from-purple-700 hover:to-pink-700 
  text-white px-8 py-4 rounded-full text-lg font-semibold 
  transition-all duration-300 transform hover:scale-105
  ```

- **Secondary Button**:
  ```
  border-2 border-purple-400 text-purple-400 
  hover:bg-purple-400 hover:text-white 
  px-8 py-4 rounded-full text-lg font-semibold 
  transition-all duration-300
  ```

- **Nav Button**:
  ```
  bg-purple-600 hover:bg-purple-700 text-white 
  px-6 py-2 rounded-full 
  transition-all duration-300 transform hover:scale-105
  ```

### Cards & Components
- **Feature Cards**: 
  ```
  bg-gradient-to-br from-[color]-600 to-[color]-800 
  p-6 rounded-2xl 
  group-hover:scale-105 transition-transform duration-300
  ```

- **Content Cards**: 
  ```
  bg-slate-800/50 p-8 rounded-2xl
  ```

- **Highlighted Cards**: 
  ```
  bg-gradient-to-r from-red-500/20 to-orange-500/20 
  p-8 rounded-2xl border border-red-500/30
  ```

## Animation & Effects

### Transitions
- **Standard Transition**: `transition-all duration-300`
- **Long Transition**: `transition-all duration-500`
- **Transform Transition**: `transition-transform duration-300`

### Hover Effects
- **Scale on Hover**: `hover:scale-105`
- **Group Hover**: `group-hover:scale-105`

### Animations
- **Bounce Effect**: `animate-bounce`, `animate-bounce delay-700`
- **Fade In**: 
  ```
  transform transition-all duration-1000
  translate-y-0 opacity-100 / translate-y-10 opacity-0
  ```

### Floating Elements
- **Floating Icons**: 
  ```
  absolute top-[position] left/right-[position] animate-bounce
  bg-purple-600/20 p-4 rounded-full
  ```

## Component Patterns

### Icon Containers
- **Feature Icons**: `h-12 w-12 text-white mx-auto`
- **Floating Icons**: `h-8 w-8 text-purple-400`
- **List Icons**: `h-5 w-5 text-green-400`

### Brand Logo Pattern
```
<Bell className="h-8 w-8 text-purple-400" />
<span className="text-2xl font-bold text-white">BillAlert</span>
```

### Gradient Text Pattern
```
text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400
```

## Section Structure Template

```jsx
<section className="px-6 py-20 [background-variant]">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-white text-center mb-16">
      Section Title
    </h2>
    {/* Content */}
  </div>
</section>
```

## Key Theme Characteristics

1. **Dark Theme**: Slate-900 base with purple/pink accents
2. **Gradient Heavy**: Extensive use of gradients for backgrounds and text
3. **Rounded Design**: Consistent use of `rounded-2xl` and `rounded-full`
4. **Interactive**: Hover effects and transforms on most interactive elements
5. **Modern Spacing**: Generous padding and clean grid layouts
6. **Purple-Pink Brand**: Consistent purple-to-pink gradient brand identity
7. **Semi-transparent Overlays**: Use of `/50`, `/20` opacity variants
8. **Responsive**: Mobile-first approach with `md:` and `lg:` breakpoints

This theme creates a modern, professional SaaS landing page feel with strong visual hierarchy and engaging interactions.



import nodemailer from "nodemailer";
import cron from "node-cron";
import dotenv from "dotenv";
import Bill from "../models/billModel.js";
import Client from "../models/clientModel.js";
import PayHistory from "../models/payHistoryModel.js";

dotenv.config();

// Function to format date in a readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Function to format date for display in email (shorter format)
const formatDateForEmail = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Function to calculate days left until due date
const calculateDaysLeft = (dueDate) => {
  const timeDiff = new Date(dueDate).getTime() - new Date().getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSWORD, // App password
  },
});

const sendMail = (bill, clientEmail, clientName) => {
  const daysLeft = calculateDaysLeft(bill.dueDate);

  // Apply red color if urgent (<= 2 days left)
  const dueDateStyle =
    daysLeft <= 2 ? "color: red; font-weight: bold;" : "color: black;";

  const duemsg =
    daysLeft >= 0
      ? `due in <strong>${daysLeft}</strong> day(s), on <strong style="${dueDateStyle}">${formatDate(
          bill.dueDate
        )}</strong>.`
      : `Overdue by <strong>${Math.abs(
          daysLeft
        )}</strong> day(s) (was due on <strong style="${dueDateStyle}">${formatDate(
          bill.dueDate
        )}</strong>)`;

  const mailOptions = {
    from: '"BillAlert"',
    to: clientEmail,
    subject: `BillAlert Payment Reminder: ${
      bill.name
    } due on ${formatDateForEmail(bill.dueDate)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 8px;">
        <h2 style="color: #e50914; text-align: center;">${
          bill.name
        } Reminder</h2>
        <p>Dear <strong>${clientName}</strong>,</p>
        <p>This is a friendly reminder that your payment for <strong>${
          bill.name
        }</strong> is ${duemsg}
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Category</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${
              bill.category
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Amount</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">₹${
              bill.amount
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Due Date</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; ${dueDateStyle}">${formatDate(
      bill.dueDate
    )}</td>
          </tr>
        </table>
        ${
          bill.note
            ? `<p style="margin-top: 15px;"><strong>Note:</strong> ${bill.note}</p>`
            : ""
        }
        <p style="margin-top: 20px;">Please ensure your payment method has sufficient balance to avoid service interruption.</p>
        <p style="font-size: 12px; color: #555; margin-top: 20px; text-align: center;">
          This is an automated reminder from BillAlert. Please Mark reminder as paid if you have already made the payment.
        </p>
      </div>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

//setting cron schedule
cron.schedule("00 09 * * *", async () => {
  console.log("Checking bill for reminder...");

  try {
    const today = new Date();
    const bills = await Bill.find({});

    for (const bill of bills) {
      const days = calculateDaysLeft(bill.dueDate);
      const dueDate = new Date(bill.dueDate);

      if (
        //condition for sending emails
        (bill.recurrence === "monthly" &&
          today.getDate() === dueDate.getDate()) ||
        (bill.recurrence === "yearly" &&
          today.getDate() === dueDate.getDate() &&
          today.getMonth() === dueDate.getMonth()) ||
        days === 3 ||
        days === 1 ||
        days === 0 ||
        days < 0
      ) {
        try {
          const client = await Client.findOne({ _id: bill.clientId });
          if (client) {
            sendMail(bill, client.email, client.fullName);

            // saving payment history and updating due date for recurring bills
            if (days === 0) {
              await PayHistory.create({
                clientId: bill.clientId,
                billId: bill._id,
                name: bill.name,
                category: bill.category,
                amount: bill.amount,
                paymentDate: bill.dueDate,
              });

              if (bill.recurrence === "monthly") {
                const newDueDate = new Date(bill.dueDate);
                newDueDate.setMonth(newDueDate.getMonth() + 1);
                bill.dueDate = newDueDate;
              } else if (bill.recurrence === "yearly") {
                const newDueDate = new Date(bill.dueDate);
                newDueDate.setFullYear(newDueDate.getFullYear() + 1);
                bill.dueDate = newDueDate;
              }
              await bill.save();
            }
          } else {
            console.error(`Client not found for bill: ${bill._id}`);
          }
        } catch (clientError) {
          console.error(
            `Error finding client for bill ${bill._id}:`,
            clientError
          );
        }
      }
    }
  } catch (error) {
    console.error("Error fetching bills:", error);
  }
});
