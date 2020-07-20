import express from "express";
import randomNumber from "random-number-csprng";
import { tokenExpirationTime } from "../../config/app-config";
import { sendEmail } from "../../config/mail-config";
import { recoveryCodeMessage } from "../../config/mail-messages";
import { createToken, Token } from "../../db/tokens-db";
import { getUserByUserNameOrEmail } from "../../db/users-db";

const recoverRouter = express.Router();
recoverRouter.use(express.json());

recoverRouter.post("/api/auth/recover", async (req, res) => {
  console.log(Date() + " :recover request");
  try {
    if (!req.body || !req.body.userNameOrEmail) {
      return res.status(500).send({
        message: "Bad request",
      });
    }

    const user = await getUserByUserNameOrEmail(req.body.userNameOrEmail);
    if (user.length < 1) {
      return res.status(404).send({
        header: "User name or email does not exsist",
        message:
          "The given User name or email does not exsist. Please try another.",
        code: 1,
      });
    }

    const code = await randomNumber(100000, 999999);
    const token = {
      data: { code: code },
      type: "recovery",
      email: user[0].userEmail,
      expire: new Date(Date.now() + tokenExpirationTime * 1000).toISOString(),
    };

    const createdToken: Token[] = await createToken(token);
    if (createdToken.length > 0) {
      // send email with recovery code
      await sendEmail(
        user[0].userEmail,
        "Recovery code",
        recoveryCodeMessage(code)
      );
      return res
        .status(200)
        .send({ message: "Recovery code sent succesfully" });
    }
    return res.status(500).send({
      message: "Recovery code creation failed, something went wrong",
    });
  } catch (error) {
    console.error(error);
    // TODO - dont send this message in prod
    return res.status(500).send({ message: error.message });
  }
});

export = recoverRouter;
