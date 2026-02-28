import { DataTypes } from "sequelize";
import { sequelize } from "../sequelizer/sequelizer.js";

export const Order = sequelize.define(
  "Order",
  {
    county_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        min: 40.4,
        max: 45.1,
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        min: -79.8,
        max: -71.8,
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    composite_tax_rate: {
      type: DataTypes.DECIMAL(5, 4),
      allowNull: false,
    },
    tax_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    state_rate: {
      type: DataTypes.DECIMAL(5, 4),
      allowNull: true,
    },
    county_rate: {
      type: DataTypes.DECIMAL(5, 4),
      allowNull: true,
    },
    city_rate: {
      type: DataTypes.DECIMAL(5, 4),
      allowNull: true,
    },
    special_rates: {
      type: DataTypes.DECIMAL(5, 4),
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  },
);
