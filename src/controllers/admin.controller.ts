import { Request, Response } from "express";
import { Especialidad } from "../models/especialidad.model";
import { Persona } from "../models/persona.model";
import {Doctor}from "../models/doctor.model";
import { Cita } from "../models/cita.model";
import { StatusCodes } from "http-status-codes";
import * as authService from "../services/auth.service";
import { sequelize } from "../database/database.config";
import { where,Op, Model } from "sequelize";


/**
 * Funcion que regresa todas las citas de la base de datos
 * @param req 
 * @param res json
 */

export async function getCitasGeneral2(req: Request, res: Response) {
  try{
  const records = await Cita.findAll({ raw: true});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}

/**
 * Funcion que regresa todas las personas registradas en la base datos 
 * @param req 
 * @param res json
 */

export async function getPersonaGeneral2(req: Request, res: Response) {
  try{
  const records = await Persona.findAll({ raw: true});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  //await t.rollback();
}
}

/**
 * Funcion que regresa todos los doctores de la base de datos
 * @param req 
 * @param res json
 */
export async function getDoctoresGeneral2(req: Request, res: Response) {
  try{
  const records = await Doctor.findAll({raw: true});
  console.log(records);
res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}
/**
 * Funcion que regresa una persona por llave primaria
 * @param req idPersona
 * @param res json
 */
export async function getPersona2(req: Request, res: Response) {
  try{
  const {idPersona} = req.params; 
  const records = await Persona.findByPk(idPersona);
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}
/**
 * Funcion que busca un doctor por idPersona 
 * @param req idPersona
 * @param res json
 */
export async function  getDoctor2(req: Request, res: Response) {
  try{
  const {idPersona} = req.params;
  const records = await Doctor.findOne({raw:true,where:{idPersona}});
  res.status(200).json(records);
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
}
/**
 * Funcion que genera la vista de las citas de los doctores
 * @param req -
 * @param res render ejs o error
 * @returns render ejs o error
 */
export async function doctorResponse(req: Request, res: Response) {
  try{
  const doctores = await getDoctoresAdmin();
  //console.log("Los doctores son", JSON.stringify(doctores));
  
  return res.render("buscar-citas-completo",{doctores});
} catch (e) {
  const error = e as Error;
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  
}
  
}

/**
 * Funcion auxiliar que regresa todos los doctores de la base de datos
 * @returns object
 */
export async function getDoctoresAdmin() {
  return await Doctor.findAll()
  .then((doctores) => {
    return doctores;
  })
  .catch((err) => {
    return{
      message:
      err.message || "Oucrrió un error",
    };
  });
}
  
/**
 * Funcion que genera la vista para agregar un nuevo doctor
 * @param req -
 * @param res render ejs
 */
export async function getVistaAddDoctor(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
     try{ 
      
    res.status(200).render("agregar-doctor-completo");
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }
/**
 * Funcion que genera la vista para agregar una nueva especialidad
 * @param req -
 * @param res render ejs
 */
  export async function getVistaAddEsp(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
       try{
       
    res.status(200).render("agregar-esp-completo");
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }

/**
 * Funcion para insertar un nuevo doctor 
 * @param req nombres,apellidoP,apellidoM,correo,contrasenia,contraseniaUnhash,idEspecialidad,cedula,horaEntrada,horaSalida
 * @param res json
 */
  export async function createDoctor(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const { nombres,apellidoP,apellidoM,correo,contrasenia,contraseniaUnhash,idEspecialidad,cedula,horaEntrada,horaSalida} = req.body;
      console.log("AA: "+contraseniaUnhash);
      const rol = "2222";
      const usuarioResponse = await Persona.create({nombres,apellidoP,apellidoM,correo,contrasenia,rol},{ raw: true,transaction:t });
      const mail = usuarioResponse.getDataValue("correo");
      const idPersona = usuarioResponse.getDataValue("idPersona");
      const doctorResponse = await Doctor.create({idPersona,idEspecialidad,cedula,horaEntrada,horaSalida},{raw:true,transaction:t});
      await authService.sendUserCredentials({
        mail,
        data: { correo: mail, contrasenia: contraseniaUnhash },
      });
      await t.commit();
      res.status(201).json(usuarioResponse);
    } catch (e) {
      const error = e as Error;
      await t.rollback();
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    }
  }

/**
 * Funcion para insertar una nueva especialidad
 * @param req nombreEsp,descripcion
 * @param res json
 */
  export async function createEspecialidad(req: Request, res: Response) {
      const t = await sequelize.transaction();
      try{
        console.log("Entre");
        const {nombreEsp,descripcion} = req.body;
        const especialidad = await Especialidad.create({nombreEsp,descripcion},{raw:true,transaction:t});
        const data = {httpCode:201,
          message:"Registrado correctamente"};
        await t.commit();  
        res.status(200).json(data);
      }catch(e){
        const error = e as Error;
        await t.rollback();
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
      }
  }
/**
 * 
 * @param req 
 * @param res 
 */
  export async function getVistaAdminCitas(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
    try{   
      
    res.status(200).render("buscar-citas-completo");
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
      
  }


  export async function getVistaReporte(req: Request, res: Response) {
    //const {idPersona} = req.params;
      //const record = await Persona.findByPk(idPersona);
      //console.log(record);
      //const data = {record:record}
    try{   
      
    res.status(200).render("admin-reporte");
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
      
  }

  export async function getHoraReporte(req: Request, res: Response) {
    const {fechaInc,fechaFin} = req.params;
    const fI = new Date(fechaInc);
    const fF = new Date(fechaFin);
    // # citas por doctor
    
    const countHoras = await Cita.findAll(
                            {
                               attributes:['hora',[sequelize.fn('COUNT',sequelize.col('hora')),'counHoras']],
                               where:{
                                 fecha:{[Op.between]: [fechaInc,fechaFin]},
                                 estado:"finalizada"
                               },
                               group:'hora'
                             }      
                           );

                            
   res.status(200).json(countHoras);                        
  }

  export async function getCountCitasDoc(req: Request, res: Response) {
    const {fechaInc,fechaFin,idDoctor} = req.params;
    const fI = new Date(fechaInc);
    const fF = new Date(fechaFin);
    // # citas por doctor
    console.log(idDoctor);
    console.log(fechaInc);
    
    const count = await Cita.findAll(
                            {
                               attributes:[[sequelize.fn('COUNT',sequelize.col('idDoctor')),'counDoctor']],
                               where:{
                                idDoctor:Number(idDoctor),
                                fecha:{[Op.between]: [fechaInc,fechaFin]},
                                 estado:"finalizada"
                                 
                               },
                               group:'idDoctor'
                             }      
                           );

    console.log(count);                            
   res.status(200).json(count);                        
  }




  export async function getCountDocReporte(req: Request, res: Response) {
    const {fechaInc,fechaFin} = req.params;
    const fI = new Date(fechaInc);
    const fF = new Date(fechaFin);
    // # citas por doctor
    const countDoctores = await Cita.findAll(
                           {
                              attributes:['idDoctor',[sequelize.fn('COUNT',sequelize.col('idDoctor')),'countDoc']],
                              where:{
                                fecha:{[Op.between]: [fechaInc,fechaFin]},
                                estado:"finalizada"
                              },
                              group:'idDoctor'
                            }      
                          );
                           
                   
   res.status(200).json(countDoctores);                        
  }
  
  export async function getEspecialidadesReporte(req: Request, res: Response) {
   
    const espDoctores = await Doctor.findAll({
                                  attributes:['idDoctor','idEspecialidad','idPersona'],
                                  } );                           
   console.log(espDoctores)                        
   res.status(200).json(espDoctores);                        
  }


  export async function getAllEsp(req: Request, res: Response) {
    try{
    const records = await Especialidad.findAll({ raw: true});
    res.status(200).json(records);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }


  export async function getDoctorEsp(req: Request, res: Response) {
    try{
    const {idEspecialidad} = req.params;  
    const records = await Doctor.findAll({where:{idEspecialidad}});
    res.status(200).json(records);
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    
  }
  }


  export async function getAllCitasCount(req: Request, res: Response) {
    const {fechaInc,fechaFin} = req.params;
    const fI = new Date(fechaInc);
    const fF = new Date(fechaFin);
    // # citas por doctor
    const countCitas = await Cita.count({where:{
      fecha:{[Op.between]: [fechaInc,fechaFin]}
    }});
    const countCancel = await Cita.count({where:{
      fecha:{[Op.between]: [fechaInc,fechaFin]},
      estado:"eliminada"
    }});
    const countFin = await Cita.count({where:{
      fecha:{[Op.between]: [fechaInc,fechaFin]},
      estado:"finalizada"
    }});
    const data = {cantidad:countCitas,
                  canceladas:countCancel,
                  final:countFin}                       
                   
   res.status(200).json(data);                        
  }