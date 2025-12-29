/*
  Warnings:

  - You are about to drop the column `featured` on the `vehicles` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" REAL,
    "mileage" INTEGER,
    "fuelType" TEXT,
    "transmission" TEXT,
    "color" TEXT,
    "images" TEXT DEFAULT '',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerName" TEXT,
    "city" TEXT,
    "ownerPhone" TEXT
);
INSERT INTO "new_vehicles" ("brand", "city", "color", "createdAt", "description", "fuelType", "id", "images", "isFeatured", "mileage", "model", "ownerName", "ownerPhone", "price", "slug", "transmission", "type", "updatedAt", "year") SELECT "brand", "city", "color", "createdAt", "description", "fuelType", "id", "images", "isFeatured", "mileage", "model", "ownerName", "ownerPhone", "price", "slug", "transmission", "type", "updatedAt", "year" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
CREATE UNIQUE INDEX "vehicles_slug_key" ON "vehicles"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
