import { prisma } from '@/lib/prisma';

// Cameras

export async function getCameras(options?: { siteId?: string }) {
  const where: any = {};
  if (options?.siteId) where.siteId = options.siteId;

  return prisma.camera.findMany({
    where,
    include: { site: true, recordings: true },
    orderBy: { name: 'asc' },
  });
}

export async function getCameraById(id: string) {
  return prisma.camera.findUnique({
    where: { id },
    include: { site: true, recordings: { orderBy: { startTime: 'desc' } } },
  });
}

// Recordings

export async function getRecordings(options?: { siteId?: string; cameraId?: string }) {
  const where: any = {};
  if (options?.siteId) where.siteId = options.siteId;
  if (options?.cameraId) where.cameraId = options.cameraId;

  return prisma.cCTVRecording.findMany({
    where,
    include: { camera: true, site: true },
    orderBy: { startTime: 'desc' },
  });
}

// Storage

export async function getStorageBySite(siteId: string) {
  return prisma.cCTVStorage.findUnique({
    where: { siteId },
    include: { site: true },
  });
}

export async function getStorage() {
  return prisma.cCTVStorage.findMany({
    include: { site: true },
  });
}
