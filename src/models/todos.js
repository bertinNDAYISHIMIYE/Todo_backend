/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todos.belongsTo(models.users, {
        foreignKey: 'todoId',
        onDelete: 'CASCADE',
      });
    }
  }
  todos.init({
    content: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todos;
};
