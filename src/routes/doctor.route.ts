import {Router} from "express";
import { getVistaDoctor } from "../controllers/doctor.controller";
const doctorRouter: Router = Router();


doctorRouter.use("/agenda/vista",getVistaDoctor);



export default doctorRouter;