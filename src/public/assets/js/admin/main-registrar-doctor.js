
/**
 * Funcion general para registrar un nuevo doctor
 * se requieren los campos de:
 *  1.- Hora entrada, hora salida
 *  2.- Nombre, apellido paterno y apellido materno
 *  3.- correo
 *  4.-Especialidad a la que pertenece
 *  5.- Cedula profesional
 *  
 */
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
    const BASE_URL = "https://clinicaesp-q.onrender.com/";
    
    /**
     *  Funcion que catrga los varloes de la especialidad y las 
     *  horas en los selectores
     */
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

    /**
     * Funcion que genera las opciones el selector de hora para indicar la hora de entrada
     * esta realicionada directamente con la hora salida la cual siempre estara en un 
     * intervalo de 8 horas generado automaticamente
     */

    const _createOptionHora = ()=>{
        var $option;
        for(let index = 0; index<horasEntrada.length;index++){
            $option = document.createElement("option")
            $option.value = horasEntrada[index];
            $option.innerText = horasEntrada[index];
            $horaEntrada.appendChild($option);
        }
    }

    /**
     * Funcion que genera las opciones para la especialidad
     * @param {*} item especialidad
     * @param {*} itemId -
     */

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

    /**
     * Funcion que se encarga de actualizar la hora de salida
     * cada vez que se cambia la hora de entrada en el selector
     * @param {change} event change sobre el selector
     */

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

    /**
     * Accion para el boton guardar doctor, realiza las validaciones de los campos
     * los cuales deben de esatr debidamente requisitados y crea al doctor 
     * llamando a una ruta del backend en administrador
     * @param {click} event 
     */

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