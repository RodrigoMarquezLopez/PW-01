import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";


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

export async function getCitasGeneral2(req: Request, res: Response) {
  const records = await Cita.findAll({ raw: true});
res.status(200).json(records);
}

export async function getPersonaGeneral2(req: Request, res: Response) {
  const records = await Persona.findAll({ raw: true});
res.status(200).json(records);
}

export async function getDoctoresGeneral2(req: Request, res: Response) {
  const records = await Doctor.findAll({ raw: true});
res.status(200).json(records);
}

export async function getPersona2(req: Request, res: Response) {

  const {idPersona} = req.params; 
  const records = await Persona.findByPk(idPersona);
  res.status(200).json(records);
}

export async function  getDoctor2(req: Request, res: Response) {

  const {idPersona} = req.params;
  const records = await Doctor.findOne({raw:true,where:{idPersona}});
  res.status(200).json(records);
}

export async function doctorResponse(req: Request, res: Response) {
  const doctores = await getDoctoresAdmin();
  //console.log("Los doctores son", JSON.stringify(doctores));
  return res.render("buscar-citas-completo",{ doctores});
  
}


async function getDoctoresAdmin() {
  return await Doctor.findAll()
  .then((doctores) => {
    return doctores;
  })
  .catch((err) => {
    return{
      message:
      err.message || "Oucrrió un error",
    };
  });
}
