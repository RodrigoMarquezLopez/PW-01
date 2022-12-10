import { Router } from "express";
import { createUsuario,registrarView } from "../controllers/persona.controller";
import {
  cifrarContraseniaUsuarioMiddleware,
  //createContraseniaUsuarioMiddleware,
} from "../middlewares/persona.middleware";

const usuarioRouter: Router = Router();

/**
 * Rutas necesarias para renderizar la vista de crear un usuario y 
 * la ruta de insercion del usuario en la base de datos
 */

usuarioRouter.post("/user",cifrarContraseniaUsuarioMiddleware,createUsuario);

usuarioRouter.get("/view",registrarView);

export default usuarioRouter;

