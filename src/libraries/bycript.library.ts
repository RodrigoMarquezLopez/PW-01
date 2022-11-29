import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, salt);
}

export function isValidPassword(pass: string, passHash: string | undefined) {
  return bcrypt.compareSync(pass, passHash || "");
}

export function generatePassword() {
  return Math.random().toString(36).slice(-11);
}

