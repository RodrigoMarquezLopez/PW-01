import { Request, Response, NextFunction } from "express";


/**
 * Validadciones de rutas para un doctor, el rol del doctor esta identificado con "2222"
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function validacionRutasDoctor(req: Request, res: Response, next: NextFunction){
    console.log("entre en el middleware Loggin");
    
    console.log("Funcion return")
        if (!req.session.user) {
            return res.redirect("/login/clinica/signin");
        }
        if( req.session.user.rol !== "2222"){
            return res.redirect("/login/clinica/error");
            
        }

        next();
    
  
  }

  