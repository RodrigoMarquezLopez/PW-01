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
/**
 * Funcion que genera todas las citas para doctores
 * @param req 
 * @param res json
 */
  export async function getCitasDoctor(req: Request, res: Response) {
   try{
    const records = await Cita.findAll({ raw: true});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
 }
/**
 * Funcion para recuperar los doctores de la base de datos
 * @param req 
 * @param res json
 */
 export async function getDoctor2(req: Request, res: Response) {
  try{
  const records = await Doctor.findAll({ raw: true});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}

/**
 * Funcion para buscar una receta por id de Cita
 * @param req idCita
 * @param res json
 */
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

/**
 * Funcion para generar generar la vista de agenda
 * @param req idDoctor
 * @param res render ejs
 * @returns 
 */
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
/**
 * Funcion para actualizar el estado de la cita a finalizada
 * @param req idCita
 * @param res json
 */
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
/**
 * Funcion para insertar una receta en la base de datos
 * @param req idCita,diagnostico,indicaciones,edad,peso,altura
 * @param res json
 */
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


/**
 * Renderiza la vista de un modal con los datos del historial
 * @param req idPersona
 * @param res render ejs
 * @returns inicio de sesion no comprobado
 */

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

 /**
  * Funcion para generar pdf, solo funciona de manera local debido a permisos
  * @param req doctor,fecha,cedula,especialidad,paciente,motivo,diagnostico,indicaciones,edad,peso,altura
  * @param res pipe.stream
  */

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
        /*
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)+".pdf";
        const pdfPath = path.join(__dirname, "..","tmp",uniqueSuffix);
         pdf.create(result,options).toFile(pdfPath,function (err,result) {
          try{
          console.log(pdfPath);
          var data =fs.readFileSync(pdfPath);
          //res.contentType("application/pdf");
          return  res.download(result.filename);
          }catch(err){
              return res.send(err);
          }
        })*/
          
        
        pdf.create(result,options).toStream((err,pdfStream)=>{
          
          if (err) {   
            // handle error and return a error response code
            console.log(err)
            return res.sendStatus(500)
          } else {
            // send a status code of 200 OK
            res.statusCode = 200             
      
            // once we are done reading end the response
            pdfStream.on('end', () => {
              // done reading
              return res.end()
            })
      
            // pipe the contents of the PDF directly to the response
            pdfStream.pipe(res)
          }
          

         });


    }
      });
      
    }catch(error){
      res.status(500).send(error);
    }
  }

