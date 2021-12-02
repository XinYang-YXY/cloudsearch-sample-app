module.exports = (sequelize, Sequelize) => {
  const Subscriber = sequelize.define("subscriber", {
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Subscriber;
};