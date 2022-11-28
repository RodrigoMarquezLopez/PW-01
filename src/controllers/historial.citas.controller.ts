import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";


export async function getCitas(req: Request, res: Response) {
    const {idPersona} = req.params;
    const records = await Cita.findAll({ raw: true, where:{idPersona}});
    res.status(200).json(records);
  }

  export async function getCitasGeneral(req: Request, res: Response) {
    const records = await Cita.findAll({ raw: true});
  res.status(200).json(records);
  }

  export async function getCitaDatos(req: Request, res: Response) {
    const {idPersona} = req.params;
    const {fecha,hora} = req.body;
    const records = await Cita.findAll({ raw: true, where:{idPersona}});
    res.status(200).json(records);
  }


  export async function getHistorial(req: Request, res: Response) {
    const {idPersona} = req.params;
    const record = await Persona.findByPk(idPersona);
    const data = {record:record,verReceta:false}
    res.render("historial-citas-completo",data);
  }

  