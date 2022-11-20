import { Request, Response } from "express";
import nodemailer from "nodemailer";
import {emailer} from "../email/email.config";




export async function sendMail(req: Request, res: Response) {
      const {correo} = req.body;
      try {
        let info = await emailer.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to:     "eodiguiz@gmail.com", // list of receivers
            subject: "Confirma tu cita", // Subject line
            text: "Confitma tu cita pls", // plain text body
            html: 
            "<h2>Recuerda confirmar tu cita</h2>", // html body
          });
      } catch (error) {
        
      }
        res.status(200).send("Enviado");
  }
