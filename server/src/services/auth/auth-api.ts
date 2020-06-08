import express from "express";
import { getUserByUuid } from "../users/users-db";
import { verifyToken } from "./token-functions";
import { bearer } from "../../config/app-config";

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.get("/api/auth/user", (req, res) => {
  console.log(Date() + " :auth request");
  try {
    if (
      !req.get("Authorization") ||
      req.get("Authorization")?.slice(0, 6) != bearer
    ) {
      return res.status(500).send({
        message: "Token missing",
      });
    }
    const token: string = req.get("Authorization")!.slice(7);
    if (!verifyToken(token)) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    const undecodedToken = verifyToken(token);
    if (!(typeof undecodedToken === "object" && "uuid" in undecodedToken)) {
      return res.status(500).send({
        message: "Broken token",
      });
    }
    getUserByUuid((undecodedToken as { uuid: string }).uuid).then((user) => {
      res.send({
        uuid: user[0].uuid,
        userName: user[0].userName,
        userEmail: user[0].userEmail,
        userRole: user[0].userRole,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
});

export = authRouter;
