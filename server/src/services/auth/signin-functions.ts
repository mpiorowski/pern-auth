import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret, tokenExpirationTime } from "../../config/app-config";
import { getUserByUserName } from "../sys-users/users-api";
import { Request, Response } from "express";

export const signin = (req: Request, res: Response) => {
  try {
    if (req.body && req.body.userName && req.body.userPassword) {
      getUserByUserName(req.body.userName).then((user) => {
        if (user.length < 1) {
          return res.status(404).send({ message: "User Not found." });
        }
        const passwordIsValid = bcrypt.compareSync(
          req.body.userPassword,
          user[0].userPassword
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password!",
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
      throw { message: "Bad request." };
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
