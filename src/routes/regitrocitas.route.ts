import {Router} from "express";
import {getEspecialidades,getPersona,getDoctores,getCitasDoctorFecha,getDoctor, createCita,getRegistro,getCitasPersona,getEspecialidad} from "../controllers/registro.citas.controller";
import {getCitas,getCitasGeneral,getHistorial} from "../controllers/historial.citas.controller";
import { validacionRutasPaciente,validacionRutasPacienteDoctor,validacionSimple } from "../middlewares/persona.middleware";
const registroCitasRouter: Router = Router();

registroCitasRouter.get("/",validacionSimple,getEspecialidades);
registroCitasRouter.get("/persona/:idPersona",validacionRutasPacienteDoctor,getPersona);
registroCitasRouter.get("/doctor/:idEspecialidad",validacionRutasPacienteDoctor,getDoctores);
registroCitasRouter.get("/doctor/buscar/:idDoctor",validacionRutasPacienteDoctor,getDoctor);
registroCitasRouter.get("/citas/:idDoctor/:fecha",validacionRutasPacienteDoctor,getCitasDoctorFecha);
registroCitasRouter.get("/citas/:idPersona",validacionRutasPacienteDoctor,getCitasPersona);
registroCitasRouter.get("/citas",validacionRutasPacienteDoctor,getCitasGeneral);
registroCitasRouter.get("/registro/:idPersona",validacionRutasPaciente,getRegistro);
registroCitasRouter.post("/citas/registrar",validacionRutasPaciente,createCita);
registroCitasRouter.get("/historialcitas/:idPersona",validacionRutasPaciente,getHistorial);
registroCitasRouter.get("/especialidad/:idEspecialidad",validacionRutasPacienteDoctor,getEspecialidad);

export default registroCitasRouter;
