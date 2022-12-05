import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";
import { StatusCodes } from "http-status-codes";

/**
 * Funcion para obtener la citas de acuerdo a la persona
 * @param req idPersona
 * @param res json
 */
export async function getCitas(req: Request, res: Response) {
  try{
    const {idPersona} = req.params;
    const records = await Cita.findAll({ raw: true, where:{idPersona}});
    res.status(200).json(records);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }
/**
 * Funcion para obtener todas las citas de la base de datos
 * @param req 
 * @param res json
 */
  export async function getCitasGeneral(req: Request, res: Response) {
    try{
    const records = await Cita.findAll({ raw: true});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
  }

/**
 * Obtine las citas de una persona por su idPersona
 * @param req idPersona
 * @param res json
 */  
  export async function getCitaDatos(req: Request, res: Response) {
    try{
    const {idPersona} = req.params;
    const {fecha,hora} = req.body;
    const records = await Cita.findAll({ raw: true, where:{idPersona}});
    res.status(200).json(records);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }

/**
 * FUncion para renderizar la vista con el historial del usuario
 * @param req idPersona
 * @param res render ejs
 * @returns 
 */
  export async function getHistorial(req: Request, res: Response) {
    try{
    const {idPersona} = req.params;
    if(req.session.user?.idPersona != Number(idPersona)){
      return res.redirect("/login/clinica/error");
   }
    const record = await Persona.findByPk(idPersona);
    const data = {record:record,verReceta:false}
    res.render("historial-citas-completo",data);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }

  