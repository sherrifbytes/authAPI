import express from 'express';
import { createUserHandler } from '../../controller/user.controller';
import validateResource from '../../Middleware/validateResource';
import { createUserSchema } from '../../schema/user.schema';

const router = express.Router();

// routes
router.post(
    "/api/users", 
    validateResource(createUserSchema), 
    createUserHandler
);

export default router;