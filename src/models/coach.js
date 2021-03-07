'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Coach extends Model {
        static init(sequelize) {
            super.init({
                userId: DataTypes.STRING,
                username: DataTypes.STRING,
                name: DataTypes.STRING,
                lastname: DataTypes.STRING,
                phone: DataTypes.STRING,
                email: DataTypes.STRING,
                matricule: DataTypes.STRING,
                category: DataTypes.STRING,
                image: DataTypes.STRING,
                password: DataTypes.STRING,
                role: DataTypes.STRING,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Coach',
            });
        }
        static associate(models) {
            this.belongsToMany(models.File, {
                through: 'CoachFiles',
                as: 'files',
                foreignKey: 'coachid'
            });
            this.belongsToMany(models.Program, {
                through: 'CoachProgram',
                as: 'programs',
                foreignKey: 'coachid'
            });
        }
    };
    return Coach;
};