import {Router} from "express";
import { getVistaDoctor } from "../controllers/doctor.controller";
const doctorRouter: Router = Router();


doctorRouter.use("/tabla/:idPersona",getVistaDoctor);



export default doctorRouter;