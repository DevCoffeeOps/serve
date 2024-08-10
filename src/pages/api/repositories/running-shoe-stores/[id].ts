import { NextApiRequest, NextApiResponse } from 'next';

// example model
import { createRowService as createRunningStoreService } from '@/../../load/dist/exports';
const runningShoeStoreService = createRunningStoreService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            return getRunningShoeStores(req, res, Number(id))
        case 'PUT':
            return updateRunningShoeStore(req, res, Number(id))
        case 'DELETE':
            return deleteRunningShoeStore(req, res, Number(id))
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getRunningShoeStores(_req: NextApiRequest, res: NextApiResponse, id: number) {
    const runningShoeStores = await runningShoeStoreService.findOne(id);
    if (runningShoeStores) {
        res.status(200).json(runningShoeStores);
    } else {
        res.status(404).json({ message: 'runningShoeStores not found' });
    }
}

async function updateRunningShoeStore(req: NextApiRequest, res: NextApiResponse, id: number) {
    try {
        const runningShoeStoreData = req.body;
        const updatedRunningShoeStore = await runningShoeStoreService.update(id, runningShoeStoreData);
        res.status(201).json(updatedRunningShoeStore);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

async function deleteRunningShoeStore(req: NextApiRequest, res: NextApiResponse, id: number) {
    await runningShoeStoreService.delete(id);
    res.status(204).end();
}
