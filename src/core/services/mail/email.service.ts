'use server'

import { Mail } from "@/core/interfaces/contact/mail.interface";
import nodemailer, { TransportOptions } from "nodemailer";

export const sendMail = async (data: Mail) => {

    const host = process.env.GMAIL_HOST;
    const port = process.env.GMAIL_PORT;
    const ssl = process.env.GMAIL_SSL;
    const gmailUser = process.env.GMAIL_USER;
    const gmailPswd = process.env.GMAIL_PASS;
    const receptor = process.env.EMAIL;

    if (!host || !port || !ssl || !gmailUser || !gmailPswd || !receptor) {
        return {
            ok: false,
            message: "Hace falta configurar las variables de entorno"
        }
    };

    try {
        const transporter = nodemailer.createTransport({
            host: host,
            port: parseInt(port), // Convertimos a número
            secure: ssl, // true para 465, false para otros puertos
            auth: {
                user: gmailUser,
                pass: gmailPswd,
            },
        } as TransportOptions);

        const info = await transporter.sendMail({
            from: `'${data.name} <${data.email}>'`,
            to: receptor,
            subject: `${data.subject}`,
            text: `
                Nombre completo: ${data.name}
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