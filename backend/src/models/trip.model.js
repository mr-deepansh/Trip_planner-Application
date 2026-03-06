import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Trip = sequelize.define(
    'Trip',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: false
        } // the foreign key
    },
    {
        timestamps: true,
        indexes: [{ fields: ['created_by'] }]
    }
);

export { Trip };
