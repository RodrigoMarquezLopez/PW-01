import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";



export async function getVistaDoctor(req: Request, res: Response) {
    const {idPersona} = req.params;
    const record = await Persona.findByPk(idPersona);
    console.log(record);
    const data = {record:record}
    res.render("doctor-completo",data);
    
  }


