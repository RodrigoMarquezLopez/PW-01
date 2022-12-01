import {Router} from "express";
import { confCita, elimCita, getCitasGeneral, getDatos, getDoctores, getUsuarios, updatePersona } from "../controllers/informacion.controller";
import { validacionRutasPacienteDoctor } from "../middlewares/persona.middleware";

const informacionRouter: Router = Router();

informacionRouter.get("/usuarios",validacionRutasPacienteDoctor,getUsuarios);
informacionRouter.get("/:idPersona",validacionRutasPacienteDoctor,getDatos);
informacionRouter.get("/citas",validacionRutasPacienteDoctor,getCitasGeneral);

informacionRouter.get("/cita/confirmar/:idCita",validacionRutasPacienteDoctor,confCita);
informacionRouter.get("/cita/eliminar/:idCita",validacionRutasPacienteDoctor,elimCita);

informacionRouter.get("/update/:idCita",validacionRutasPacienteDoctor,updatePersona);

informacionRouter.get("/doctores/todos",validacionRutasPacienteDoctor,getDoctores);



export default informacionRouter;