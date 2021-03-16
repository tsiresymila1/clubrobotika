'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Fee extends Model {
        static init(sequelize) {
            super.init({
                studentid: DataTypes.INTEGER,
                matricule: DataTypes.STRING,
                firstmount: DataTypes.STRING,
                secondmonth: DataTypes.STRING,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Fee',
            });
        }
        static associate(models) {
            this.belongsTo(models.Student, {
                foreignKey: 'studentid'
            });
        }
    };
    return Fee;
};