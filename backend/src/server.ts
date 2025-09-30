import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { ScheduledScrapingService } from './services/ScheduledScrapingService';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT || '4000', 10) },
  });

  console.log(`🚀 Server ready at: ${url}`);

  // Initialize and start the scheduled scraping service
  const scrapingService = new ScheduledScrapingService();
  await scrapingService.start();

  console.log('🔄 Scheduled scraping service started');

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n shutting down scheduled scraping...');
    scrapingService.stop();

    // Close the Apollo server
    await server.stop();

    console.log('✅ Server shutdown complete');
    process.exit(0);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
