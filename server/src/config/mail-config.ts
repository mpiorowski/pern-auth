import nodemailer from "nodemailer";
import { emailCredential } from "./app-config";
import Email from "email-templates";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailCredential.user,
    pass: emailCredential.pass,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: "Pern Auth App",
    to: to,
    subject: subject,
    html: text,
  };
  return await transporter.sendMail(mailOptions);
};

// export const email = (): Email<unknown> => {
//   return new Email({
//     transport: transporter,
//     send: true,
//     preview: true,
//     message: {
//       from: "Pern Auth App"
//     },
//     views: {
//       root: 'src/emails',
//     },
//   });
// };
