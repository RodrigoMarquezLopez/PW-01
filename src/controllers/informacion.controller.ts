import { raw, Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../database/database.config";

/**
 * Buscar persona de acuerdo a su identificador unico
 * @param req idPersona
 * @param res json
 */
export async function getPersona(req: Request, res: Response) {
  try{
    const {idPersona} = req.params; 
    const records = await Persona.findByPk(idPersona);
    res.status(200).json(records);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
    
  }
/**
 * Funcion para renderizar la vista con los datos de una persona 
 * @param req idPersona
 * @param res render ejs
 * @returns 
 */
export async function getDatos(req: Request, res: Response) {
    try{
    const {idPersona} = req.params;
    const records = await Persona.findByPk(idPersona);
    const data = {record: records}
    const data2 = {record: records}
    
    if(req.session.user?.idPersona != Number(idPersona)){
      return res.redirect("/login/clinica/error");
    }
    res.render("informacion-usuario-completo",data);
    
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }
/**
 * Funcion que regresa todas las personas de la base de datos
 * @param req -
 * @param res json
 */
  export async function getUsuarios(req: Request, res: Response) {
    try{
    const records = await Persona.findAll({ raw: true});
    res.status(200).json(records);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }
/**
 * Funcion para buscar todas las citas 
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
 * Funcion para obtener las citas de una persona
 * @param req idPersona
 * @param res json
 */
  export async function getCitasPersona(req: Request, res: Response) {
    try{
    const {idPersona} = req.params; 
    const records = await Cita.findAll({raw:true,where:{idPersona}});
    res.status(200).json(records);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }
/**
 * Funcion para actualizar el estado de la cita
 * @param req idCita
 * @param res json
 */
  export async function confCita(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try{
    const {idCita} =req.params;
    
    await Cita.update({ estado:"agendada" },{where: {idCita},transaction:t});
    const data = {httpCode:201,
        message:"Registrado correctamente"};
        await t.commit();
      res.status(200).json(data);
    } catch (e) {
      const error = e as Error;
      await t.rollback();
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
      
    }
  }
/**
 * Funcion para establecer cita como eliminada
 * @param req idCita
 * @param res json
 */
  export async function elimCita(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try{
    const {idCita} =req.params;
    const cita = await Cita.update({ estado:"eliminada" }, {
      where: {
        idCita
      },transaction:t
    });
    const data = {httpCode:201,
        message:"Registrado correctamente"};
        await t.commit();
      res.status(200).json(data);
    } catch (e) {
      const error = e as Error;
      await t.rollback();
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
      
    }
    
  }
/**
 * Funcion para actualizar una cita
 * @param req idCita
 * @param res json
 */
  export async function updatePersona(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try{
    const {idCita} =req.params;
    
    await Cita.update({ estado:"agendada" }, {
      where: {
        idCita
      },transaction:t
    });
    const data = {httpCode:201,
        message:"Registrado correctamente"};
      res.status(200).json(data);
    } catch (e) {
      const error = e as Error;
      await t.rollback();
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
      
    }
  }

/**
 * Funcion para obtner los datos de un doctor en la tabla persona
 * @param req idDoctor
 * @param res json
 */
  export async function getDatosDoctor(req: Request, res: Response) {
    try{
    const {idDoctor} = req.params;
    const records = await Doctor.findByPk(idDoctor);
    const data = {record: records}
    const {idPersona} = req.params;
    res.render("informacion-doctor-completo",data);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
    
  }
/**
 * Funcion para obtener todos los doctores
 * @param req 
 * @param res json
 */
  export async function getDoctores(req: Request, res: Response) {
    try{
    const records = await Doctor.findAll({ raw: true});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
  }