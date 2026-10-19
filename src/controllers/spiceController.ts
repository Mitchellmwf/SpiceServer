import express, { Request, Response, Router } from 'express';
import Spice from "../models/spice.model.js";

// create router to map url requests 
const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/spices:
 *   get:
 *     tags:
 *     - Spice
 *     summary: List all spices
 *     responses:
 *       200:
 *         description: A list of spices
 *       404:
 *         description: No spices found
 */
router.get('/', async (req: Request, res: Response) => {
    // Fetch all spices from mongodb
    const spices = await Spice.find();

    if (spices.length === 0) return res.status(404).json({ err: 'No spices found' });

    return res.status(200).json(spices);
})


/**
 * @swagger
 * /api/v1/spices/{id}:
 *   get:
 *     tags:
 *     - Spice
 *     summary: Retrieve spice by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the spice to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific spice
 *       404:
 *         description: Spice not found
 */
router.get('/:id', async (req: Request, res: Response) => {
    //Fetch specific spice
    const spice = await Spice.findById(req.params.id);

    if (spice === null) return res.status(404).json({ err: 'Spice not found' });

    return res.status(200).json(spice);
})

/**
 * @swagger
 * /api/v1/spices:
 *   post:
 *     tags:
 *     - Spice
 *     summary: Add a new spice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               source:
 *                 type: string
 *               profile:
 *                 type: string
 *               colour:
 *                 type: string
 *               texture:
 *                 type: string
 *               capsaicin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Spice created successfully
 *       400:
 *         description: Validation failed
 */
router.post('/', async (req: Request, res: Response) => {
    // validation
    if (!req.body){
        return res.status(400).json({error: 'Validation failed'});
    }

    //Add new spice to DB
    await Spice.create(req.body);

    // send response back
    return res.status(201).json();
})

/**
 * @swagger
 * /api/v1/spices/{id}:
 *   put:
 *     tags:
 *     - Spice
 *     summary: Update a specific spice by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the spice to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               source:
 *                 type: string
 *               profile:
 *                 type: string
 *               colour:
 *                 type: string
 *               texture:
 *                 type: string
 *               capsaicin:
 *                 type: boolean
 *     responses:
 *       204:
 *         description: Spice updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Spice not found
 */
router.put('/:id', async (req: Request, res: Response) => {
    // Fetch spice
    const spice = await Spice.findById(req.params.id);

    //validation
    if (spice == null) {
        return res.status(404).json({ err: 'Spice Not Found' });
    }

    spice.set(req.body);
    await spice.save(req.body);
    return res.status(204).json({ msg: 'Spice Updated' });
})

/**
 * @swagger
 * /api/v1/spices/{id}:
 *   delete:
 *     tags:
 *     - Spice
 *     summary: Delete a specific spice by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the spice to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Spice deleted successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Spice not found
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const spice = await Spice.findById(req.params.id);
    
    // Validation
    if (!req.params.id) {
        return res.status(400).json({error: 'id is missing'});
    }
    if (spice == null) return res.status(404).json({ err: 'Spice Not Found' });

    await spice.deleteOne({ _id: req.params.id });
    return res.status(204).json({ msg: 'Spice Deleted' });
})



export default router;