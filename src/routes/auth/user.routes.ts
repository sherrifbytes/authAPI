import express from 'express';

const router = express.Router();

// routes
router.post("/api/users", (req, res) => {
    res.sendStatus(200)
});

export default router;