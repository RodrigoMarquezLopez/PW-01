/**
 * Funcion principal de la vista agregar especialidad, funcionalidad del
 * administrador
 *
 */

const mainAgregarEspecialidad = (()=>{
    const BASE_URL = "https://clinicaesp-q.onrender.com/";
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

    /**
     * Funcion que da accion al boton registrar especialidad
     * verifica que los campos de nombre de especialidad y descripcion esten debidamente
     * requisitados
     * @param {click} event 
     */
    
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

    /**
     * Funcion que añade el evento al boton
     */
    const iniciar = ()=>{
        $guardar.addEventListener("click",acitonBoton);
    };

    /**
     * Funcion de aranque
     */
    return {
        init: () => {
          iniciar();
        },
      }


})();
mainAgregarEspecialidad.init();