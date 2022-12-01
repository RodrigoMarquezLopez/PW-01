import {Router} from "express";
import { getVistaAdminCitas,getVistaAddDoctor,getVistaAddEsp,createDoctor,createEspecialidad,getCitasGeneral2,doctorResponse,getPersonaGeneral2,getDoctoresGeneral2,getPersona2,getDoctor2} from "../controllers/admin.controller";
import { createContraseniaUsuarioMiddleware,cifrarContraseniaUsuarioMiddleware } from "../middlewares/persona.middleware";
import { validacionRutasAdmin } from "../middlewares/admin.middleware";
const adminRouter: Router = Router();


adminRouter.use("/buscarcita",validacionRutasAdmin,getVistaAdminCitas);

adminRouter.use("/agregardoc",validacionRutasAdmin,getVistaAddDoctor);

adminRouter.use("/agregaresp",validacionRutasAdmin,getVistaAddEsp);

adminRouter.post("/createDoctor",createContraseniaUsuarioMiddleware,cifrarContraseniaUsuarioMiddleware,createDoctor);

adminRouter.post("/createEsp",validacionRutasAdmin,createEspecialidad);

adminRouter.use("/citas",getCitasGeneral2);

adminRouter.use("/personas",getPersonaGeneral2);

adminRouter.use("/doctores",getDoctoresGeneral2);

adminRouter.use("/doctor/:idPersona",getDoctor2)

adminRouter.use("/persona/:idPersona",getPersona2)







export default adminRouter;