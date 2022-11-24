import { Request, Response } from "express";
import nodemailer from "nodemailer";
import {emailer} from "../email/email.config";
import { Persona } from "../models/persona.model";



export async function sendMail(req: Request, res: Response) {
      const {correo1} = req.body;
      
      try {
        let info = await emailer.sendMail({
            from: '"Médicos Especialistas 🏥" <medicosespecialistas.clinica@gmail.com>', // sender address
            to:     "chris20032001@gmail.com", // list of receivers
            subject: "Confirma tu cita", // Subject line
            text: "Ya jalo esta madre ", // plain text body
            html: 
            "<h2>Recuerda confirmar tu cita</h2>", // html body
          });
      } catch (error) {
        console.log("nel prro");
      }
        res.status(200).send("Enviado");
  }