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
      const correo = persona?.getDataValue('correo');

      const cita1 = await Cita.findByPk(idCita);
      const idCita1 = cita1?.getDataValue('idCita');
      const hora = cita1?.getDataValue('hora') + " hrs.";
      const fecha = " "+ cita1?.getDataValue('fecha');

      const idDoctor = cita1?.getDataValue('idDoctor');
      const Doc = await Doctor.findByPk(idDoctor);
      const idpersonaDoctor = Doc?.getDataValue('idPersona');
      const personaDoctor = await Persona.findByPk(idpersonaDoctor);
      const nombreDoctor = "Dr. "+ personaDoctor?.getDataValue('nombres') + " "+personaDoctor?.getDataValue('apellidoP') +" "+ personaDoctor?.getDataValue('apellidoM');


      const data ={idCita1,fecha,hora,nombreDoctor};

      const htmlContent = await ejsLibrary.renderFileHtml({ file: "cuerpo-correo.ejs", data});

      try {
        let info = await emailer.sendMail({
            from: '"Médicos Especialistas 🏥" <medicosespecialistas.clinica@gmail.com>', // sender address
            to:     correo, // list of receivers 
            subject: "Confirma tu cita" , // Subject line
            text: " ", // plain text body
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

  export async function sendMailAviso(idCita:number | undefined ,idPersona:number | undefined) {
    
    
    const persona = await Persona.findByPk(idPersona);
    const correo = persona?.getDataValue('correo');

    const cita1 = await Cita.findByPk(idCita);
    const idCita1 = cita1?.getDataValue('idCita');
    const hora = cita1?.getDataValue('hora') + " hrs.";

    const idDoctor = cita1?.getDataValue('idDoctor');
    const Doc = await Doctor.findByPk(idDoctor);
    const idpersonaDoctor = Doc?.getDataValue('idPersona');
    const personaDoctor = await Persona.findByPk(idpersonaDoctor);
    const nombreDoctor = "Dr. "+ personaDoctor?.getDataValue('nombres') + " "+personaDoctor?.getDataValue('apellidoP') +" "+ personaDoctor?.getDataValue('apellidoM');


    const data ={idCita1,hora,nombreDoctor};

    const htmlContent = await ejsLibrary.renderFileHtml({ file: "cuerpo-correo.ejs", data});

    try {
      let info = await emailer.sendMail({
          from: '"Médicos Especialistas 🏥" <medicosespecialistas.clinica@gmail.com>', // sender address
          to:     correo, // list of receivers 
          subject: "Confirma tu cita" , // Subject line
          text: " ", // plain text body
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


 


