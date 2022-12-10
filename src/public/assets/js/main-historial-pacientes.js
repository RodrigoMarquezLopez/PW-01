const generarFecha = (()=>{
  const fechaFormatoCorrecto = ()=>{
    var yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - (offset*60*1000));
    return yourDate.toISOString().split('T')[0];
  }
  return {fechaFormatoCorrecto}

})();

/**
 * Funcion que añade la funcionalidad a la vista historial del doctor, esta vista
 * presenta todas las citas que el doctor a realizado, y ademas permite ver las recetas
 * que se han generado a partir de cada cita, esta muestra un filtrado por nombre del 
 * paciente
 */

const mainHistorialPaciente = (() => {
    const $cuerpoTabla = document.getElementById("tablabody");
    var $NombrePaciente = document.getElementById("nombre-paciente");
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const hoy = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; 
    var $modalDoctor = document.getElementById("modal-doctor");
        var $modalFecha = document.getElementById("modal-fecha");
        var $modalHora = document.getElementById("modal-hora");
        var $modalEspecialidad= document.getElementById("modal-especialidad");
        var $modalPaciente= document.getElementById("modal-paciente");
        var $modalMotivo = document.getElementById("modal-motivo");
        var $modalDiagnostico = document.getElementById("modal-diagnostico");
        var $modalIndicaciones = document.getElementById("modal-indicaciones"); 
        var $modalEdad = document.getElementById("modal-edad");
        var $modalPeso = document.getElementById("modal-peso");
        var $modalAltura = document.getElementById("modal-altura");
        var $modalCedula = document.getElementById("modal-cedula");
    const fechaActualCorrecta = anioActual+"-"+mesActual+"-"+hoy;
    var numeroDeRows = 0;
    var persona = null;
    //var cita;
    const BASE_URL = "https://clinicaesp-q.onrender.com/";
    const doctor = JSON.parse(OBJdoctor);
    var especialidadDoctor;
    console.log(doctor["idDoctor"] );
     //$selectDoctor.selectmenu("disble");
    const $btnBuscarPaciente = document.getElementById("buscar-paciente")
//<button type="button" class="waves-effect blue darken-1 btn" id="restablecer">Restablecer</button>
    const $btnRestablecer = document.getElementById("restablecer");
    //Bara de carga
    const $divContenedor = document.getElementById("bProgreso");
    var barra = document.createElement("div");
        barra.className = "progress blue darken-1";
    var barraInterna = document.createElement("div");
        barraInterna.className = "indeterminate";
        barra.appendChild(barraInterna);

        /**
         * Esta funcion se encarga de cargar toda los registros en la tabla, 
         * sin aplicar ningun fitrado
         */

     const _GenerarAgenda = async () => {
        $btnRestablecer.disabled = true;
        $divContenedor.appendChild(barra);

        const response = await http.get(BASE_URL+"doctor/agenda/citas");
        console.log(response);
        for(let index = 0; index < response.length; index++){
             _createHistorial(response[index]);
            }
         especialidadDoctor = await http.get(BASE_URL+`especialidad/${doctor["idEspecialidad"]}`);
        $btnBuscarPaciente.addEventListener("click", _actionFuntion);
        $divContenedor.removeChild($divContenedor.lastChild);
      };

      /**
       * Funcion del boton reestablcer que reinicia la tabla, sin tener en cuenta 
       * el filtrado realizado 
       * @param {click} event 
       */
      const _actionRestablecer = (event)=>{
        event.target.disabled = true;
        if($cuerpoTabla.childNodes.length>0){
          var contador = $cuerpoTabla.childNodes.length;
          numeroDeRows = 0;
          for(i=0; i<contador;i++){
            $cuerpoTabla.removeChild($cuerpoTabla.childNodes[0]);
          }
        }
          _GenerarAgenda();
      }
      
      /**
       * Funcionalidad para la accion del boton para la ejecucion del filtrado
       */
      const _actionFuntion = async () => {
        $divContenedor.appendChild(barra);
        $btnRestablecer.disabled = false;
        console.log("funciono xd")
        if($cuerpoTabla.childNodes.length>0){
          var contador = $cuerpoTabla.childNodes.length;
          numeroDeRows = 0;
          for(i=0; i<contador;i++){
            $cuerpoTabla.removeChild($cuerpoTabla.childNodes[0]);
          }
        }
        if($NombrePaciente.value != ""){
        const response = await http.get(BASE_URL+"doctor/agenda/citas");
        console.log(response);
        for(let index = 0; index < response.length; index++){
             _createRow(response[index]);
           
        }
        $divContenedor.removeChild($divContenedor.lastChild);
        }else{
            modalResultado.iniciarModal("/assets/other/tache.png","Ingresa un nombre recuerda es el nombre completo",``);
        }
        //$divContenedor.removeChild($divContenedor.lastChild);
        setTimeout(()=>{
            console.log(numeroDeRows);
         if(numeroDeRows == 0){
            modalResultado.iniciarModal("/assets/other/tache.png","Paciente sin historial",``);
         }
          },30000);
      };

        /**
         * Funcion que se encarga del llenado de la tabla de acuerdo a los valores ingresados en el nombre 
         * del paciente a buscar
         * @param {citas} item 
         * @returns 
         */
      const _createRow = async (item = {}) =>{
        const response2 = await http.get(BASE_URL+`doctor/buscar/${item["idDoctor"]}`);
        const response4 = await http.get(BASE_URL+`persona/${item["idPersona"]}`);
        const response3 = await http.get(BASE_URL+`persona/${response2["idPersona"]}`);
        if(item["idDoctor"]==doctor["idDoctor"] && (response4["nombres"]+" "+response4["apellidoP"]+" "+response4["apellidoM"])==$NombrePaciente.value &&item["estado"]=="finalizada"){
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);
            numeroDeRows++;
            persona = response4;
            const $td = document.createElement("td");
            const $td2 = document.createElement("td");
            const $td3 = document.createElement("td");
            const $td4 = document.createElement("td");
            const $td5 = document.createElement("td");

            const $btn = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn.textContent = "Receta";
            $btn.className = "waves-effect blue darken-1 btn";
            $btn.value = JSON.stringify({item,response2,response3,persona});
            $btn.addEventListener("click",_actionButtonHistoral);
            
            
            
            $td.innerText = item["fecha"].toString().split('T')[0];
            $td2.innerText = item["hora"];
            $td3.innerText = response4["nombres"]+" "+response4["apellidoP"]+" "+response4["apellidoM"];
            $td4.innerText = item["motivo"];
            $td5.appendChild($btn);
            
            $row2.appendChild($td);
            $row2.appendChild($td2);
            $row2.appendChild($td3);
            $row2.appendChild($td4);
            $row2.appendChild($td5);
          return $row2;
          
        }
      };

      /**
       * Funcionq que carga todos los datos a la tabla ignorando el filtrado
       * @param {*} item 
       * @returns 
       */
      const _createHistorial = async (item = {}) =>{
        const response2 = await http.get(BASE_URL+`doctor/buscar/${item["idDoctor"]}`);
        const response4 = await http.get(BASE_URL+`persona/${item["idPersona"]}`);
        const response3 = await http.get(BASE_URL+`persona/${response2["idPersona"]}`);
        if(item["idDoctor"]==doctor["idDoctor"]&&item["estado"]=="finalizada"){
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);
            numeroDeRows++;
            persona = response4;
            const $td = document.createElement("td");
            const $td2 = document.createElement("td");
            const $td3 = document.createElement("td");
            const $td4 = document.createElement("td");
            const $td5 = document.createElement("td");

            const $btn = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn.textContent = "Receta";
            $btn.className = "waves-effect blue darken-1 btn";
            $btn.value = JSON.stringify({item,response2,response3,persona});
            $btn.addEventListener("click",_actionButtonHistoral);
            
            
            
            $td.innerText = item["fecha"].toString().split('T')[0];
            $td2.innerText = item["hora"];
            $td3.innerText = response4["nombres"]+" "+response4["apellidoP"]+" "+response4["apellidoM"];
            $td4.innerText = item["motivo"];
            $td5.appendChild($btn);
            
            $row2.appendChild($td);
            $row2.appendChild($td2);
            $row2.appendChild($td3);
            $row2.appendChild($td4);
            $row2.appendChild($td5);
          return $row2;
          
        }
      };

      /**
       * Funcion que se encarga de cargar los datos de la receta de la cita seleccionada, ademas de abrir el modal 
       * correspondiente a la receta
       * @param {*} event 
       */

      const _actionButtonHistoral = async (event) => {
        
        //const $btnPDF = document.getElementById("btnPdf");
    
            var especialidades = await http.get(BASE_URL);
            console.log(event.target);
            const citaSeleccionada = JSON.parse(event.target.value);
            console.log(citaSeleccionada["item"]["fecha"]);
            console.log(BASE_URL+`doctor/receta/${citaSeleccionada["item"]["idCita"]}`);
            const receta = await http.get(BASE_URL+`doctor/receta/${citaSeleccionada["item"]["idCita"]}`);
            console.log(receta);
            var elems = document.getElementById("modal1");
            var instance = M.Modal.getInstance(elems);
            $modalFecha.innerText = citaSeleccionada["item"]["fecha"].toString().split('T')[0];
            $modalDoctor.innerText = "Dr. "+citaSeleccionada["response3"]["nombres"]+" "+citaSeleccionada["response3"]["apellidoP"]+" "+citaSeleccionada["response3"]["apellidoM"];
            $modalCedula.innerText = citaSeleccionada["response2"]["cedula"];
            $modalHora.innerText = citaSeleccionada["item"]["hora"];
           // $modalFecha.value = citaSeleccionada["item"]["fecha"].toString().split('T')[0];
            //$modalDoctor.value = "Dr. "+citaSeleccionada["response3"]["nombres"]+" "+citaSeleccionada["response3"]["apellidoP"]+" "+citaSeleccionada["response3"]["apellidoM"];
            //$modalHora.value = citaSeleccionada["item"]["hora"];
           // var especialidadDoctor = citaSeleccionada["response2"]["idEspecialidad"]
            $modalEspecialidad.innerText = especialidadDoctor["nombreEsp"];
            console.log(receta);
           $modalPaciente.innerText = citaSeleccionada["persona"]["nombres"] + " "+citaSeleccionada["persona"]["apellidoP"]+" "+citaSeleccionada["persona"]["apellidoM"];
            //$modalPaciente.value = persona["nombres"] + " "+persona["apellidoP"]+" "+persona["apellidoM"];
          $modalMotivo.innerText = citaSeleccionada["item"]["motivo"];
            //$modalMotivo.value= citaSeleccionada["item"]["motivo"];
            
            $modalDiagnostico.value = receta["diagnostico"];
            $modalIndicaciones.value = receta["indicaciones"]; 
            $modalDiagnostico.innerText=receta["diagnostico"];
            $modalIndicaciones.innerText=receta["indicaciones"];
            $modalAltura.value = receta["altura"];
            $modalEdad.value = receta["edad"];
            $modalPeso.value = receta["peso"];
            $modalAltura.innerText = receta["altura"];
            $modalEdad.innerText = receta["edad"];
            $modalPeso.innerText = receta["peso"];
            //$btnPDF.disabled = true;          
    
            instance.open();
      }


      const _initElements = () => {
        _GenerarAgenda();
       $btnRestablecer.addEventListener("click",_actionRestablecer);
      };
    
      return {
        init: () => {
          _initElements();
        },
      }
     

  })();
  
  mainHistorialPaciente.init();