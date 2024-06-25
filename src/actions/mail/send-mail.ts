'use server'

const nodemailer = require("nodemailer");

export interface Mail {
    fullName: string;
    empress?: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}

export const sendMail = async (data: Mail) => {

    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        const info = await transporter.sendMail({
            from: `'${data.fullName} <${data.email}>'`,
            to: "aquintanalm.dev@gmail.com",
            subject: data.subject,
            text: `
                Nombre completo: ${data.fullName}
                Empresa: ${data.empress}
                Teléfono: ${data.phone}
                Email: ${data.email}
                Mensaje:
                ${data.message}
            `,
        });

        return {
            ok: true,
            message: info
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error
        }
    }
}