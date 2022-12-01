import { Router } from "express";

import { logginUsuario,logginView, loggout,vistaError } from "../controllers/login.controller";



const logginRouter: Router = Router();


logginRouter.get("/signin",logginView);
logginRouter.get("/loggout",loggout);
logginRouter.post("/", logginUsuario);
logginRouter.get("/error",vistaError);

export default logginRouter;