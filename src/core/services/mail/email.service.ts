'use server'

import { headers } from 'next/headers';
import { Mail } from "@/core/interfaces/mail/mail.interface";
import nodemailer, { TransportOptions } from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const rateLimitMap = new Map<string, number[]>();

const sanitizeText = (value: string, maxLength: number) => {
    return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
};

const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

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
        };
    }

    const cleanName = sanitizeText(data.name, 80);
    const cleanSubject = sanitizeText(data.subject, 120);
    const cleanEmail = sanitizeText(data.email, 254).toLowerCase();
    const cleanMessage = sanitizeText(data.message, 2000);

    if (!cleanName || !cleanSubject || !cleanMessage || !isValidEmail(cleanEmail)) {
        return {
            ok: false,
            message: "Los datos enviados no son válidos."
        };
    }

    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for') ?? headerList.get('cf-connecting-ip') ?? 'unknown';
    const clientKey = forwardedFor.split(',')[0].trim() || 'unknown';
    const now = Date.now();
    const timestamps = rateLimitMap.get(clientKey) ?? [];
    const recent = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

    if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
        return {
            ok: false,
            message: "Has enviado demasiados mensajes. Inténtalo de nuevo más tarde."
        };
    }

    rateLimitMap.set(clientKey, [...recent, now]);

    try {
        const transporter = nodemailer.createTransport({
            host,
            port: Number.parseInt(port, 10),
            secure: String(ssl).toLowerCase() === 'true',
            auth: {
                user: gmailUser,
                pass: gmailPswd,
            },
        } as TransportOptions);

        const info = await transporter.sendMail({
            from: `Portfolio AQM <${gmailUser}>`,
            replyTo: `${cleanName} <${cleanEmail}>`,
            to: receptor,
            subject: `Portfolio AQM - ${cleanSubject}`,
            text: [
                'Nombre completo: ' + cleanName,
                'Email: ' + cleanEmail,
                'Mensaje:',
                cleanMessage,
            ].join('\n'),
        });

        return {
            ok: true,
            message: info
        };
    } catch (error) {
        console.error('Mail send error:', error);
        return {
            ok: false,
            message: 'No se pudo enviar el correo. Inténtalo de nuevo.'
        };
    }
}