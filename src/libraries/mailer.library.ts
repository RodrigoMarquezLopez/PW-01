import nodemailer from "nodemailer";

/**
 * Configuraciond el transporte de la libreria nodemailer
 */
export const mailer = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
});