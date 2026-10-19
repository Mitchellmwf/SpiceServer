import express, { Request, Response, Router } from 'express';
import Spice from "./models/spice.model.js";

// create router to map url requests 
const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    // Fetch all spices from mongodb
    const spices = await Spice.find();

    if (spices.length === 0) return res.status(404).json({ err: 'No spices found' });

    return res.status(200).json(spices);
})

router.get('/:id', async (req: Request, res: Response) => {
    //Fetch specific spice
    const spice = await Spice.findById(req.params.id);

    if (spice === null) return res.status(404).json({ err: 'Spice not found' });

    return res.status(200).json(spice);
})

router.post('/:id', async (req: Request, res: Response) => {

})

router.put('/:id', async (req: Request, res: Response) => {

})

router.delete('/:id', async (req: Request, res: Response) => {

})




export default router;