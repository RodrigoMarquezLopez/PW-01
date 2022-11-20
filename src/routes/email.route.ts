import {Router} from "express";
import { sendMail } from "../controllers/email.controller";
const emailRouter: Router = Router();

emailRouter.get("/:correo",sendMail);

export default emailRouter;