-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "url_gambar" TEXT NOT NULL,
    "imagekit_url" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_judul_key" ON "images"("judul");

-- CreateIndex
CREATE UNIQUE INDEX "images_url_gambar_key" ON "images"("url_gambar");
