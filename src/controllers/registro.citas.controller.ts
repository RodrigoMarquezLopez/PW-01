import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";

//Tambien lo usa admin
export async function getEspecialidades(req: Request, res: Response) {
  try{
  const records = await Especialidad.findAll({ raw: true});
  res.status(200).json(records);
  }catch(error){
    res.status(500).send(error)
  }
}

/*
const {idDoctor} = req.params;
   const record = await Doctor.findByPk(idDoctor);
   const persona = await Persona.findByPk(record?.getDataValue("idPersona")); 
   if(req.session.user?.idPersona != persona?.getDataValue("idPersona")){
      return res.send("Que quieres aqui qliao");
   }
   const data = {record:record}
   res.render("doctor-completo",data);
*/ 
export async function getRegistro(req: Request, res: Response) {
  try{
  const {idPersona} = req.params;
  if(req.session.user?.idPersona != Number(idPersona)){
    return res.send("Que quieres aqui qliao");
 }
  const record = await Persona.findByPk(idPersona);
  console.log(record);
  const data = {record:record}
  res.render("registro-citas-completo",data);
  }catch(error){
    res.status(500).send(error);
  }
  
}

export async function getCitasPersona(req: Request, res: Response) {
  try{
  const {idPersona} = req.params; 
  const records = await Cita.findAll({raw:true,where:{idPersona}});
  res.status(200).json(records);
  }catch(error){
    res.status(500).send(error)
  }
}


export async function getPersona(req: Request, res: Response) {
  try{
  const {idPersona} = req.params; 
  const records = await Persona.findByPk(idPersona);
  res.status(200).json(records);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function getDoctores(req: Request, res: Response) {
  try{
  const {idEspecialidad} = req.params; 
  const records = await Doctor.findAll({ raw: true, where:{idEspecialidad}});
  res.status(200).json(records);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function  getDoctor(req: Request, res: Response) {
  try{
  const {idDoctor} = req.params;
  const records = await Doctor.findByPk(idDoctor);
  res.status(200).json(records);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function  getEspecialidad(req: Request, res: Response) {
  try{
  const {idEspecialidad} = req.params;
  const records = await Especialidad.findByPk(idEspecialidad);
  res.status(200).json(records);
  }catch(error){
    res.status(500).end(error);
  }
}



export async function getCitasDoctorFecha(req: Request, res: Response) {
  try{
  const {idDoctor,fecha} = req.params; 
  const records = await Cita.findAll({raw:true,where:{idDoctor,fecha}});
  res.status(200).json(records);
  }catch(error){
    res.status(500).send(error)
  }
}


export async function createCita(req: Request, res: Response) {
  try{
  console.log(req.method);
  const {idPersona,idDoctor,fecha,hora,motivo,estado} = req.body;
  const record = await Cita.create({idPersona,idDoctor,fecha,hora,motivo,estado});
  const data = {httpCode:201,
    message:"Registrado correctamente"};
  res.status(200).json(data);
  }catch(error){
    res.status(500).send(error);
  }
}

/** 
export async function getExampleById(req: Request, res: Response) {
    const {idStatus} = req.params;
    const records = await ExampleModel.findAll({ raw: true ,where:{idStatus}});
    res.status(200).json(records);
  }
  **/