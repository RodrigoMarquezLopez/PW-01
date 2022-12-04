

const mainAgregarDoctor = (()=>{
    const horasEntrada = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00"];
    const $form = document.getElementById("formAgregarDoctor");
    const $nombre = document.getElementById("nombre");
    const $apellidoP = document.getElementById("apellidoP");
    const $apellidoM = document.getElementById("apellidoM");
    const $correo = document.getElementById("email");
    const $especialidad = document.getElementById("esp");
    const $cedula = document.getElementById("cedula");
    const $horaEntrada = document.getElementById("horaEntrada");
    const $horaSalida = document.getElementById("horaSalida");
    const $btn = document.getElementById("guardar");
    const BASE_URL = "http://localhost:10000/";
    
    const cargarValores = async ()=>{
        const response = await http.get(BASE_URL);
        
      for(let index = 0; index < response.length; index++){
            _createOption(response[index],"idOption");

      }
      _createOptionHora();
      $horaSalida.value = "15:00";
      $horaSalida.innerText="15:00";
      $horaEntrada.addEventListener("change",_actionSelecHora);
      //$form.addEventListener("submit",acitonForm);
      $btn.addEventListener("click",acitonBoton);
    };

    const _createOptionHora = ()=>{
        var $option;
        for(let index = 0; index<horasEntrada.length;index++){
            $option = document.createElement("option")
            $option.value = horasEntrada[index];
            $option.innerText = horasEntrada[index];
            $horaEntrada.appendChild($option);
        }
    }

    const _createOption = (item={},itemId = "")=>{
        const $option = document.createElement("option");
        for(const key in item){
            const value = item["nombreEsp"];
            $option.value = item["idEspecialidad"];
            $option.innerText = value;
            //$option.setAttribute("idEspecialidad",item["idEspecialidad"]);
            $especialidad.appendChild($option);
            console.log(value);
        }

    };

    const _actionSelecHora=(event)=>{
        var entrada;
        var horaEntrada = $horaEntrada.value;
        if(horaEntrada.startsWith('0')){
            entrada = parseInt(horaEntrada.substring(1,2));
        }else{
            entrada = parseInt(horaEntrada.substring(0,2));
        }
        $horaSalida.value = (entrada+8)+":00";
        $horaSalida.innerText = (entrada+8)+":00";
    };

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
        if($nombre.value == "" || $apellidoM.value=="" ||
           $apellidoP.value==""||$cedula.value==""||$correo.value==""){
            modalResultado.iniciarModal("/assets/other/tache.png","Todos los campos son necesarios","");
        }else if(!$correo.value.includes("@")){
            modalResultado.iniciarModal("/assets/other/tache.png","Correo No Valido","");
        }else{
            modalResultado.iniciarModal("/assets/other/realizado.png","Doctor Agregado Correctamente","");
            //$form.submit();
            const data ={
                "url":BASE_URL+'admin/createDoctor',
                "body":{
                      "nombres":$nombre.value,
                      "apellidoP":$apellidoP.value,
                      "apellidoM":$apellidoM.value,
                      "correo":$correo.value,
                      "contrasenia":"",
                      "contraseniaUnhash":"",
                      "idEspecialidad":$especialidad.value,
                      "cedula":$cedula.value,
                      "horaEntrada":$horaEntrada.value,
                      "horaSalida":$horaSalida.value
                      
                      
                    },
              };
              const resultado = await http.post(data);    
              if(resultado["httpCode"]==201){
                  modalResultado.iniciarModal("/assets/other/realizado.png","Su cita se ha registrado correctamente",`/historialcitas/${persona["idPersona"]}`);
              }else{
                  modalResultado.iniciarModal("/assets/other/tache.png","Algo salio mal","");
              }
        }
    };

    const iniciar = ()=>{
        cargarValores();
    };

    return {
        init: () => {
          iniciar();
        },
      }


})();
mainAgregarDoctor.init();