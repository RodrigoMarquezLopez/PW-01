import nodemailer from "nodemailer";
const user = process.env.EM_USER as string;
const password = process.env.EM_PASSWORD as string;

export const emailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });


