import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import RecetaType from "../types/receta.type";
import { Doctor } from "./doctor.model";
import { Cita } from "./cita.model";


export class Receta extends Model<RecetaType> {}

Receta.init(
{
    idReceta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idCita:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    edad:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    peso:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    altura:{
       type:DataTypes.DECIMAL ,
       allowNull:false
    },
    diagnostico:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    indicaciones:{
        type: DataTypes.TEXT,
        allowNull: false
    }
    },
{
    sequelize,
    tableName: "receta",
}
);

