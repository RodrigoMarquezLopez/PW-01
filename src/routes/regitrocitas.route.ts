import {Router} from "express";
import {getEspecialidades,getPersona,getDoctores,getCitasDoctorFecha,getDoctor, createCita,getRegistro} from "../controllers/registro.citas.controller";
const registroCitasRouter: Router = Router();

registroCitasRouter.get("/",getEspecialidades);
registroCitasRouter.get("/persona/:idPersona",getPersona);
registroCitasRouter.get("/doctor/:idEspecialidad",getDoctores);
registroCitasRouter.get("/doctor/buscar/:idDoctor",getDoctor);
registroCitasRouter.get("/citas/:idDoctor/:fecha",getCitasDoctorFecha);
registroCitasRouter.get("/registro",getRegistro);
registroCitasRouter.post("/citas/registrar",createCita);

export default registroCitasRouter;
