import { NextFunction, Request, Response } from "express";
import { comparePassword } from "../utils/strings";
import { bydni, updateLastSession } from "../repository/LoginRepository";
import { success, failure } from "../utils/response";
import { createToken } from "../midlewares/createToken";

class LoginHandler {
  public async login(req: Request, res: Response, next: NextFunction) {
    const { dni, password } = req.body;
    const user = await bydni(dni);
    if (!user) {
      return failure({ res, message: "DNI no encontrado" });
    }
    const comparePass = await comparePassword(password, user.password);
    if (!comparePass) {
      return failure({ res, message: "Clave incorrecta" });
    }
    const lastsession = await updateLastSession(user.id);
    const token = await createToken(dni);
    return success({ res, data: {...user,token }});
  }
}
export default LoginHandler;
