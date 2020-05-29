import express from "express";
import { verifyToken } from "./token-functions";
import { signin } from "./signin-functions";
import { SysUsers, getUserByUuid } from "../sys-users/users-api";

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.get("/api/auth/user", (req, res) => {
  try {
    if (
      !req.get("Authorization") ||
      req.get("Authorization")?.slice(0, 8) != "Bearer: "
    ) {
      return res.status(500).send({
        message: "Token missing",
      });
    }
    const token: string = req.get("Authorization")!.slice(8);
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

authRouter.post("/api/auth/signin", (req, res) => {
  console.log("signin request");
  signin(req, res);
});

export = authRouter;
