-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
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
    "sourceWebsiteId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SourceWebsite" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastScrapedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scrapingConfig" JSONB,

    CONSTRAINT "SourceWebsite_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "Event_title_startDate_locationName_key" ON "public"."Event"("title", "startDate", "locationName");

-- CreateIndex
CREATE UNIQUE INDEX "SourceWebsite_url_key" ON "public"."SourceWebsite"("url");

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_sourceWebsiteId_fkey" FOREIGN KEY ("sourceWebsiteId") REFERENCES "public"."SourceWebsite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

