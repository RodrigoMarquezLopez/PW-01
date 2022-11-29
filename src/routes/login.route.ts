import { Router } from "express";

import { logginUsuario,logginView, loggout } from "../controllers/login.controller";



const logginRouter: Router = Router();


logginRouter.get("/signin",logginView);
logginRouter.get("/loggout",loggout);
logginRouter.post("/", logginUsuario);

export default logginRouter;