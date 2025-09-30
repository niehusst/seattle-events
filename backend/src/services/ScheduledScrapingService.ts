import cron from 'node-cron';
import { ScrapingService } from './ScrapingService';

export class ScheduledScrapingService {
  private scrapingService: ScrapingService;
  private task: cron.ScheduledTask | null = null;

  constructor() {
    this.scrapingService = new ScrapingService();
  }

  async start(): Promise<void> {
    // Initialize the scraping service
    await this.scrapingService.initialize();

    // Schedule the scraping to run daily at 2 AM (as specified in .env.example)
    // The cron expression "0 2 * * *" means: minute 0, hour 2, any day, any month, any day of week
    const cronExpression = process.env.SCRAPE_INTERVAL || '0 2 * * *';

    console.log(`Scheduling scraping to run with cron expression: ${cronExpression}`);

    this.task = cron.schedule(cronExpression, async () => {
      console.log(`Running scheduled scraping at ${new Date().toISOString()}`);
      try {
        await this.scrapingService.scrapeAllWebsites();
        console.log('Scheduled scraping completed successfully');
      } catch (error) {
        console.error('Error during scheduled scraping:', error);
      }
    });

    // Also run an initial scrape when the service starts
    console.log('Running initial scraping...');
    try {
      await this.scrapingService.scrapeAllWebsites();
      console.log('Initial scraping completed successfully');
    } catch (error) {
      console.error('Error during initial scraping:', error);
    }
  }

  stop(): void {
    if (this.task) {
      this.task.stop();
      console.log('Scheduled scraping stopped');
    }
  }

  async forceScrape(): Promise<void> {
    console.log('Manually triggering scraping...');
    await this.scrapingService.scrapeAllWebsites();
    console.log('Manual scraping completed');
  }
}
