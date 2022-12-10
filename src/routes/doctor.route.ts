import {Router} from "express";
import { //getVistaDoctor,
    getCitasDoctor,getAgenda,getDoctor2,getHistorialModal,generarPdf,getReceta,updateCita,createReceta,getHistorialPaciente} from "../controllers/doctor.controller";
import { validacionRutasDoctor } from "../middlewares/doctor.middleware"; 
import { validacionRutasPacienteDoctor } from "../middlewares/persona.middleware";
import { getDatosDoctor } from "../controllers/informacion.controller";
const doctorRouter: Router = Router();


//doctorRouter.use("/agenda/vista",getVistaDoctor);
/**
 * Aqui se encuentran declaradas todas las rutas que son necearias para mostrar las vistas y obtner 
 * la informacion de la vista del doctor
 */


doctorRouter.use("/agenda/citas",validacionRutasDoctor,getCitasDoctor);

doctorRouter.use("/agenda/buscar/doctor",validacionRutasDoctor,getDoctor2);

doctorRouter.use("/agenda/:idDoctor",validacionRutasDoctor,getAgenda);

doctorRouter.get("/historial/:idPersona",validacionRutasDoctor,getHistorialModal);

doctorRouter.post("/receta",validacionRutasDoctor,generarPdf);

doctorRouter.get("/receta/:idCita",validacionRutasPacienteDoctor,getReceta);

doctorRouter.put("/cita/:idCita",validacionRutasDoctor,updateCita);

doctorRouter.post("/receta/crear",validacionRutasDoctor,createReceta);

doctorRouter.get("/informacion/:idDoctor",validacionRutasDoctor,getDatosDoctor);

doctorRouter.get("/historialpaciente/:idDoctor",validacionRutasDoctor,getHistorialPaciente);

export default doctorRouter;