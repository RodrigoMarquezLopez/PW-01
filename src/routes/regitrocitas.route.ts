import {Router} from "express";
import {getEspecialidades,getPersona,getDoctores,getCitasDoctorFecha,getDoctor, createCita,getRegistro, getInformacionUsuario} from "../controllers/registro.citas.controller";
const registroCitasRouter: Router = Router();
import {getDatos,getUsuarios,getCitasGeneral, getCitasPersona} from "../controllers/informacion-usuario.controller";

registroCitasRouter.get("/",getEspecialidades);
registroCitasRouter.get("/persona/:idPersona",getPersona);
registroCitasRouter.get("/doctor/:idEspecialidad",getDoctores);
registroCitasRouter.get("/doctor/buscar/:idDoctor",getDoctor);
registroCitasRouter.get("/citas/:idDoctor/:fecha",getCitasDoctorFecha);

registroCitasRouter.get("/registro",getRegistro);
registroCitasRouter.post("/citas/registrar",createCita);


registroCitasRouter.get("/usuarios",getUsuarios);
registroCitasRouter.get("/informacion-usuario/:idPersona",getDatos);
registroCitasRouter.get("/citas",getCitasGeneral);


export default registroCitasRouter;


