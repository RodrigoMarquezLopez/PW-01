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
}catch(error){
  res.status(500).send(error);
}
 }

 export async function getDoctor2(req: Request, res: Response) {
  try{
  const records = await Doctor.findAll({ raw: true});
  res.status(200).json(records);
}catch(error){
  res.status(500).send(error);
}
}


export async function getReceta(req: Request, res: Response) {
  try{
  const{idCita} = req.params;
  const records = await Receta.findOne({raw:true,where:{idCita}});
  res.status(200).json(records);
}catch(error){
  res.status(500).send(error);
}
}


 export async function getAgenda(req: Request, res: Response) {
  try{
   const {idDoctor} = req.params;
   const record = await Doctor.findByPk(idDoctor);
   const persona = await Persona.findByPk(record?.getDataValue("idPersona")); 
   if(req.session.user?.idPersona != persona?.getDataValue("idPersona")){
      return res.send("Que quieres aqui qliao");
   }
   const data = {record:record}
   res.render("doctor-completo",data);
  }catch(error){
    res.status(500).send(error);
  }
 }

export async function updateCita(req: Request, res: Response) {
  try{
  const {idCita} = req.params;
  const {body} = req;
  const entity = await Cita.findByPk(idCita);
  await entity?.update(body);
  res.status(201).json(entity?.toJSON());
}catch(error){
  res.status(500).send(error);
}
}

export async function createReceta(req: Request, res: Response) {
  try{
  console.log(req.method);
  const {idCita,diagnostico,indicaciones} = req.body;
  const record = await Receta.create({idCita,diagnostico,indicaciones});
  const data = {httpCode:201,
    message:"Registrado correctamente"};
  res.status(201).json(data);
}catch(error){
  res.status(500).send(error);
}
}




 export async function getHistorialModal(req:Request,res:Response){
  try{
    console.log(req.params);
    const idPersona = req.params.idPersona;
    const record = await Persona.findOne({raw:true,where:{idPersona}});
    const data = {record:record};
    res.render("modal-historial-citas",data);
  }catch(error){
    res.status(500).send(error);
  }
 }

 export async function generarPdf(req:Request,res:Response) {
  try{
  console.log("NO di error");
  console.log(req.body);
  //var html;
  const {doctor,fecha,especialidad,paciente} = req.body;
    ejs.renderFile(__dirname+"/receta.ejs",{doctor,fecha,especialidad,paciente},(err,result)=>{
      if (err) {
        console.log(err);
        res.send(err);
  } else {
      //html = result;
      console.log("NO di error");
      let options = {
          "height": "5.5in",
          "width": "8.5in",
          "header": {
              "height": "20mm"
          },
          "footer": {
              "height": "20mm",
          },
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

