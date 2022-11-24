import app from "./app";
import { sequelize } from "./database/database.config";
import "./database/models.config";
import { emailer } from "./email/email.config";

async function main() {
 sequelize
    .sync({ alter: true })
    .then(() => {})
    .catch((err) => console.log(err));

    emailer
    .verify()
    .then(()=>{})
    .catch((err)=>console.log("di error en el controlador email"+err));  
    
  await app.listen(app.get("port"));

  console.log("Server running http://localhost:"+app.get("port"));
}


main();