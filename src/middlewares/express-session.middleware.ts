import { Request, Response, NextFunction } from "express";
import session from "express-session";
import PersonaType from "../types/persona.type";
import SesionType from "../types/sesion.type";

declare module "express-session" {
  interface SessionData {
    user: PersonaType,
    idSesion:SesionType,
  }
}

export const sessionConfig = session({
  name: "session-cookie",
  secret: "secreto123",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    signed: true,
    maxAge: 40 * (60 * 1000),
  },
});
/**
 * Configuiracion de los parametros para una cookie
 * @param req 
 * @param res 
 * @param next 
 */
export const sessionMiddleware = (req: Request, res: Response, next: NextFunction)=> {
  const {user,idSesion} =  req.session;
  console.log("a"+user);
  res.locals.user = user;
  res.locals.idSesion = idSesion;
  console.log("as"+req.session);
  next();
}



