'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class PStudent extends Model {
        static init(sequelize) {
            super.init({
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'PStudent',
            });
        }
        static associate(models) {}
    };
    return PStudent;
};