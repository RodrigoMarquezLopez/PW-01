import * as ejsLibrary from "../libraries/ejs.library";
import { mailer } from "../libraries/mailer.library";

/**
 * Funcion encargada de enviar las credenciales para el doctor cuando es agregado 
 * por el adnministrador
 * @param params 
 */
export async function sendUserCredentials(params: { data: object | undefined; mail: string | undefined }) {
  const { data, mail } = params;
  const htmlContent = await ejsLibrary.renderFileHtml({ data:data || {}, file: "credenciales-template.ejs"});
  const responseMailer = await mailer.sendMail({
    from: '"Médicos Especialistas 🏥" <medicosespecialistas.clinica@gmail.com>',
    to: mail,
    html: htmlContent,
    subject:"Credenciales de Acceso"
  });
}
/**
 * Funcion para enviar un correo cuando un nuevo usuario se registra en la plataforma
 * @param params 
 */
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
/**
 * Funcion par enviar la confirmacion de una cita 
 * @param params 
 */
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

