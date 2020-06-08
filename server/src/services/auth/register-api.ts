import bcrypt from "bcrypt";
import express from "express";
import {
  getUserByUserEmail,
  getUserByUserName,
  createUser,
  SysUsers,
} from "../users/users-db";
import { ROLE_USER, saltRounds } from "../../config/app-config";

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
      if (checkUserName.length > 1) {
        return res.status(404).send({ message: "Username already taken" });
      }
      const checkUserEmail = await getUserByUserEmail(req.body.userEmail);
      if (checkUserEmail.length > 1) {
        return res.status(404).send({ message: "Useremail already taken" });
      }
      const pass = await bcrypt.hash(req.body.userPassword, saltRounds);
      const user: SysUsers = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: pass,
        userRole: ROLE_USER,
      };
      console.log("here");
      const created: SysUsers[] = await createUser(user);
      if (created.length > 0) {
        return res.status(200).send({ message: "User added successfully" });
      }
      return res.status(500).send({ message: "User not added" });
    } else {
      throw { message: "Bad request" };
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export = registerRouter;
