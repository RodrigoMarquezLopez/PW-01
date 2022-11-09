import {Router} from "express";
import {getEspecialidades,getPersona} from "../controllers/registro.citas.controller";
const registroCitasRouter: Router = Router();

registroCitasRouter.get("/",getEspecialidades);
registroCitasRouter.get("/persona/:idPersona",getPersona);

export default registroCitasRouter;
