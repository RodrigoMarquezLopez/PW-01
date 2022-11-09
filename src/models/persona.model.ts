import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import PersonaType from "../types/persona.type";
import { Doctor } from "./doctor.model";
import { Cita } from "./cita.model";

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
    correo:{
        type: DataTypes.STRING(45),
        allowNull: false
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

