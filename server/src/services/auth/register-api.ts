import bcrypt from "bcrypt";
import express from "express";
import {
  getUserByUserEmail,
  getUserByUserName,
  createUser,
  SysUsers,
} from "../users/users-db";
import { ROLE_USER, saltRounds } from "../../config/app-config";

var nodemailer = require("nodemailer");

const registerRouter = express.Router();
registerRouter.use(express.json());

registerRouter.post("/api/auth/register", async (req, res) => {
  console.log(Date.now() + " :register request");
  try {
    if (
      req.body &&
      req.body.userName &&
      req.body.userEmail &&
      req.body.userPassword
    ) {
      const checkUserName = await getUserByUserName(req.body.userName);
      if (checkUserName.length > 0) {
        return res.status(404).send({ message: "User name already taken" });
      }
      const checkUserEmail = await getUserByUserEmail(req.body.userEmail);
      if (checkUserEmail.length > 0) {
        return res.status(404).send({ message: "User email already taken" });
      }
      const pass = await bcrypt.hash(req.body.userPassword, saltRounds);
      const user: SysUsers = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: pass,
        userRole: ROLE_USER,
      };
      const created: SysUsers[] = await createUser(user);
      if (created.length > 0) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "piorowskiapp@gmail.com",
            pass: "matpioapp",
          },
        });

        var mailOptions = {
          from: "youremail@gmail.com",
          to: "mateuszpiorowski@gmail.com",
          subject: "Sending Email using Node.js",
          text: "That was easy!",
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return res.status(200).send({ message: "User added successfully" });
      }
      return res
        .status(500)
        .send({ message: "User not added, spmething went wrong" });
    } else {
      throw { message: "Bad request" };
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export = registerRouter;
