import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
/**
 * Funcion para encriptar la contraseña, utiliza la libreria bycript con la que se genera un hash para un string dado
 * @param password 
 * @returns contraseña cifrada
 */
export function hashPassword(password: string) {
  return bcrypt.hashSync(password, salt);
}
/**
 * Comprobacion de contraseñas
 * @param pass 
 * @param passHash 
 * @returns boolean
 */
export function isValidPassword(pass: string, passHash: string | undefined) {
  return bcrypt.compareSync(pass, passHash || "");
}
/**
 * Funcion para generar una contraseña aleatoria, 
 * @returns string
 */
export function generatePassword() {
  return Math.random().toString(36).slice(-11);
}

