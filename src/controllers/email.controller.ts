import { Request, Response } from "express";
import nodemailer from "nodemailer";
import {emailer} from "../email/email.config";
import { Persona } from "../models/persona.model";
import { Cita } from "../models/cita.model";
import { where } from "sequelize";


export async function sendMail(req: Request, res: Response) {
      const {idCita,idPersona} = req.params;
      
      const persona = await Persona.findByPk(idPersona);
      const correo = await Persona.findAll({attributes:['correo'],where:{idPersona}} );
      const cita = await Cita.findAll({attributes:['idCita'],where:{idCita}});
      
      console.log(correo);
      
      try {
        let info = await emailer.sendMail({
            from: '"Médicos Especialistas 🏥" <medicosespecialistas.clinica@gmail.com>', // sender address
            to:     JSON.stringify(correo), // list of receivers 
            subject: "Confirma tu cita" , // Subject line
            text: "Ya jalo esta madre ", // plain text body
            html: 
            "<h2>Recuerda confirmar tu cita</h2>", // html body
          });
      } catch (error) {
        console.log("nel prro");
      }

      await Cita.update({ estado:"confirmada" }, {
        where: {
          idCita
        }
      });
      
  }
