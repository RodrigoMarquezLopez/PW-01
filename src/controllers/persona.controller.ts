import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../database/database.config";
import { Persona } from "../models/persona.model";
import * as authService from "../services/auth.service";




export async function registrarView(req: Request, res: Response) {
    res.render("./login/registrar-persona");    
  }

export async function createUsuario(req: Request, res: Response) {
  const t = await sequelize.transaction();
  try {
    const { nombres,apellidoP,apellidoM,correo,contrasenia} = req.body;
    const usuarioResponse = await Persona.create({nombres,apellidoP,apellidoM,correo,contrasenia},{ raw: true,transaction:t });
    const mail = usuarioResponse.getDataValue("correo");
    const nombre = usuarioResponse.getDataValue("nombres") + " "+usuarioResponse.getDataValue("apellidoP")+" "+usuarioResponse.getDataValue("apellidoM");
    await authService.sendBienvenida({
      mail,
      data: { correo: mail, nombreUsuario: nombre },
    });
    await t.commit();
    res.status(StatusCodes.ACCEPTED).render("./login/registrar-persona");
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    await t.rollback();
  }
}

/*
export async function createUsuarioDoctor(req: Request, res: Response) {
  try {
    const { nombres,apellidoP,apellidoM,correo,contrasenia} = req.body;
    const usuarioResponse = await Persona.create({nombres,apellidoP,apellidoM,correo,contrasenia},{ raw: true });
    res.status(StatusCodes.CREATED).json(usuarioResponse);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  }
}*/