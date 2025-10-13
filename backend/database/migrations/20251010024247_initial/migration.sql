-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3) NOT NULL,
    "locationName" TEXT,
    "streetAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "eventUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "category" TEXT,
    "price" TEXT,
    "organizer" TEXT,
    "contactInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scrapedAt" TIMESTAMP(3),
    "sourceWebsiteId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceWebsite" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastScrapedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceWebsite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_title_endDate_locationName_key" ON "Event"("title", "endDate", "locationName");

-- CreateIndex
CREATE UNIQUE INDEX "SourceWebsite_url_key" ON "SourceWebsite"("url");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sourceWebsiteId_fkey" FOREIGN KEY ("sourceWebsiteId") REFERENCES "SourceWebsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
