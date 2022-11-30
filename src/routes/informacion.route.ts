import {Router} from "express";
import { confCita, elimCita, getCitasGeneral, getDatos, getDoctores, getUsuarios, updatePersona } from "../controllers/informacion.controller";

const informacionRouter: Router = Router();

informacionRouter.get("/usuarios",getUsuarios);
informacionRouter.get("/:idPersona",getDatos);
informacionRouter.get("/citas",getCitasGeneral);

informacionRouter.get("/cita/confirmar/:idCita",confCita);
informacionRouter.get("/cita/eliminar/:idCita",elimCita);

informacionRouter.get("/update/:idCita",updatePersona);

informacionRouter.get("/doctores/todos",getDoctores);



export default informacionRouter;