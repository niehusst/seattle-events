import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { ScheduledJobService } from './services/ScheduledJobService';
import { ScrapingService } from './services/ScrapingService';
import dotenv from 'dotenv';
import { DatabaseCleanupService } from './services/DatabaseCleanupService';

dotenv.config();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      console.error('GraphQL error:', err);
      return err;
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT || '4000', 10) },
  });

  console.log(`🚀 Server ready at: ${url}`);

  // Initialize and start the scheduled scraping and cleanup services
  const scrapingService = new ScrapingService();
  const cleanupService = new DatabaseCleanupService();

  const cronTasks = [
    new ScheduledJobService(async () => {
      try {
        await cleanupService.removeOldEvents();
      } catch (error) {
        console.error('Error performing cleanup', error);
      }
    }),
    new ScheduledJobService(async () => {
      console.log(`Running scheduled scraping at ${new Date().toISOString()}`);
      try {
        await scrapingService.scrapeAllWebsites();
        console.log('Scheduled scraping completed successfully');
      } catch (error) {
        console.error('Error during scheduled scraping:', error);
      }
    }),
  ];

  for (const task of cronTasks) {
    task.start();
  }
  console.log('🔄 Scheduled tasks started');

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\nShutting down scheduled jobs...');
    for (const task of cronTasks) {
      task.stop();
    }
    await server.stop();

    console.log('✅ Server shutdown complete');
    process.exit(0);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
