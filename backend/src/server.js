import app from './app.js';
import './models/index.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';

const REQUIRED_ENV_VARS = [
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'CORS_ORIGIN',
  'BACKEND_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET'
];

const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missing.length > 0) {
  logger.error(`Missing required environment variables: ${missing.join(', ')}`);
  logger.error(
    'Set these in your .env file (local) or Render dashboard (production).'
  );
  process.exit(1);
}
// ─────────────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`PostgreSQL connection failed! ${err}`);
  });
