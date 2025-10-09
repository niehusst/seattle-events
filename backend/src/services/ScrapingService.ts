import puppeteer, { Browser, Page } from 'puppeteer';
import * as cheerio from 'cheerio';
import { EventRepository } from './EventRepository';
import { SourceWebsiteRepository } from './SourceWebsiteRepository';
import { IEvent } from '../models/Event';
import { ISourceWebsite } from '../models/SourceWebsite';
import { DuplicateDetectionService } from './DuplicateDetectionService';

export class ScrapingService {
  private eventRepository: EventRepository;
  private sourceWebsiteRepository: SourceWebsiteRepository;
  private duplicateDetectionService: DuplicateDetectionService;
  private browser: Browser | null = null;

  constructor() {
    this.eventRepository = new EventRepository();
    this.sourceWebsiteRepository = new SourceWebsiteRepository();
    this.duplicateDetectionService = new DuplicateDetectionService();
  }

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: process.env.HEADLESS_BROWSER !== 'false',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

  async scrapeAllWebsites(): Promise<void> {
    const websites = await this.sourceWebsiteRepository.findAll();

    for (const website of websites) {
      if (website.isActive) {
        await this.scrapeWebsite(website);
      }
    }
  }

  async scrapeWebsite(website: ISourceWebsite): Promise<void> {
    if (!this.browser) {
      await this.initialize();
    }

    let page: Page | null = null;
    try {
      console.log(`Starting scraping for: ${website.url}`);
      page = await this.browser!.newPage();

      // Set user agent to avoid blocking
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );

      await page.goto(website.url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Wait for content to load
      await page.waitForSelector('body', { timeout: 10000 });

      const html = await page.content();
      const events = this.parseEvents(html, website);

      if (events.length === 0) {
        // TODO: log issue
        console.log(`No events found for ${website.url}`);
      }

      for (const event of events) {
        // Check for duplicates before saving
        const isDuplicate = await this.duplicateDetectionService.isDuplicate(
          event.title,
          event.endDate,
          event.locationName || ''
        );

        if (isDuplicate) {
          continue;
        }

        // Create a new event
        await this.eventRepository.create(event);
      }
    } catch (error: any) {
      console.error(`Error scraping ${website.url}:`, error);
    } finally {
      if (page) {
        await page.close();
      }
    }
    // Update the last scraped time for the website
    await this.sourceWebsiteRepository.updateLastScraped(website.id, new Date());
  }

  private parseEvents(html: string, website: ISourceWebsite): IEvent[] {
    const events: IEvent[] = [];
    const $ = cheerio.load(html);

    // Different selectors for different websites
    // This is a simplified example - in practice, you'd have specific parsing logic for each website
    let eventSelectors = [
      '.event-item', // Common class names for events
      '.event',
      '.listing-item',
      '.activity',
      '[class*="event"]', // Any element with "event" in class name
    ];

    // For visitseattle.org, which was mentioned in the spec
    if (website.url.includes('visitseattle.org')) {
      eventSelectors = ['.event-card', '.teaser', '.card'];
    } else if (website.url.includes('events12.com')) {
      eventSelectors = ['.eventEntry', '.listItem'];
    }

    for (const selector of eventSelectors) {
      $(selector).each((index, element) => {
        const title = $(element).find('h1, h2, h3, .title, .event-title').first().text().trim();

        if (!title) return; // Skip if no title found

        // Extract other event details
        const description = $(element)
          .find('.description, .event-description, p')
          .first()
          .text()
          .trim();
        const location = $(element).find('.location, .venue, .address').first().text().trim();
        const dateText =
          $(element).find('.date, .event-date, time').first().attr('datetime') ||
          $(element).find('.date, .event-date, time').first().text().trim();

        // Basic date parsing - in practice this would be more sophisticated
        let startDate: Date | null = null;
        if (dateText) {
          const parsedDate = new Date(dateText);
          if (!isNaN(parsedDate.getTime())) {
            startDate = parsedDate;
          }
        }

        // If we couldn't parse a date from the element, try to get it from the website in general
        if (!startDate) {
          // This is a simplified approach; in reality, you might need to visit the event page for details
          const datesOnPage = $('time')
            .map((i, el) => $(el).attr('datetime') || $(el).text())
            .get();
          for (const dateStr of datesOnPage) {
            const parsed = new Date(dateStr);
            if (!isNaN(parsed.getTime())) {
              startDate = parsed;
              break;
            }
          }
        }

        // Skip if no valid date could be determined
        if (!startDate) {
          return;
        }

        // Extract URL - either from the element itself or a link within it
        let eventUrl = $(element).find('a').first().attr('href') || '';

        // If URL is relative, make it absolute
        if (eventUrl && !eventUrl.startsWith('http')) {
          try {
            eventUrl = new URL(eventUrl, website.url).href;
          } catch {
            // If URL construction fails, skip this event
            return;
          }
        }

        // Create event object
        const event: IEvent = {
          id: '', // Will be generated by the database
          title,
          description,
          startDate,
          endDate: startDate, // Not always available in listings
          locationName: location || undefined,
          streetAddress: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
          latitude: undefined,
          longitude: undefined,
          eventUrl: eventUrl || website.url,
          imageUrl: $(element).find('img').first().attr('src') || undefined,
          category: website.name, // Use website name as category
          price: undefined,
          organizer: undefined,
          contactInfo: undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
          scrapedAt: new Date(),
          sourceWebsiteId: website.id,
        };

        events.push(event);
      });

      // If we found events with this selector, no need to try other selectors
      if (events.length > 0) {
        break;
      }
    }

    return events;
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}
