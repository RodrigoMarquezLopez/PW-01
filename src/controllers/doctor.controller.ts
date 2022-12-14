import { Request, Response} from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";
import ejs from "ejs";
import pdf from "html-pdf";
import express from "express";
import fs from "fs";
import { Receta } from "../models/receta.model";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../database/database.config";
import { renderFileHtml, renderReceta } from "../libraries/ejs.library";
import path from "path";

/*
export async function getVistaDoctor(req: Request, res: Response) {
  //const {idPersona} = req.params;
    //const record = await Persona.findByPk(idPersona);
    //console.log(record);
    //const data = {record:record}
     
  res.status(200).render("doctor-completo");
    
  }*/

  export async function getCitasDoctor(req: Request, res: Response) {
   try{
    const records = await Cita.findAll({ raw: true});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
 }

 export async function getDoctor2(req: Request, res: Response) {
  try{
  const records = await Doctor.findAll({ raw: true});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}


export async function getReceta(req: Request, res: Response) {
  try{
  const{idCita} = req.params;
  const records = await Receta.findOne({raw:true,where:{idCita}});                
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}


 export async function getAgenda(req: Request, res: Response) {
  try{
   const {idDoctor} = req.params;
   const record = await Doctor.findByPk(idDoctor);
   const persona = await Persona.findByPk(record?.getDataValue("idPersona")); 
   if(req.session.user?.idPersona != persona?.getDataValue("idPersona")){
      return res.redirect("/login/clinica/error");
   }
   const data = {record:record}
   res.render("doctor-completo",data);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
 }

export async function updateCita(req: Request, res: Response) {
  const t = await sequelize.transaction();
  try{
  const {idCita} = req.params;
  //const {body} = req;
  const entity= await Cita.update({ estado:"finalizada" }, {
    where: {
      idCita
    },transaction:t
  });
  res.status(201).json(entity);
} catch (e) {
  const error = e as Error;
  await t.rollback();
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}

export async function createReceta(req: Request, res: Response) {
  const t = await sequelize.transaction();
  try{
  console.log(req.method);
  const {idCita,diagnostico,indicaciones,edad,peso,altura} = req.body;
  const record = await Receta.create({idCita,diagnostico,indicaciones,edad,peso,altura},{raw:true,transaction:t});
  const entity= await Cita.update({ estado:"finalizada" }, {
    where: {
      idCita
    },transaction:t
  });
  const data = {httpCode:201,
    message:"Registrado correctamente"};
    await t.commit();
  res.status(201).json(data);
} catch (e) {
  const error = e as Error;
  await t.rollback();
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}




 export async function getHistorialModal(req:Request,res:Response){
  try{
    console.log(req.params);
    const idPersona = req.params.idPersona;
    const record = await Persona.findOne({raw:true,where:{idPersona}});
    const data = {record:record};
    //const {idPersona} = req.params;
  if(req.session.user?.idPersona != Number(idPersona)){
    return res.redirect("/login/clinica/error");
 }
    res.render("modal-historial-citas",data);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
 }

 export async function generarPdf(req:Request,res:Response) {
  try{
    console.log("NO di error");
    console.log(req.body);
    //var html;
    const {doctor,fecha,cedula,especialidad,paciente,motivo,diagnostico,indicaciones,edad,peso,altura} = req.body;
    const filePath = path.join(__dirname, "..", "views","templates", "receta.ejs");
      ejs.renderFile(filePath,{doctor,fecha,cedula,especialidad,paciente,motivo,diagnostico,indicaciones,edad,peso,altura},(err,result)=>{
        if (err) {
          console.log(err);
          res.send(err);
    } else {
        //html = result;
        console.log("NO di error");
        let options = {
            "height": "11in",
            "width": "8.5in",
            "header": {
                "height": "10mm"
            },
            "footer": {
                "height": "10mm",
            },
            "border": "0.5in", 
        };
        pdf.create(result,options).toFile(function (err,result) {
          console.log(result.filename);
          var data =fs.readFileSync(result.filename);
          res.contentType("application/pdf");
          res.send(data);
        })
    }
      });
      
    }catch(error){
      res.status(500).send(error);
    }
  }

