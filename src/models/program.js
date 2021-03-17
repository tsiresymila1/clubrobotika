'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Program extends Model {
        static init(sequelize) {
            super.init({
                category: DataTypes.STRING,
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                numero: DataTypes.INTEGER,
                date: DataTypes.DATE,
                finish: DataTypes.BOOLEAN,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Program',
            });
        }
        static associate(models) {
            this.hasMany(models.File);

            this.belongsToMany(models.Student, {
                through: models.PStudent,
                as: 'presents',
                foreignKey: 'programid'
            });

            this.belongsToMany(models.Coach, {
                through: models.Cprogram,
                as: 'coachs',
                foreignKey: 'programid'
            });

        }
    };
    return Program;
};