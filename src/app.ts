import express, { Application } from "express";
import { Request, Response } from "express"; //Se va a quitar
import morgan from "morgan";
import path from "path"
import dotenv from "dotenv";
dotenv.config();
import {sessionConfig, sessionMiddleware} from "./middlewares/express-session.middleware";
import registroCitasRouter from "./routes/regitrocitas.route";
import emailRouter from "./routes/email.route";
import doctorRouter from "./routes/doctor.route";
import logginRouter from "./routes/login.route";
import usuarioRouter from "./routes/persona.route";

const app: Application = express();


//settings
app.set("port", process.env.PORT || 4000);
app.set("view engine","ejs");
app.set('views', path.join(__dirname, './views'));



//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'./public')))
app.use(sessionConfig);
app.use(sessionMiddleware);



//app.use("/registro",(req:Request,res:Response) =>{res.render("registro-citas-completo");});
app.use("/",registroCitasRouter);
app.use("/correo",emailRouter);
app.use("/doctor",doctorRouter);
app.use("/login/clinica", logginRouter);
app.use("/create",usuarioRouter);

//app.use("/historialcitas",(req:Request,res:Response) =>{res.render("historial-citas-completo");});

export default app;
