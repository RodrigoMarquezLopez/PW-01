import {Router} from "express";
import { sendMail } from "../controllers/email.controller";
const emailRouter: Router = Router();

emailRouter.get("/confirmar/:idCita/:idPersona",sendMail);

export default emailRouter;