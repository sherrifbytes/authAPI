import nodemailer from 'nodemailer';

async function createTestCreds() {
    const creds = await nodemailer.createTestAccount();
    console.log({ creds });
}

createTestCreds();

async function sendMail() {};

export default sendMail;