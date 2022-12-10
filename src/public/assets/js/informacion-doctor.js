/**
 * Funcion principal para la vista de informacion del doctor
 */
const mainDoctor = (()=>{
    const $usuario = document.getElementById("user");
    const $correo = document.getElementById("email");
    const $contrasena = document.getElementById("password");
    const $cedula = document.getElementById("ced");
    const $horae = document.getElementById("he");
    const $horas = document.getElementById("hs");
    const BASE_URL = "https://clinicaesp-q.onrender.com";
    const persona = JSON.parse(OBJpersona);
    console.log(persona);


    const _getData = async () =>{
         const response = await http.get(BASE_URL+"/informacion/usuarios");
         var item;
         for(let index = 0; index < response.length; index++){
           item = response[index];
          if(item["idPersona"]==persona["idPersona"]){
            
            $usuario.innerText = item["nombres"]+" "+ item["apellidoP"]+" "+ item["apellidoM"];
            $correo.innerText = item["correo"];
            $contrasena.innerText = "**************";
            $cedula.innerText = persona["cedula"];
            $horae.innerText = persona["horaEntrada"];
            $horas.innerText = persona["horaSalida"];

          }
        
     }
        

      };





    const _initElements = () => {
        _getData();
        
      };
    
      return {
        init: () => {
          _initElements();
        },
      }


})();

mainDoctor.init();