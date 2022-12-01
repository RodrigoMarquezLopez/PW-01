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