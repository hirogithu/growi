import mongoose from 'mongoose';

import { getModelSafely, getMongoUri, mongoOptions } from '@growi/core';
import loggerFactory from '~/utils/logger';

const logger = loggerFactory('growi:migrate:make-email-unique');

module.exports = {

  async up(db, next) {
    logger.info('Start migration');
    mongoose.connect(getMongoUri(), mongoOptions);

    const User = getModelSafely('User') || require('~/server/models/user')();

    // get all users who has 'deleted@deleted' email
    const users = await User.find({ email: 'deleted@deleted' });
    if (users.length > 0) {
      logger.info(`${users.length} users found. Replace email...`, users);
    }

    // make email unique
    const promises = users.map((user) => {
      const now = new Date();
      const deletedLabel = `deleted_at_${now.getTime()}`;
      user.email = `${deletedLabel}@deleted`;
      return user.save();
    });
    await Promise.all(promises);

    // sync index
    logger.info('Invoking syncIndexes');
    await User.syncIndexes();

    await mongoose.disconnect();

    logger.info('Migration has successfully terminated');
    next();
  },

  down(db, next) {
    // do not rollback
    next();
  },

};
