-- CreateEnum
CREATE TYPE "branch_type" AS ENUM ('HEAD_OFFICE', 'BRANCH', 'HUB', 'DISTRIBUTION_CENTER');

-- CreateEnum
CREATE TYPE "warehouse_type" AS ENUM ('MAIN', 'TRANSIT', 'RETURN', 'DAMAGED', 'COLD_STORAGE', 'OTHER');

-- CreateEnum
CREATE TYPE "record_status" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateTable
CREATE TABLE "branches" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT,
    "type" "branch_type" NOT NULL,
    "status" "record_status" NOT NULL DEFAULT 'ACTIVE',
    "region" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "street" TEXT,
    "postalCode" TEXT,
    "shortAddress" TEXT,
    "nationalAddress" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "managerName" TEXT,
    "managerPhone" TEXT,
    "isHeadOffice" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouses" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT,
    "type" "warehouse_type" NOT NULL,
    "status" "record_status" NOT NULL DEFAULT 'ACTIVE',
    "capacity" DOUBLE PRECISION,
    "capacityUnit" TEXT,
    "phone" TEXT,
    "supervisorName" TEXT,
    "supervisorPhone" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "branches_code_key" ON "branches"("code");

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_code_key" ON "warehouses"("code");

-- AddForeignKey
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
