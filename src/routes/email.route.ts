import {Router} from "express";
import { sendMail } from "../controllers/email.controller";
const emailRouter: Router = Router();

/**
 * Router necesario para poder enviar los emails
 */

emailRouter.get("/confirmar/:idCita/:idPersona",sendMail);

export default emailRouter;