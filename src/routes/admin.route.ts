import {Router} from "express";
import { getVistaAdminCitas,getVistaAddDoctor,getVistaAddEsp} from "../controllers/admin.controller";
const adminRouter: Router = Router();


adminRouter.use("/buscarcita",getVistaAdminCitas);

adminRouter.use("/agregardoc",getVistaAddDoctor);

adminRouter.use("/agregaresp",getVistaAddEsp);







export default adminRouter;