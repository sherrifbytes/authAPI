import { getModelForClass, modelOptions, prop, Severity, pre, DocumentType } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from "argon2";
import log from "../utils/logger";

/** hashing the password */
@pre<User>("save", async function () {
    if (!this.isModified("password")) return;

    const hash = await argon2.hash(this.password);
    this.password = hash;
    return;
})

@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        // passwordResetCode is string, but also needs nullable
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ lowercase: true, required: true, unique: true })
    email: string;

    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop({ required: true })
    password: string;

    @prop({ required: true, default: () => nanoid })
    verificationCode: string;

    @prop() /** 
        no need untill request
        also can't reset with old code
        hence nulling
    */
    passwordResetCode: string | null;

    @prop({ default: false })
    verified: boolean;

    /** verify given password resolves to hashed password 
     * candidate password is the password we are going to 
     * test against the user's hashed password, the password 
     * supplied when logging in
    */
    async validatePassword(this: DocumentType<User>, candidatePassword: string) {
        try {
            return await argon2.verify(this.password, candidatePassword);
        } catch (err) {
            log.error(err, "Could not validate password");
            return false;
        }
    }
}

const userModel = getModelForClass(User);

export default userModel;