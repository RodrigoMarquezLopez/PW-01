import {Router} from "express";
import { getVistaDoctor,getCitasDoctor,getAgenda,getDoctor2,getHistorialModal} from "../controllers/doctor.controller";
const doctorRouter: Router = Router();


doctorRouter.use("/agenda/vista",getVistaDoctor);

doctorRouter.use("/agenda/citas",getCitasDoctor);

doctorRouter.use("/agenda/buscar/doctor",getDoctor2);

doctorRouter.use("/agenda/:idDoctor",getAgenda);

doctorRouter.get("/historial/:idPersona",getHistorialModal);




export default doctorRouter;