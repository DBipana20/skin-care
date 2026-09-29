import app from './app.js';
import { config } from './config/index.js';
import { db } from './db/database.js';

const startServer = async () => {
  try {
    // Initialize persistent database
    console.log('Initializing database store...');
    await db.init();
    console.log('Database initialized successfully.');

    // Start Express server
    const server = app.listen(config.port, () => {
      console.log(`===============================================`);
      console.log(`  GlowTrack Skincare Backend Server Running!  `);
      console.log(`  Port:    ${config.port}                     `);
      console.log(`  Base:    http://localhost:${config.port}     `);
      console.log(`  Health:  http://localhost:${config.port}/api/health `);
      console.log(`  API:     http://localhost:${config.port}/api `);
      console.log(`===============================================`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
