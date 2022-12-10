/**
 * Funcion principal para vista de registrar cita, ha esta vista solo tiene acceso el usuario
 * 
 */
const main = (() => {
    
    const $selectEsp = document.getElementById("selectEsp");
    const $descripcionEsp = document.getElementById("descripcionEsp");
    const $selectDoctor = document.getElementById("selectDoctor");
    const $selectFecha = document.getElementById("fecha");
    const $selectHora = document.getElementById("selectHora");
    const $guardar = document.getElementById("guardar");
    const BASE_URL ="https://clinicaesp-q.onrender.com/";
    const persona = JSON.parse(OBJpersona);
    var doctor;
    //var responseDoctor;
     //$selectDoctor.selectmenu("disble");

    /**
     * Carga los datos de las especialidades en el selector
     */
    const _getData = async () => {
      const response = await http.get(BASE_URL);
      for(let index = 0; index < response.length; index++){
            _createOption(response[index],"idOption");

      }
      
      $selectFecha.disabled = true;
    };
      /**
       * Funcion que se encarga de cargar en el selector todos los doctores
       * pertenecientes a la especialidad seleccionada
       * @param {int} idEspecialidad 
       */
    const _getDataDoctor = async (idEspecialidad)=>{
      while ($selectDoctor.firstChild) {
        $selectDoctor.removeChild($selectDoctor.lastChild);
      }
      let opcion = document.createElement("option");
      opcion.value = "Doctor";
      opcion.innerText = "Doctor";
      opcion.textContent = "Doctor";
      $selectDoctor.appendChild(opcion);
      const response = await http.get(BASE_URL+`doctor/${idEspecialidad}`);
      for(let index = 0; index < response.length; index++){
          _createOptionDoctor(response[index]);

      }
    };

    /**
     * Funncion auxiliar que permite crear options para el selector
     * @param {*} item 
     */
   const _createOptionDoctor = async (item={})=>{
    const $option = document.createElement("option");
    console.log(item)
    const value = item["idPersona"];
    const response = await http.get(BASE_URL+`persona/${value}`);
    $option.innerText = "Dr. "+response["nombres"]+" "+response["apellidoP"]+" "+response["apellidoM"];
    $option.setAttribute("iddoctor",item["idDoctor"]);
    $selectDoctor.appendChild($option);        


    
      /*
        $option.innerText = value;
        $option.setAttribute("idEspecialidad",item["idEspecialidad"]);
        $selectEsp.appendChild($option);
        console.log(value);
        */
    

};

/**
 * Funcion par el selector de doctor, se encarga de reestablcer las horas que se
 * pueden seleccionar si este selector cambia de valor de doctor
 * @param {change} event 
 */
const _actionSelectDoctor = async (event)=>{
  _restablecerHora();
  
  doctor = $selectDoctor.options[$selectDoctor.selectedIndex].getAttribute("iddoctor");
  const response = await http.get(BASE_URL+"doctor/buscar/"+doctor);
  if($selectFecha.value != ""){
    
    _getCitas(doctor,new Date($selectFecha.value).toISOString().split('T')[0],response["horaEntrada"],response["horaSalida"]);
  }

  console.log("ME IMPRIMI");
  console.log(doctor);
  $selectFecha.disabled = false;
}


    /**
     * Creacion del objeto option para el selector de la especialidad
     * @param {*} item 
     * @param {*} itemId 
     */
    const _createOption = (item={},itemId = "")=>{
        const $option = document.createElement("option");
        for(const key in item){
            const value = item["nombreEsp"];
            $option.innerText = value;
            $option.setAttribute("idEspecialidad",item["idEspecialidad"]);
            $selectEsp.appendChild($option);
            console.log(value);
        }

    };

    /**
     * Funcion adicional del seletor de especialidaad
     * ya que una vez se cambia la especialidad el selector de hora debe de estar completamente vacio
     * @param {*} event 
     */

    const _actionSelectEsp = (event) =>{
      _restablecerHora();
        const $selectEvent = event.target;
        console.log($selectEvent.value);
        var idEsp = $selectEvent.value;
        _getDescription(idEsp);
        $selectFecha.disabled = true;
       // $descripcionEsp.innerText = 
    };
    /**
     * Funcion que vacia el selector de hora en el formulario
     */
    const _restablecerHora = ()=>{
      while ($selectHora.firstChild) {
        $selectHora.removeChild($selectHora.lastChild);
      }
      let opcion2 = document.createElement("option");
      opcion2.value = "Hora";
      opcion2.innerText = "Hora";
      opcion2.textContent = "Hora";
      $selectHora.appendChild(opcion2);

    };

    /**
     * Funcion adicional al selector de la fucha, pues si la fecha es cambiada, se deben de vaciar las horas quese 
     * tengagn disponibles, esto se hace evitar conflictos
     * @param {*} event 
     */
    const _actionSelectFecha = async (event)=>{
      _restablecerHora();  
       const response = await http.get(BASE_URL+"doctor/buscar/"+doctor);
        console.log($selectFecha.value);
        _getCitas(doctor,new Date($selectFecha.value).toISOString().split('T')[0],response["horaEntrada"],response["horaSalida"]);
        console.log(new Date($selectFecha.value).toISOString().split('T')[0]);
        console.log(new Date().getHours())
    }
    /**
     * Se encarga de carga r las descripcion del al especialidad cada vez que el valor del selector cambia
     * @param {*} nombreEsp 
     */
    const _getDescription = async (nombreEsp)=>{
        const response = await http.get(BASE_URL);
        var selidEsp;
        for(let index = 0; index < response.length; index++){
            var item = response[index];
            console.log(item);
            for(const key in item){
                if(nombreEsp == item["nombreEsp"]){
                    $descripcionEsp.innerText = item["descripcion"];
                    selidEsp = parseInt(item["idEspecialidad"]);
                    console.log(selidEsp);
                    _getDataDoctor(selidEsp);
                    
                    break;

                }
                
            }

      }

    }
    /**
     * Funcion que se encargade carga de generar la citas que se tengan 
     * disponibles, se requiere que las citas que ya han sido agendadas
     * 
     * @param {*} idDoctor 
     * @param {*} fecha 
     * @param {*} horaEntrada 
     * @param {*} horaSalida 
     */
    const _getCitas = async (idDoctor,fecha,horaEntrada,horaSalida)=>{
        const response = await http.get(BASE_URL+`citas/${idDoctor}/${fecha}`);
        console.log(response);
        const arregloHoras = _generarArrgeloComparacion(horaEntrada,horaSalida);
        console.log(arregloHoras);
        if(response.length > 0){
        for(let index = 0; index < response.length; index++){
            for(let i  = 0; i<arregloHoras.length;i++){
              console.log(response[index]["estado"]);
              if(response[index]["estado"] != "cancelada" && response[index]["estado"] != "eliminada"){
                if(response[index]["hora"]==arregloHoras[i]){
                  
                    arregloHoras[i] = -1;
                }
              }
            }
        }


      }
      var contadorHuecos=0;
      for(let i  = 0; i<arregloHoras.length;i++){
          if(arregloHoras[i] == -1){
            contadorHuecos++;
          }
      }
      if(contadorHuecos == arregloHoras.length){
        modalResultado.iniciarModal("/assets/other/tache.png","No se tienen citas disponibles",``);
        _restablecerHora();
        $selectFecha.value = "";
      }
      _agregarHoras(arregloHoras);
    };

    /**
     * Funcion que se encarga de añadir opciones al selector de la hora
     * @param {*} citasDisponibles 
     */
    const _agregarHoras = (citasDisponibles = [])=>{
      for(let index = 0; index<citasDisponibles.length;index++){
        const $option = document.createElement("option");
        if(citasDisponibles[index] != - 1){
          $option.innerText = citasDisponibles[index];
          $selectHora.appendChild($option);
          
        }
      }
    };
    /**
     * Funcion encargada de almacenar la cita en la base de datos por lo que es necesario muchas validadciones
     * antes de permitri que se ingrese algun valor erroneo
     * @param {*} event 
     */
    const _actionRegistrar = async (event) => {
      if($selectDoctor.value != "Doctor" && $selectFecha.value != "" && 
      $selectHora != "Hora" && $selectHora != "Elige una hora" && document.getElementById("motivo").value != ""){
          var citasPersona = await http.get(BASE_URL+`citas/${persona["idPersona"]}`);
          if(validaciones.validacionesFechayHoraPersona(citasPersona,new Date($selectFecha.value).toISOString().split("T")[0],$selectHora.value)){
            if(validaciones.validacionDoctor(doctor,citasPersona)){
              console.log("llegue");
              const data ={
                               "url":BASE_URL+'citas/registrar',
                               "body":{
                                     "estado":"agendada",
                                     "fecha":new Date($selectFecha.value).toISOString().split('T')[0],
                                     "hora":$selectHora.value,
                                     "motivo":document.getElementById("motivo").value,
                                     "idDoctor":parseInt(doctor),
                                     "idPersona":persona["idPersona"],
                                     
                                   },
                             };
              console.log(data);
              
              const resultado = await http.post(data);    
              if(resultado["httpCode"]==201){
                  modalResultado.iniciarModal("/assets/other/realizado.png","Su cita se ha registrado correctamente",`/informacion/${persona["idPersona"]}`);
              }else{
                modalResultado.iniciarModal("/assets/other/tache.png","Algo salio mal","");
              }                

            }else{
              //alert("ya tienes una cita agendada con el doctor");
              modalResultado.iniciarModal("/assets/other/tache.png","Ya tienes una cita agendada con este doctor",`/informacion/${persona["idPersona"]}`);
            }
              
          }else{
            //alert("ya tienes una cita para ese dia y hora");
            modalResultado.iniciarModal("/assets/other/tache.png","Ya tienes una cita programada ese dia y a esa hora",`/informacion/${persona["idPersona"]}`);
          }
                     
      }else{
        $selectEsp.value = "Elije una especialidad";
        $descripcionEsp.textContent = "Descripcion de la especialidad";
        var opciones = document.createElement("option");
        while ($selectDoctor.firstChild) {
          $selectDoctor.removeChild($selectDoctor.lastChild);
        }
        opciones.innerText="Doctor";
        $selectDoctor.appendChild(opciones);
        while ($selectHora.firstChild) {
          $selectHora.removeChild($selectHora.lastChild);
        }
      opciones.innerText="Hora";
      $selectHora.appendChild(opciones); 
      fecha.value = "";
      modalResultado.iniciarModal("/assets/other/tache.png","Hay campos vacios","");


          //const $selectDoctor = document.getElementById("selectDoctor");
    //const $selectFecha = document.getElementById("fecha");
    //const $selectHora = document.getElementById("selectHora");


      }

    };
  
     const _initElements = () => {
      _getData();
      //console.log(persona["idPersona"]);
      
     };

     /**
      * Funcion encargada de generar un arreglo con las horas que tiene el doctor disponibles
      */
    const _generarArrgeloComparacion = (horaEntrada,horaSalida)=>{
      var entrada;
      var salida;
      if(horaEntrada.startsWith('0')){
          entrada = parseInt(horaEntrada.substring(1,2));
      }else{
          entrada = parseInt(horaEntrada.substring(0,2));
      }  
      
      if(horaSalida.startsWith('0')){
        salida = parseInt(horaSalida.substring(1,2));
      }else{
        salida = parseInt(horaSalida.substring(0,2));
      } 

      console.log(entrada);
      console.log(salida);

      console.log("===A===");
      console.log(new Date($selectFecha.value).toISOString().split('T')[0]);
      console.log(validaciones.fechaFormatoCorrecto());
      console.log(entrada+" "+parseInt(new Date().getHours()));
      console.log(salida+" "+ parseInt(new Date().getHours()));
      if(new Date($selectFecha.value).toISOString().split('T')[0] == validaciones.fechaFormatoCorrecto() && entrada < parseInt(new Date().getHours()) ){
        if(salida > (parseInt(new Date().getHours())-1)){
          entrada = new Date().getHours() +1;
        }else{
          modalResultado.iniciarModal("/assets/other/tache.png","No se tienen citas disponibles",``);
        _restablecerHora();
        $selectFecha.value = "";
        return;
        }  
        //entrada = new Date().getHours() +1;
      }
      console.log(entrada);
      console.log(salida);
      var arreglo = [10];
      var i = 0;
      for(let index = entrada; index<salida; index++){
       if(index < 10){
          arreglo[i] = "0"+ index+":00";
          i++;
        }else{
          arreglo[i] = index+":00";
          i++;
        }
      }
      if(entrada == salida){
        return [];
      }
      if(arreglo[0]==10){
        return [];
      }
      return arreglo;


    };
  
    return {
      init: () => {
        $selectEsp.addEventListener('change',_actionSelectEsp);
        $selectDoctor.addEventListener('change',_actionSelectDoctor);
        $selectFecha.addEventListener('change',_actionSelectFecha);
        $guardar.addEventListener('click',_actionRegistrar);
        _initElements();
        
      },
    };
  })();
  
  main.init();



  /**
   * En este apartado se generan los distintos datos que se tienen acerca del la persona, 
   * las citas, estas validaciones sontulizadas antes de permitir insertar un registro 
   * en la base de datos 
   */
  const validaciones = (() => {
    /**
     * Validadion que la persona tiene la hora del dia disponible para una cita
     * @param {*} citas 
     * @param {*} fecha 
     * @param {*} hora 
     * @returns 
     */
    const validacionesFechayHoraPersona = (citas = [], fecha,hora)=>{
        var citaArreglo;
          for(var i = 0; i<citas.length;i++){
              citaArreglo = citas[i];  
            if(citaArreglo["fecha"] == fecha ){
                if(citaArreglo["hora"] == hora){
                    if(citaArreglo["estado"]!= "eliminada" && citaArreglo["estado"]!="cancelada"){
                      return false;
                    }
                }
              }
          }
          return true;
      };

      /**
       * Validacion de que no se tenga una cita ya agendada con ese doctor
       * @param {*} idDoctor 
       * @param {*} citas 
       * @returns 
       */
      const validacionDoctor = (idDoctor,citas = []) =>{
        var citaArreglo;
          for(var i = 0; i<citas.length;i++){
              var citaArreglo = citas[i];
              if(citaArreglo["idDoctor"] == idDoctor && (citaArreglo["estado"] == "agendada" || citaArreglo["estado"] == "confirmada")){
                  return false;
              }

          }
          return true;  
      };
      const fechaFormatoCorrecto = ()=>{
        var yourDate = new Date();
        const offset = yourDate.getTimezoneOffset();
        yourDate = new Date(yourDate.getTime() - (offset*60*1000));
        return yourDate.toISOString().split('T')[0];
      }
      return {validacionDoctor,validacionesFechayHoraPersona,fechaFormatoCorrecto}
   })();


   