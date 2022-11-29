import { Request, Response, NextFunction } from "express";
import session from "express-session";
import PersonaType from "../types/persona.type";

declare module "express-session" {
  interface SessionData {
    user: PersonaType;
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
    maxAge: 100 * (60 * 1000),
  },
});

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction)=> {
  const {user} =  req.session;
  console.log("a"+user);
  res.locals.user = user;
  console.log("as"+req.session);
  next();
}



