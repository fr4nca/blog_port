import Sequelize, { Model } from 'sequelize';

class Skill extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        area_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.SkillArea, { foreignKey: 'area_id', as: 'area' });
  }
}

export default Skill;
