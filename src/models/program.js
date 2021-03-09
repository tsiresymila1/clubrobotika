'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Program extends Model {
        static init(sequelize) {
            super.init({
                category: DataTypes.STRING,
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                firstpage: DataTypes.INTEGER,
                lastpage: DataTypes.INTEGER,
                date: DataTypes.DATE,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Program',
            });
        }
        static associate(models) {
            this.belongsToMany(models.File, {
                through: 'ProgramFiles',
                as: 'files',
                foreignKey: 'programid'
            });
            this.belongsToMany(models.Coach, {
                through: 'CoachPrograms',
                as: 'coachs',
                foreignKey: 'programid'
            });

        }
    };
    return Program;
};