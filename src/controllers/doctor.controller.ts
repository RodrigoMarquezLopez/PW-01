import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";



export async function getVistaDoctor(req: Request, res: Response) {
  //const {idPersona} = req.params;
    //const record = await Persona.findByPk(idPersona);
    //console.log(record);
    //const data = {record:record}
     
  res.status(200).render("doctor-completo");
    
  }

  export async function getCitasDoctor(req: Request, res: Response) {
   const records = await Cita.findAll({ raw: true});
 res.status(200).json(records);
 }

 export async function getDoctor2(req: Request, res: Response) {
  
  const records = await Doctor.findAll({ raw: true});
  res.status(200).json(records);
}



 export async function getAgenda(req: Request, res: Response) {
   const {idDoctor} = req.params;
   const record = await Doctor.findByPk(idDoctor);
   const data = {record:record}
   res.render("doctor-completo",data);
 }




