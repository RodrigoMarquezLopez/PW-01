
const main2 = (()=>{
    const $usuario = document.getElementById("user");
    const $correo = document.getElementById("email");
    const $contrasena = document.getElementById("password");
    const BASE_URL = "https://clinicaesp-d.onrender.com";
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

main2.init();