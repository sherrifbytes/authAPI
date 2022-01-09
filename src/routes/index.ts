import express from "express";
import user from './auth/user.routes';
import auth from './auth/auth.routes';

const router = express.Router();

router.use(user);
router.use(auth);

router.get("/healthcheck", (_, res) => res.sendStatus(200));

export default router;