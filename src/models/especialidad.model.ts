import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import EspecialidadType from "../types/especialidad.type";


export class Especialidad extends Model<EspecialidadType> {}

Especialidad.init(
{
    idEspecialidad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombreEsp:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING(80),
        allowNull: false
    },
    
    },
{
    sequelize,
    tableName: "especialidad",
}
);