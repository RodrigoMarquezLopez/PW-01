import {Router} from "express";
import { getVistaDoctor,getCitasDoctor,getAgenda,getDoctor2,getHistorialModal,generarPdf,getReceta,updateCita,createReceta} from "../controllers/doctor.controller";
const doctorRouter: Router = Router();


doctorRouter.use("/agenda/vista",getVistaDoctor);

doctorRouter.use("/agenda/citas",getCitasDoctor);

doctorRouter.use("/agenda/buscar/doctor",getDoctor2);

doctorRouter.use("/agenda/:idDoctor",getAgenda);

doctorRouter.get("/historial/:idPersona",getHistorialModal);

doctorRouter.post("/receta",generarPdf);

doctorRouter.get("/receta/:idCita",getReceta);

doctorRouter.put("/cita/:idCita",updateCita);

doctorRouter.post("/receta/crear",createReceta);


export default doctorRouter;