import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import DoctorType from "../types/doctor.type";


export class Doctor extends Model<DoctorType> {}

Doctor.init(
{
    idDodctor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idPersona:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEspecialidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    
    
    },
{
    sequelize,
    tableName: "persona",
}
);