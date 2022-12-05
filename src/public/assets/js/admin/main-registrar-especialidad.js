const mainAgregarEspecialidad = (()=>{
    const BASE_URL = "http://localhost:4000";
    const $nombreEsp = document.getElementById("nombreEsp");
    const $descripcion = document.getElementById("descripcion");
    const $guardar = document.getElementById("guardarEsp");
    
    

    

   

    

/*
    const acitonForm=(event)=>{
        //event.preventDefault();
        if($nombre.value == "" || $apellidoM.value=="" ||
           $apellidoP.value==""||$cedula.value==""||$correo.value==""){
            modalResultado.iniciarModal("/assets/other/tache.png","Todos los campos son necesarios","");
        }else if(!$correo.value.includes("@")){
            modalResultado.iniciarModal("/assets/other/tache.png","Correo No Valido","");
        }else{
            modalResultado.iniciarModal("/assets/other/realizado.png","Doctor Agregado Correctamente","");
            $form.submit();
        }
    };*/

    const acitonBoton = async (event)=>{
        if($nombreEsp.value == "" || $descripcion.value==""){
            modalResultado.iniciarModal("/assets/other/tache.png","Todos los campos son necesarios","");
        }else{
            modalResultado.iniciarModal("/assets/other/realizado.png","Doctor Agregado Correctamente","");
            //$form.submit();
            const data ={
                "url":BASE_URL+'admin/createEsp',
                "body":{
                      "nombreEsp":$nombreEsp.value,
                      "descripcion":$descripcion.value
                      
                      
                    },
              };
              const resultado = await http.post(data);    
              if(resultado["httpCode"]==201){
                  modalResultado.iniciarModal("/assets/other/realizado.png","Se ha agregado una nueva especialidad",``);
              }else{
                  modalResultado.iniciarModal("/assets/other/tache.png","Algo salio mal","");
              }
        }
    };

    const iniciar = ()=>{
        $guardar.addEventListener("click",acitonBoton);
    };

    return {
        init: () => {
          iniciar();
        },
      }


})();
mainAgregarEspecialidad.init();