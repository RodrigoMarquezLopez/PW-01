import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import DoctorType from "../types/doctor.type";
import { Cita } from "./cita.model";


export class Doctor extends Model<DoctorType> {}

Doctor.init(
{
    idDoctor:{
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

    cedula:{
        type: DataTypes.STRING,
        allowNull: false
    },

    horaEntrada:{
        type: DataTypes.STRING,
        allowNull: false
    },
    horaSalida:{
        type: DataTypes.STRING,
        allowNull: false
    }

    },
{
    sequelize,
    tableName: "doctor",
}
);

Doctor.hasMany(Cita,{
    foreignKey:"idDoctor",
    sourceKey:"idDoctor"
});

