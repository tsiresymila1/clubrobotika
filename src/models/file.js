'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class File extends Model {
        static init(sequelize) {
            super.init({
                name: DataTypes.STRING,
                securename: DataTypes.STRING,
                type: DataTypes.STRING,
                size: DataTypes.STRING,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'File',
            });
        }
        static associate(models) {
            this.belongsTo(models.Program);
        }
    };
    return File;
};