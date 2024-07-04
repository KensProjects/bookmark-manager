/*
  Warnings:

  - You are about to drop the column `bookmarkName` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `name` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Bookmark_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bookmark" ("createdAt", "createdById", "id", "updatedAt", "url") SELECT "createdAt", "createdById", "id", "updatedAt", "url" FROM "Bookmark";
DROP TABLE "Bookmark";
ALTER TABLE "new_Bookmark" RENAME TO "Bookmark";
CREATE UNIQUE INDEX "Bookmark_id_key" ON "Bookmark"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
