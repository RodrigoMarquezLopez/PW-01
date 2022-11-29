import { Request, Response, NextFunction } from "express";
import { generatePassword, hashPassword } from "../libraries/bycript.library";

export async function createContraseniaUsuarioMiddleware(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const contraseniaUnhash = generatePassword();
  body["contrasenia"] = contraseniaUnhash;
  body["contraseniaUnhash"] = contraseniaUnhash;
  next();
}

export async function cifrarContraseniaUsuarioMiddleware(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  body["contrasenia"] = hashPassword(body["contrasenia"]);
  next();
}


export function validacionRutasPaciente(req: Request, res: Response, next: NextFunction){
  console.log("entre en el middleware Paciente");
  
  console.log("Funcion return")
      if (!req.session.user) {
          return res.redirect("/login/clinica/signin");
      }
      if( req.session.user.rol !== "1111"){
          return res.send("Que quieres prro");
          
      }

      next();
  

}
export function validacionRutasPacienteDoctor(req: Request, res: Response, next: NextFunction){
  console.log("entre en el middleware Paciente");
  
  console.log("Funcion return")
      if (!req.session.user) {
          return res.redirect("/login/clinica/signin");
      }
      if( (req.session.user.rol !== "1111")){
        if(req.session.user.rol !== "2222"){
          return res.send("Que quieres prro");
          
        
        }
          
      }

      next();
  

}