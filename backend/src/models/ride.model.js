const { underscoredIf } = require("sequelize/lib/utils");

const RideModel = (sequelize, DataTypes) => {
  const Ride = sequelize.define(
    'Ride',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idCustomer: {
        field: 'customer_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idDriver: {
        field: 'driver_id',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      value: {
        type: DataTypes.DOUBLE(10,2),
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: 'Rides', 
      timestamps: true,
      underscored: true,
    }
  );

  Ride.associate = (models) => {
    Ride.belongsTo(models.Driver, {
      foreignKey: 'idDriver',
      as: 'Driver',
    });
  }

  return Ride;
};
module.exports = RideModel;
