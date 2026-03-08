import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger.js';

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  benchmark: true,
  logging: (msg, timing) => {
    const isSyncQuery =
      msg.includes('information_schema') ||
      msg.includes('ALTER TABLE') ||
      msg.includes('CREATE TABLE') ||
      msg.includes('CREATE INDEX') ||
      msg.includes('CREATE TYPE') ||
      msg.includes('CREATE UNIQUE INDEX') ||
      msg.includes('pg_class') ||
      msg.includes('pg_attribute') ||
      msg.includes('pg_index');

    if (isSyncQuery) {
      return;
    }

    if (timing && timing > 100) {
      logger.warn(`[SLOW QUERY] Execution time: ${timing}ms - ${msg}`);
    } else if (process.env.NODE_ENV === 'development') {
      logger.debug(`[QUERY] ${msg} - ${timing}ms`);
    }
  },
  pool: {
    max: 25,
    min: 2,
    acquire: 30000,
    idle: 10000
  }
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('PostgreSQL Database Connected Successfully');
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.ENABLE_SYNC === 'true'
    ) {
      logger.info('Running database sync in development mode...');
      await sequelize.sync({ alter: true });
    }
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error.message}`);
    process.exit(1);
  }
};
