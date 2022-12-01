import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";



export async function getPersona(req: Request, res: Response) {
  try{
    const {idPersona} = req.params; 
    const records = await Persona.findByPk(idPersona);
    res.status(200).json(records);
}catch(error){
    res.status(500).send(error);
  }
    
  }

export async function getDatos(req: Request, res: Response) {
    try{
    const {idPersona} = req.params;
    const records = await Persona.findByPk(idPersona);
    const data = {record: records}
    const data2 = {record: records}
    res.render("informacion-usuario-completo",data);
    }catch(error){
    res.status(500).send(error);
  }
  }

  export async function getUsuarios(req: Request, res: Response) {
    try{
    const records = await Persona.findAll({ raw: true});
    res.status(200).json(records);
}catch(error){
    res.status(500).send(error);
  }
  }

  export async function getCitasGeneral(req: Request, res: Response) {
    try{
    const records = await Cita.findAll({ raw: true});
  res.status(200).json(records);
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
    res.status(500).send(error);
  }
  }

  export async function confCita(req: Request, res: Response) {
    try{
    const {idCita} =req.params;
    
    await Cita.update({ estado:"agendada" }, {
      where: {
        idCita
      }
    });
    const data = {httpCode:201,
        message:"Registrado correctamente"};
      res.status(200).json(data);
}catch(error){
    res.status(500).send(error);
  }
  }

  export async function elimCita(req: Request, res: Response) {
    try{
    const {idCita} =req.params;
    const cita = await Cita.update({ estado:"eliminada" }, {
      where: {
        idCita
      }
    });
    const data = {httpCode:201,
        message:"Registrado correctamente"};
      res.status(200).json(data);
}catch(error){
    res.status(500).send(error);
  }
    
  }

  export async function updatePersona(req: Request, res: Response) {
    try{
    const {idCita} =req.params;
    
    await Cita.update({ estado:"agendada" }, {
      where: {
        idCita
      }
    });
    const data = {httpCode:201,
        message:"Registrado correctamente"};
      res.status(200).json(data);
}catch(error){
    res.status(500).send(error);
  }
  }


  export async function getDatosDoctor(req: Request, res: Response) {
    try{
    const {idDoctor} = req.params;
    const records = await Doctor.findByPk(idDoctor);
    const data = {record: records}
    res.render("informacion-doctor-completo",data);
    }catch(error){
    res.status(500).send(error);
  }
    
  }

  export async function getDoctores(req: Request, res: Response) {
    try{
    const records = await Doctor.findAll({ raw: true});
  res.status(200).json(records);
}catch(error){
    res.status(500).send(error);
  }
  }