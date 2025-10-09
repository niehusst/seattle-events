export interface ISourceWebsite {
  id: string;
  url: string;
  name: string;
  isActive: boolean;
  lastScrapedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
