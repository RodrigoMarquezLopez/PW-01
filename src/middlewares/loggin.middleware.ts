import { Request, Response, NextFunction } from "express";

/**
 * Funcion que valida los roles de un usario para una determinada ruta
 * @param rolUser arreglo de roles permitidos. Si se envia ["*"] permitira el acceso a todos los roles
 */

export function createLogginMiddleware(rolUser:string[]){
    console.log("entre en el middleware Loggin");
    return (req: Request, res: Response, next: NextFunction) => {
    
        if (!req.session.user) {
            return res.redirect("/login/clinica/signin");
        }
        
        next();
    }

}



/**
 * roles: 1111 usuario normal
 *        2222 doctor
 *        3333 administrador
 * 
 */