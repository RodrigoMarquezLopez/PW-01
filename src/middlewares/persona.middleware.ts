import { Request, Response, NextFunction } from "express";
import { generatePassword, hashPassword } from "../libraries/bycript.library";
/**
 * Funcion para generar una contraseña
 * @param req body
 * @param res 
 * @param next 
 */
export async function createContraseniaUsuarioMiddleware(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const contraseniaUnhash = generatePassword();
  body["contrasenia"] = contraseniaUnhash;
  body["contraseniaUnhash"] = contraseniaUnhash;
  next();
}
/**
 * Funcion para cifrar una contraseña
 * @param req 
 * @param res 
 * @param next 
 */
export async function cifrarContraseniaUsuarioMiddleware(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  body["contrasenia"] = hashPassword(body["contrasenia"]);
  next();
}

/**
 * Validacion para las rutas de un paciente
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function validacionRutasPaciente(req: Request, res: Response, next: NextFunction){
  console.log("entre en el middleware Paciente");
  
  console.log("Funcion return")
      if (!req.session.user) {
          return res.redirect("/login/clinica/signin");
      }
      if( req.session.user.rol !== "1111"){
          return res.redirect("/login/clinica/error");
          
      }

      next();
  

}
/**
 * Validacion de las rutas que tanto el doctor como el paciente tienen acceso 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function validacionRutasPacienteDoctor(req: Request, res: Response, next: NextFunction){
  console.log("entre en el middleware Paciente");
  
  console.log("Funcion return")
      if (!req.session.user) {
          return res.redirect("/login/clinica/signin");
      }
      if( (req.session.user.rol !== "1111")){
        if(req.session.user.rol !== "2222"){
          return res.redirect("/login/clinica/error");
          
        
        }
          
      }

      next();
  

}
export function validacionSimple(req: Request, res: Response, next: NextFunction){
  console.log("entre en el middleware Paciente");
  
  console.log("Funcion return")
      if (!req.session.user) {
          return res.redirect("/login/clinica/signin");
      }
      

      next();
  

}