import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";



export async function getVistaAdminCitas(req: Request, res: Response) {
  //const {idPersona} = req.params;
    //const record = await Persona.findByPk(idPersona);
    //console.log(record);
    //const data = {record:record}
     
  res.status(200).render("buscar-citas-completo");
    
}

export async function getVistaAddDoctor(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
       
    res.status(200).render("agregar-doctor-completo");
      
  }

  export async function getVistaAddEsp(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
       
    res.status(200).render("agregar-esp-completo");
      
  }