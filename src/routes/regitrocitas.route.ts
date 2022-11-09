import {Router} from "express";
import {getEspecialidades} from "../controllers/registro.citas.controller";
const registroCitasRouter: Router = Router();

registroCitasRouter.get("/",getEspecialidades);


export default registroCitasRouter;
