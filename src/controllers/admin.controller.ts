import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";
import { StatusCodes } from "http-status-codes";
import * as authService from "../services/auth.service";



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


export async function getDoctoresAdmin() {
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
  

export async function getVistaAddDoctor(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
     try{ 
    res.status(200).render("agregar-doctor-completo");
  }catch(error){
    res.status(500).send(error);
  }
  }

  export async function getVistaAddEsp(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
       try{
    res.status(200).render("agregar-esp-completo");
  }catch(error){
    res.status(500).send(error);
  }
  }


  export async function createDoctor(req: Request, res: Response) {
    try {
      const { nombres,apellidoP,apellidoM,correo,contrasenia,contraseniaUnhash,idEspecialidad,cedula,horaEntrada,horaSalida} = req.body;
      console.log("AA: "+contraseniaUnhash);
      const rol = "2222";
      const usuarioResponse = await Persona.create({nombres,apellidoP,apellidoM,correo,contrasenia,rol},{ raw: true });
      const mail = usuarioResponse.getDataValue("correo");
      const idPersona = usuarioResponse.getDataValue("idPersona");
      const doctorResponse = await Doctor.create({idPersona,idEspecialidad,cedula,horaEntrada,horaSalida},{raw:true});
      await authService.sendUserCredentials({
        mail,
        data: { correo: mail, contrasenia: contraseniaUnhash },
      });
      res.status(201).json(usuarioResponse);
    } catch (e) {
      const error = e as Error;
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    }
  }


  export async function createEspecialidad(req: Request, res: Response) {
      try{
        console.log("Entre");
        const {nombreEsp,descripcion} = req.body;
        const especialidad = await Especialidad.create({nombreEsp,descripcion},{raw:true});
        const data = {httpCode:201,
          message:"Registrado correctamente"};
        res.status(200).json(data);
      }catch(e){
        const error = e as Error;
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
      }
  }

  export async function getVistaAdminCitas(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
    try{   
    res.status(200).render("buscar-citas-completo");
    }catch(error){
      res.status(500).send(error);
    }
      
  }
