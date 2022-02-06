import express from 'express';
import validateResource from '../../Middleware/validateResource';
import { createUserSchema } from '../../schema/user.schema';

const router = express.Router();

// routes
router.post("/api/users", validateResource(createUserSchema), (req, res) => {
    res.sendStatus(200)
});

export default router;