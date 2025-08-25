
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

  const dueDateStyle =
    daysLeft <= 2 ? "color: red; font-weight: bold;" : "color: black;";


  const mailOptions = {
    from: 'BillAlert',
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
        }</strong> is due in <strong>${daysLeft}</strong> day(s), on <strong style="${dueDateStyle}">${formatDate(
          bill.dueDate
        )}</strong>.
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
      console.log(`Email sent to: ${clientEmail}`,info.response);
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

      if (days === 3 || days === 1 || days === 0) {
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
              console.log("Added new payhistory")

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
