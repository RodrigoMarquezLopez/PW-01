import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import PersonaType from "../types/persona.type";
import { Doctor } from "./doctor.model";
import { Cita } from "./cita.model";
import { SesionModel } from "./sesion.model";

export class Persona extends Model<PersonaType> {}

Persona.init(
{
    idPersona:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombres:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    apellidoP:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    apellidoM:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: { name: "uCorreoUsuario", msg: "Correo Anteriormente Registrado" },
        validate: {
          isEmail: {
            msg: "no es un correo",
          },
        },
      },
      contrasenia: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      estatus: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "A",
      },
      rol: {
        type: DataTypes.STRING(4),
        allowNull: false,
        defaultValue: "1111",
      },
      token_restauracion: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },  
    },
{
    sequelize,
    tableName: "persona",
}
);

Persona.hasOne(Doctor,{
    foreignKey:"idPersona",
    sourceKey:"idPersona"
});

Persona.hasMany(Cita,{
    foreignKey:"idPersona",
    sourceKey:"idPersona"
});

Persona.hasMany(SesionModel, {
    foreignKey: "idPersona",
    sourceKey: "idPersona",
  });