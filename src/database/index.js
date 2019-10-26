import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Post from '../app/models/Post';
import SkillArea from '../app/models/SkillArea';
import Skill from '../app/models/Skill';

const models = [User, Post, SkillArea, Skill];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    if (process.env.NODE_ENV == 'development')
      this.connection
        .authenticate()
        .then(() => console.log('Sequelize initialized.'))
        .catch(err => console.log('Unable to connect to the database:', err));

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
