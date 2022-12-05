import ejs from "ejs";
import path from "path";
import pdf from "html-pdf";
import fs from "fs";

/**
 * FUncion para renderizar un archivo ejs a html
 * @param params 
 * @returns 
 */
export async function renderFileHtml(params: { file:string, data:object }) {
  const { file, data } = params;
  const filePath = path.join(__dirname, "..", "views","templates", file);
  const codeString = await ejs.renderFile(filePath, data);
  return codeString;
}

export async function renderReceta(params:{file:string,data:object}){
  const { file, data } = params;
  const filePath = path.join(__dirname, "..", "views","templates", file);
  return await ejs.renderFile(filePath, data);
  
}