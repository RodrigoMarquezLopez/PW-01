import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";

export async function getEspecialidades(req: Request, res: Response) {
  
  const records = await Especialidad.findAll({ raw: true});
  res.status(200).json(records);
}

export async function getRegistro(req: Request, res: Response) {
  const {idPersona} = req.params;
  const record = await Persona.findByPk(idPersona);
  const data = {record:record}
  res.render("registro-citas-completo",data);
  
}

export async function getCitasPersona(req: Request, res: Response) {
  const {idPersona} = req.params; 
  const records = await Cita.findAll({raw:true,where:{idPersona}});
  res.status(200).json(records);
}


export async function getPersona(req: Request, res: Response) {
  
  const {idPersona} = req.params; 
  const records = await Persona.findByPk(idPersona);
  res.status(200).json(records);
}

export async function getDoctores(req: Request, res: Response) {
  const {idEspecialidad} = req.params; 
  const records = await Doctor.findAll({ raw: true, where:{idEspecialidad}});
  res.status(200).json(records);
}

export async function  getDoctor(req: Request, res: Response) {
  
  const {idDoctor} = req.params;
  const records = await Doctor.findByPk(idDoctor);
  res.status(200).json(records);
}

export async function getCitasDoctorFecha(req: Request, res: Response) {
  const {idDoctor,fecha} = req.params; 
  const records = await Cita.findAll({raw:true,where:{idDoctor,fecha}});
  res.status(200).json(records);
}


export async function createCita(req: Request, res: Response) {
  console.log(req.method);
  const {idPersona,idDoctor,fecha,hora,motivo,estado} = req.body;
  const record = await Cita.create({idPersona,idDoctor,fecha,hora,motivo,estado});
  const data = {httpCode:201,
    message:"Registrado correctamente"};
  res.status(201).json(data);
}

/** 
export async function getExampleById(req: Request, res: Response) {
    const {idStatus} = req.params;
    const records = await ExampleModel.findAll({ raw: true ,where:{idStatus}});
    res.status(200).json(records);
  }
  **/