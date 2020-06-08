import nodemailer from "nodemailer";
import { emailCredential } from "./app-config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailCredential.user,
    pass: emailCredential.pass,
  },
});

export const sendMail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: "Pern Auth App",
    to: to,
    subject: subject,
    text: text,
  };
  return await transporter.sendMail(mailOptions);
};
