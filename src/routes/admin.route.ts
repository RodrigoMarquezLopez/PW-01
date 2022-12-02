import {Router} from "express";
import {getVistaAddDoctor,getVistaAddEsp,createDoctor,createEspecialidad,getCitasGeneral2,doctorResponse,getPersonaGeneral2,getDoctoresGeneral2,getPersona2,getDoctor2} from "../controllers/admin.controller";
import { createContraseniaUsuarioMiddleware,cifrarContraseniaUsuarioMiddleware } from "../middlewares/persona.middleware";
import { validacionRutasAdmin } from "../middlewares/admin.middleware";
const adminRouter: Router = Router();


adminRouter.use("/buscarcita",validacionRutasAdmin,doctorResponse);

adminRouter.use("/agregardoc",validacionRutasAdmin,getVistaAddDoctor);

adminRouter.use("/agregaresp",validacionRutasAdmin,getVistaAddEsp);

adminRouter.post("/createDoctor",createContraseniaUsuarioMiddleware,cifrarContraseniaUsuarioMiddleware,createDoctor);

adminRouter.post("/createEsp",validacionRutasAdmin,createEspecialidad);

adminRouter.use("/citas",validacionRutasAdmin,getCitasGeneral2);

adminRouter.use("/personas",validacionRutasAdmin,getPersonaGeneral2);

adminRouter.use("/doctores",validacionRutasAdmin,getDoctoresGeneral2);

adminRouter.use("/doctor/:idPersona",validacionRutasAdmin,getDoctor2)

adminRouter.use("/persona/:idPersona",validacionRutasAdmin,getPersona2)







export default adminRouter;