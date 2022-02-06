import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import sendMail from '../utils/mailer';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;

    try {
        const user = await createUser(body);

        await sendMail();

        return res.send("User successfully created");
    } catch (err: any) {
        if(err.code === 11000) return res.status(409).send("Account already exists");
        return res.status(500).send(err);
    }
}