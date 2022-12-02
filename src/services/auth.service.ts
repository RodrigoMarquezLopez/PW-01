import * as ejsLibrary from "../libraries/ejs.library";
import { mailer } from "../libraries/mailer.library";

export async function sendUserCredentials(params: { data: object | undefined; mail: string | undefined }) {
  const { data, mail } = params;
  const htmlContent = await ejsLibrary.renderFileHtml({ data:data || {}, file: "credenciales-template.ejs"});
  const responseMailer = await mailer.sendMail({
    from: process.env.MAILER_USER,
    to: mail,
    html: htmlContent,
    subject:"Credenciales de Acceso"
  });
}

export async function sendBienvenida(params: { data: object | undefined; mail: string | undefined }) {
  const { data, mail } = params;
  const htmlContent = await ejsLibrary.renderFileHtml({ data:data || {}, file: "bienvenida-template.ejs"});
  const responseMailer = await mailer.sendMail({
    from: '"Médicos Especialistas 🏥" <medicosespecialistas.clinica@gmail.com>',
    to: mail,
    html: htmlContent,
    subject:"Bienvenid@ a Medicos Especialistas Oaxaca"
  });
}

export async function sendConfirmacion(params: { data: object | undefined; mail: string | undefined }) {
  const { data, mail } = params;
  const htmlContent = await ejsLibrary.renderFileHtml({ data:data || {}, file: "cuerpo-correo.ejs"});
  const responseMailer = await mailer.sendMail({
            from: '"Médicos Especialistas 🏥" <medicosespecialistas.clinica@gmail.com>', // sender address
            to:     mail, // list of receivers 
            subject: "Confirma tu cita" , // Subject line
            text: " ", // plain text body
            html: htmlContent, // html bod
  });
}

