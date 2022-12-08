import {Router} from "express";
import {getVistaAddDoctor,getVistaAddEsp,createDoctor,createEspecialidad,getCitasGeneral2,doctorResponse,
    getPersonaGeneral2,getDoctoresGeneral2,getPersona2,getDoctor2,getVistaReporte,getHoraReporte,getCountDocReporte,
    getEspecialidadesReporte,getAllEsp,getDoctorEsp,getCountCitasDoc,getAllCitasCount} from "../controllers/admin.controller";
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

adminRouter.use("/reporte",validacionRutasAdmin,getVistaReporte);

adminRouter.use("/horas/:fechaInc/:fechaFin",validacionRutasAdmin,getHoraReporte);

adminRouter.use("/countDoc/:fechaInc/:fechaFin",validacionRutasAdmin,getCountDocReporte);

adminRouter.use("/especialidades",validacionRutasAdmin,getEspecialidadesReporte);

adminRouter.use("/all/especialidades",validacionRutasAdmin,getAllEsp);

adminRouter.use("/doctorEsp/:idEspecialidad",validacionRutasAdmin,getDoctorEsp);

adminRouter.use("/countDocId/:fechaInc/:fechaFin/:idDoctor",validacionRutasAdmin,getCountCitasDoc);

adminRouter.use("/countCitas/:fechaInc/:fechaFin",validacionRutasAdmin,getAllCitasCount);



export default adminRouter;