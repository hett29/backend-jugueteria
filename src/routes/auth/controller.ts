import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import UsuarioResource from "../../resources/clienteResource";
import ApiError from "../../errors/Apierror";
import { env } from "../../config/env";

export const authUsuario = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, async (error: any, usuario: any) => {
    if (error) return next(error);
    try {
      if (!usuario) {
        throw new ApiError({ name: "UNAUTHORIZED_ERROR", message: "Usuario o contraseña incorrectos.", code: "ERR_UNAUTH", status: 401 });
      }

      const requestedRole = req.body?.role;
      if (requestedRole && requestedRole !== usuario.rol) {
        throw new ApiError({
          name: "UNAUTHORIZED_ERROR",
          message: "Las credenciales no corresponden al tipo de ingreso seleccionado.",
          code: "ERR_ROLE_MISMATCH",
          status: 403,
        });
      }

      const payload = { sub: usuario.id, rol: usuario.rol };
      const token = jwt.sign(payload, env.authJwtSecret as jwt.Secret, {
        expiresIn: env.authJwtTime as jwt.SignOptions["expiresIn"],
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Inicio de sesión correcto.", usuario });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

export const getMe = [
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError({ name: "UNAUTHORIZED_ERROR", message: "No autenticado.", code: "ERR_UNAUTH", status: 401 });
      }
      const usuarioResource = new UsuarioResource(req.user as any);
      return res.json({ usuario: usuarioResource.item() });
    } catch (err) {
      next(err);
    }
  },
];

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.status(200).json({ message: "Sesión cerrada." });
};
