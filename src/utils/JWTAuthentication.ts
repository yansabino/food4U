import * as jwt from "jsonwebtoken";

export class JWTAuthentication {
  generateToken(userId: string) {
    return jwt.sign({ userId }, "lalala", {
      expiresIn: "1h"
    });
  }

  verifyToken(token: string): string {
    const data = jwt.verify(token, "lalala") as { userId: string };

    return data.userId;
  }
}