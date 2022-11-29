import { Request, Response } from "express";
import { isValidPassword } from "../libraries/bycript.library";
import { Doctor } from "../models/doctor.model";
import { Persona } from "../models/persona.model";


export function logginView(req: Request, res: Response){
  const {error} = req.query;
  res.render("login/login-view",{error});
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
        req.session.user = user;
        console.log(user["rol"]);
        if(user["rol"]=="1111"){
        return res.redirect(`/historialcitas/${user["idPersona"]}`);
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
      }
    }

    res.send("Nel prro");
    //res.redirect("/api/v1/loggin/signin?error=1");
  } catch (error) {
    res.send(error);
  }
}

export async function loggout(req: Request, res: Response){
  req.session.destroy((err)=>{
    if(err){
      console.log("error al cerrar sesion");
    }
    res.redirect("/");
  });
}