import {Router} from "express";
import {getEspecialidades,getPersona,getDoctores,getCitasDoctorFecha,getDoctor, createCita,getRegistro,getCitasPersona} from "../controllers/registro.citas.controller";
import {getCitas,getCitasGeneral,getHistorial} from "../controllers/historial.citas.controller";
const registroCitasRouter: Router = Router();

registroCitasRouter.get("/",getEspecialidades);
registroCitasRouter.get("/persona/:idPersona",getPersona);
registroCitasRouter.get("/doctor/:idEspecialidad",getDoctores);
registroCitasRouter.get("/doctor/buscar/:idDoctor",getDoctor);
registroCitasRouter.get("/citas/:idDoctor/:fecha",getCitasDoctorFecha);
registroCitasRouter.get("/citas/:idPersona",getCitasPersona);
registroCitasRouter.get("/citas",getCitasGeneral);
registroCitasRouter.get("/registro/:idPersona",getRegistro);
registroCitasRouter.post("/citas/registrar",createCita);
registroCitasRouter.get("/historialcitas/:idPersona",getHistorial);



export default registroCitasRouter;
