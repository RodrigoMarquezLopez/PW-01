import {Router} from "express";
import { getVistaAddDoctor,getVistaAddEsp,getCitasGeneral2,doctorResponse,getPersonaGeneral2,getDoctoresGeneral2,getPersona2,getDoctor2} from "../controllers/admin.controller";
const adminRouter: Router = Router();


adminRouter.use("/buscarcita",doctorResponse);

adminRouter.use("/agregardoc",getVistaAddDoctor);

adminRouter.use("/agregaresp",getVistaAddEsp);

adminRouter.use("/citas",getCitasGeneral2);

adminRouter.use("/personas",getPersonaGeneral2);

adminRouter.use("/doctores",getDoctoresGeneral2);

adminRouter.use("/doctor/:idPersona",getDoctor2)

adminRouter.use("/persona/:idPersona",getPersona2)







export default adminRouter;