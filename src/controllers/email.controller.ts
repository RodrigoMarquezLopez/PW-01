import { Request, Response } from "express";
import nodemailer from "nodemailer";
import {emailer} from "../email/email.config";
import { Persona } from "../models/persona.model";
import { Cita } from "../models/cita.model";
import { where } from "sequelize";

import * as ejsLibrary from "../libraries/ejs.library";
import { mailer } from "../libraries/mailer.library";
import { Doctor } from "../models/doctor.model";




export async function sendMail(req: Request, res: Response) {
      const {idCita,idPersona} = req.params;
      
      const persona = await Persona.findByPk(idPersona);
      const c2 = persona?.getDataValue('correo');

      const cita1 = await Cita.findByPk(idCita);
      const idCita1 = cita1?.getDataValue('idCita');
      const hora = cita1?.getDataValue('idCita');
      const idPersonaDoctor = Doctor.findOne({raw:true,});

      const data ={c2,idCita1};

      const htmlContent = await ejsLibrary.renderFileHtml({ file: "cuerpo-correo.ejs", data});

      try {
        let info = await emailer.sendMail({
            from: '"Médicos Especialistas 🏥" <medicosespecialistas.clinica@gmail.com>', // sender address
            to:     c2, // list of receivers 
            subject: "Confirma tu cita" , // Subject line
            text: "Ya jalo esta madre ", // plain text body
            html: htmlContent, // html body
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

  export async function deReserva(){
    //const correo = await Persona.findAll({attributes:['correo'],where:{idPersona}} );
      //const cita = await Cita.findAll({attributes:['idCita'],where:{idCita}});
      
      
      
      
  }



