'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users_Tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      expiration: {
        type: Sequelize.INTEGER
      },
      reason: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users_Tokens');
  }
};

// tb.string("token").nullable();
// tb.string("expiration").nullable();
// tb.enum('reason', USER_TOKEN_REASONS);
// tb.string("displayName", 45);
// tb.string("email", 256);
// tb.integer("workspaceId");
// tb.integer("userId")
//   .unsigned().index()
//   .references("id")
//   .inTable("users")
//   .onDelete("CASCADE")
//   .onUpdate("CASCADE");
// tb.timestamps(true, true);
