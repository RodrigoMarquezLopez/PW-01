const main2 = (()=>{
    const $usuario = document.getElementById("user");
    const $correo = document.getElementById("email");
    const $contrasena = document.getElementById("password");
    const BASE_URL = "http://localhost:4000";
    const persona = JSON.parse(OBJpersona);
    console.log(persona);

    const $cuerpoTabla = document.getElementById("cuerpotabla");
    var cita;

    const _getData = async () =>{
         const response = await http.get(BASE_URL+"/usuarios");
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