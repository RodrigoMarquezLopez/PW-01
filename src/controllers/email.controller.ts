import { Request, Response } from "express";
import { Cita } from "../models/cita.model";
import { Persona } from "../models/persona.model";
import { StatusCodes } from "http-status-codes";
import { Doctor } from "../models/doctor.model";
import { sequelize } from "../database/database.config";
import * as authService from "../services/auth.service";




export async function sendMail(req: Request, res: Response) {
      const {idCita,idPersona} = req.params;
      
      const persona = await Persona.findByPk(idPersona);
      const mail = persona?.getDataValue('correo');

      const cita1 = await Cita.findByPk(idCita);
      const idCita1 = cita1?.getDataValue('idCita');
      const hora = cita1?.getDataValue('hora') + " hrs.";

      const idDoctor = cita1?.getDataValue('idDoctor');
      const Doc = await Doctor.findByPk(idDoctor);
      const idpersonaDoctor = Doc?.getDataValue('idPersona');
      const personaDoctor = await Persona.findByPk(idpersonaDoctor);
      const nombreDoctor = "Dr. "+ personaDoctor?.getDataValue('nombres') + " "+personaDoctor?.getDataValue('apellidoP') +" "+ personaDoctor?.getDataValue('apellidoM');


      const data ={idCita1,hora,nombreDoctor};

      //const htmlContent = await ejsLibrary.renderFileHtml({ file: "cuerpo-correo.ejs", data});
      const t = await sequelize.transaction();
      try {
        await authService.sendConfirmacion({
          mail,
          data,
        });
          await Cita.update({ estado:"confirmada" }, {
            where: {
              idCita
            },transaction:t
          });
          await t.commit();
          res.status(200).json(data);
        } catch (e) {
          
          const error = e as Error;
          console.log(error.message );
          await t.rollback()
          res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
          
        }

      
      
      
      
  }

