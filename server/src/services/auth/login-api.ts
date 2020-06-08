import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { secret, tokenExpirationTime } from "../../config/app-config";
import { getUserByUserNameOrEmail } from "../../db/users-db";

const loginRouter = express.Router();
loginRouter.use(express.json());

loginRouter.post("/api/auth/login", (req, res) => {
  console.log(Date() + " :login request");
  try {
    if (req.body && req.body.userNameOrEmail && req.body.userPassword) {
      getUserByUserNameOrEmail(req.body.userNameOrEmail).then((user) => {
        if (user.length < 1) {
          return res.status(404).send({ message: "User Not found" });
        }
        const passwordIsValid = bcrypt.compareSync(
          req.body.userPassword,
          user[0].userPassword
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password",
          });
        }
        const token = jwt.sign({ uuid: user[0].uuid }, secret, {
          expiresIn: tokenExpirationTime,
        });
        // var authorities = [];
        // user.getRoles().then((roles) => {
        // for (let i = 0; i < roles.length; i++) {
        //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
        // }
        return res.status(200).send({
          authToken: token,
        });
      });
    } else {
      throw { message: "Bad request" };
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

export = loginRouter;
