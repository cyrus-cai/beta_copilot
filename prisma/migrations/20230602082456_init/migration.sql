-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('ACTIVE', 'REMOVED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MicroApp" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "AppStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "MicroApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMicroApp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "microAppId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMicroApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserMicroApp_userId_microAppId_key" ON "UserMicroApp"("userId", "microAppId");

-- AddForeignKey
ALTER TABLE "UserMicroApp" ADD CONSTRAINT "UserMicroApp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMicroApp" ADD CONSTRAINT "UserMicroApp_microAppId_fkey" FOREIGN KEY ("microAppId") REFERENCES "MicroApp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
