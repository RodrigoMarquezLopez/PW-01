import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import CitaType from "../types/cita.type";


export class Cita extends Model<CitaType> {}

Cita.init(
{
    idCita:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    hora:{
        type:DataTypes.STRING,
        allowNull:false
    },
    motivo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idDoctor:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idPersona:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

    
    },
{
    sequelize,
    tableName: "cita",
}
);