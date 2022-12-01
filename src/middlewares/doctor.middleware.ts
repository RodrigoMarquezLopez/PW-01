import { Request, Response, NextFunction } from "express";



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

  