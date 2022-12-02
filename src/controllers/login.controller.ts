import { Request, Response } from "express";
import { isValidPassword } from "../libraries/bycript.library";
import { Doctor } from "../models/doctor.model";
import { Persona } from "../models/persona.model";
import {SesionModel} from "../models/sesion.model";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../database/database.config";


export function logginView(req: Request, res: Response){
  try{
  const {error} = req.query;
  res.render("login/login-view-v2",{error});
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}


export async function logginUsuario(req: Request, res: Response) {
  console.log("entre");
  try {
    const { correo, contrasenia } = req.body;
    const usuarioResponse = await Persona.findOne({raw:true,where:{correo}});
    console.log(usuarioResponse);
   if (usuarioResponse !== null) {
      console.log("no entro");
      const user = JSON.parse(JSON.stringify(usuarioResponse));
      const contraseniaUsuario = user["contrasenia"];
      console.log(contraseniaUsuario);
      if (isValidPassword(contrasenia, contraseniaUsuario)) {
        console.log("asdasd");
        delete user.contrasenia;
        /*if(user["rol"]=="2222"){
            const idPersona = user["idPersona"];
            const doctor = await Doctor.findOne({raw:true,where:{idPersona}});  
            const userDoc = JSON.parse(JSON.stringify({usuarioResponse,doctor}));
            req.session.user = userDoc;
            return res.redirect(`/doctor/agenda/${userDoc["doctor"]["idDoctor"]}`);
        }*/
        const idPersona = user["idPersona"];
        console.log(idPersona);
        const sesionRegistro = await SesionModel.create({idPersona});
        req.session.user = user;
        if(sesionRegistro !== null){
          console.log("si enetre al json");
        req.session.idSesion = JSON.parse(JSON.stringify(sesionRegistro));
        }
        console.log(user["rol"]);
        if(user["rol"]=="1111"){
        return res.redirect(`/informacion/${user["idPersona"]}`);
        }
        if(user["rol"]=="2222"){
          const idPersona = user["idPersona"];
          const doctorResponse = await Doctor.findOne({raw:true,where:{idPersona}});
          const doctor = JSON.parse(JSON.stringify({doctorResponse}));
          console.log(doctor);
          console.log(doctor["idDoctor"]);
          const idDoctor = doctor["doctorResponse"]["idDoctor"];
          return res.redirect(`/doctor/agenda/${idDoctor}`);
        }
        if(user["rol"]=="3333"){
          return res.redirect(`/admin/buscarcita`);
        }
      }
    }

    res.send("Nel prro");
    //res.redirect("/api/v1/loggin/signin?error=1");
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
}

export async function loggout(req: Request, res: Response){
  //const t = await sequelize.transaction();
  try{
    /*
    if(!req.session.idSesion){
    const idSesion = req.session.idSesion?.idSesion;
    const fecha = new Date().toString();
    const sesion =  SesionModel.update({ fecha_cierre:fecha }, {
      where: {
        idSesion:idSesion
      },transaction:t
    });
  }*/

  req.session.destroy(async (err)=>{
    if(err){
      
      console.log("error al cerrar sesion");
    }
    //await t.commit()
    res.redirect("/login/clinica/signin");
  });
} catch (e) {
  const error = e as Error;
 // await t.rollback()
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}


export async function vistaError(req: Request, res: Response){
  try{
  res.render("comunes/vista-error");
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}
