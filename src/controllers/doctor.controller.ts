import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";



export async function getVistaDoctor(req: Request, res: Response) {
   res.status(200).render("doctor-completo");
    
  }


