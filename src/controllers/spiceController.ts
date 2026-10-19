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
    // validation
    if (!req.body){
        return res.status(400).json({error: 'Validation failed'});
    }

    //Add new spice to DB
    await Spice.create(req.body);

    // send response back
    return res.status(201).json();
})

router.put('/:id', async (req: Request, res: Response) => {
    // Fetch spice
    const spice = await Spice.findById(req.params.id);

    //validation
    if (spice == null) {
        return res.status(404).json({ err: 'Exercise Not Found' });
    }

    spice.set(req.body);
    await spice.save(req.body);
    return res.status(204).json({ msg: 'Spice Updated' });
})

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