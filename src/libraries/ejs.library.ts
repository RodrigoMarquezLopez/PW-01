import ejs from "ejs";
import path from "path";

export async function renderFileHtml(params: { file:string, data:object }) {
  const { file, data } = params;
  const filePath = path.join(__dirname, "..", "views","templates", file);
  const codeString = await ejs.renderFile(filePath, data);
  return codeString;
}
