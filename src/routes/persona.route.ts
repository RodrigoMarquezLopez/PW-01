import { Router } from "express";
import { createUsuario,registrarView } from "../controllers/persona.controller";
import {
  cifrarContraseniaUsuarioMiddleware,
  //createContraseniaUsuarioMiddleware,
} from "../middlewares/persona.middleware";

const usuarioRouter: Router = Router();

usuarioRouter.post("/user",cifrarContraseniaUsuarioMiddleware,createUsuario);

usuarioRouter.get("/view",registrarView);

export default usuarioRouter;

