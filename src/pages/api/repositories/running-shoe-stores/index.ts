import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma, RunningShoeStoreService } from 'load/dist/exports.js'

const prisma = new PrismaClient()
const runningShoeStoreService = new RunningShoeStoreService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getRunningShoeStores(req, res)
    case 'POST':
      return createRunningShoeStore(req, res)
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function getRunningShoeStores(_req: NextApiRequest, res: NextApiResponse) {
  const runningShoeStores = await runningShoeStoreService.findAll()
  res.status(200).json(runningShoeStores)
}

async function createRunningShoeStore(req: NextApiRequest, res: NextApiResponse) {
  try {
    const runningShoeStoreData = req.body
    const newRunningShoeStore = await runningShoeStoreService.create(runningShoeStoreData)
    res.status(201).json(newRunningShoeStore)
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
