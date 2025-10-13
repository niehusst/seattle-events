import cron from 'node-cron';

export class ScheduledJobService {
  private task: cron.ScheduledTask | null = null;
  private action: () => Promise<void>;

  constructor(action: () => Promise<void>) {
    this.action = action;
  }

  async start(): Promise<void> {
    const cronExpression = process.env.SCRAPE_INTERVAL || '0 2 * * *';

    console.log(`Scheduling scraping to run with cron expression: ${cronExpression}`);

    this.task = cron.schedule(cronExpression, this.action);

    // Also run an initial when the service starts
    console.log('Running initial scraping...');
    await this.action();
  }

  stop(): void {
    if (this.task) {
      this.task.stop();
      console.log('Scheduled scraping stopped');
    }
  }
}
