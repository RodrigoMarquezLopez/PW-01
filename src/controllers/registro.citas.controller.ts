import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";

export async function getEspecialidades(req: Request, res: Response) {
  const records = await Especialidad.findAll({ raw: true});
  res.status(200).json(records);
}

/** 
export async function getExampleById(req: Request, res: Response) {
    const {idStatus} = req.params;
    const records = await ExampleModel.findAll({ raw: true ,where:{idStatus}});
    res.status(200).json(records);
  }
  **/