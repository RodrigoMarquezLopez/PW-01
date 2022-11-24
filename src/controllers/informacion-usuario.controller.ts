import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";



export async function getPersona(req: Request, res: Response) {
  
    const {idPersona} = req.params; 
    const records = await Persona.findByPk(idPersona);
    res.status(200).json(records);
    
  }

export async function getDatos(req: Request, res: Response) {
    const {idPersona} = req.params;
    const records = await Persona.findByPk(idPersona);
    const data = {record: records}
    const data2 = {record: records}
    res.render("informacion-usuario-completo",data);
  }

  export async function getUsuarios(req: Request, res: Response) {
    const records = await Persona.findAll({ raw: true});
  res.status(200).json(records);
  }

  export async function getCitasGeneral(req: Request, res: Response) {
    const records = await Cita.findAll({ raw: true});
  res.status(200).json(records);
  }

  export async function getCitasPersona(req: Request, res: Response) {
    const {idPersona} = req.params; 
    const records = await Cita.findAll({raw:true,where:{idPersona}});
    res.status(200).json(records);
  }


 
  
  