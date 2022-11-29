import {Router} from "express";
import { //getVistaDoctor,
    getCitasDoctor,getAgenda,getDoctor2,getHistorialModal,generarPdf,getReceta,updateCita,createReceta} from "../controllers/doctor.controller";
import { validacionRutasDoctor } from "../middlewares/doctor.middleware"; 

const doctorRouter: Router = Router();


//doctorRouter.use("/agenda/vista",getVistaDoctor);

doctorRouter.use("/agenda/citas",validacionRutasDoctor,getCitasDoctor);

doctorRouter.use("/agenda/buscar/doctor",validacionRutasDoctor,getDoctor2);

doctorRouter.use("/agenda/:idDoctor",validacionRutasDoctor,getAgenda);

doctorRouter.get("/historial/:idPersona",validacionRutasDoctor,getHistorialModal);

doctorRouter.post("/receta",validacionRutasDoctor,generarPdf);

doctorRouter.get("/receta/:idCita",validacionRutasDoctor,getReceta);

doctorRouter.put("/cita/:idCita",validacionRutasDoctor,updateCita);

doctorRouter.post("/receta/crear",validacionRutasDoctor,createReceta);


export default doctorRouter;