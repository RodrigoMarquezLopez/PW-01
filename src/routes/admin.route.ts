import {Router} from "express";
import { getVistaAdminCitas,getVistaAddDoctor,getVistaAddEsp,createDoctor,createEspecialidad} from "../controllers/admin.controller";
import { createContraseniaUsuarioMiddleware,cifrarContraseniaUsuarioMiddleware } from "../middlewares/persona.middleware";
import { validacionRutasAdmin } from "../middlewares/admin.middleware";
const adminRouter: Router = Router();


adminRouter.use("/buscarcita",validacionRutasAdmin,getVistaAdminCitas);

adminRouter.use("/agregardoc",validacionRutasAdmin,getVistaAddDoctor);

adminRouter.use("/agregaresp",validacionRutasAdmin,getVistaAddEsp);

adminRouter.post("/createDoctor",createContraseniaUsuarioMiddleware,cifrarContraseniaUsuarioMiddleware,createDoctor);

adminRouter.post("/createEsp",validacionRutasAdmin,createEspecialidad);







export default adminRouter;