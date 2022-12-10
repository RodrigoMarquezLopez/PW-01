
/**
 * Funcion principal de la vista historial a lacual tienen acceso el paciente
 * en este caso la tabla contara ocn la fecha y el nombre del doctor con el que se agendo
 * la cita
 */
const mainHistorial = (() => {
    const $cuerpoTabla = document.getElementById("cuerpotabla");
    var cita;
    const BASE_URL = "https://clinicaesp-q.onrender.com/";
    const persona = JSON.parse(OBJpersona);
    var numeroDeRows = 0;

    //Obteniendo los elementos pertenecientes al modal

    
        
    //var instance = M.Modal.getInstance(elem);
    
    //const instancia = M.Modal.init($modalReceta);
     //$selectDoctor.selectmenu("disble");
    /**
     * Se encarga de cargar la informacion de la vista 
     * se apoya de lafuncion craterow para las creacion de als filas
     */

     const _getData = async () => {
      console.log($cuerpoTabla);
        const response = await http.get(BASE_URL+"citas");
        
        console.log(response.length);
        var $row;
        numeroDeRows = 0;
        for(let index = 0; index < response.length; index++){
               _createRow(response[index]);
               console.log(numeroDeRows);
              
             
           
        }
        
       
       console.log(numeroDeRows);
      };
      
  
      /**
       * Funcion para cargar las filas en la tabla del historial, esta funcion recibe las citas
       * y las filtra de acuerdo al id de la persona y el estado este finalizado 
       * @param {*} item 
       * @returns 
       */

      const _createRow = async (item = {}) =>{
        const value = item["idPersona"];
        const response2 = await http.get(BASE_URL+`doctor/buscar/${item["idDoctor"]}`);
        const response3 = await http.get(BASE_URL+`persona/${response2["idPersona"]}`);
        
        //if(value==17){
          if(value==persona["idPersona"] && item["estado"]=="finalizada"){
        //const $row2 = document.getElementById("datos");
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);
        numeroDeRows++;
        console.log(numeroDeRows);
            const $td = document.createElement("td");
            const $td2 = document.createElement("td");
            const $td3 = document.createElement("td");
            const $td4 = document.createElement("td");
            const $btn = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn.textContent = "Ver Información";
            $btn.className = "waves-effect blue darken-1 btn";
            $btn.value = JSON.stringify({item,response2,response3})
            //Nueva funcionalidad para el boton
            //$btn.location.href="#modal1";
            $btn.addEventListener("click", _actionButton);
            $td.innerText = item["fecha"].toString().split('T')[0];
            $td2.innerText = item["hora"];
            $td3.innerText = "Dr. "+response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"];
            $td4.appendChild($btn);
            //$td.setAttribute("fecha",item["fecha"]);
            //$td2.setAttribute("hora",item["hora"]);
           // $td3.setAttribute("doctor", "Dr. "+response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"];);
            $row2.appendChild($td);
            $row2.appendChild($td2);
            $row2.appendChild($td3);
            $row2.appendChild($td4);
          return $row2;
          
        }
      };

      /**
       * Accion del boton encargado de abrir el modal con la informaicon de al 
       * receta de las citas encontradas en la tabla historial
       * esta funcion toma todos los itmes del ejs y les asigna los valores de acuerdo a la cita que se 
       * solicitando
       * @param {*} event 
       */

      const _actionButton = async (event)=>{
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
    //const $btnPDF = document.getElementById("btnPdf");

        var especialidades = await http.get(BASE_URL);
        console.log(event.target);
        var citaSeleccionada = JSON.parse(event.target.value);
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
        var especialidadDoctor = citaSeleccionada["response2"]["idEspecialidad"]
        for(var i = 0; i < especialidades.length; i++){
            if(especialidadDoctor == especialidades[i]["idEspecialidad"]){
              $modalEspecialidad.innerText = especialidades[i]["nombreEsp"];
              //$modalEspecialidad.value = especialidades[i]["nombreEsp"];
              break;
            }
        }

        
        console.log(receta);
       $modalPaciente.innerText = persona["nombres"] + " "+persona["apellidoP"]+" "+persona["apellidoM"];
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

      const _initElements = async () => {
        
        _getData()
        setTimeout(()=>{
          console.log(numeroDeRows);
       if(numeroDeRows == 0){
          const $divTabla = document.getElementById("divTabla");
          while($divTabla.firstChild){
              $divTabla.removeChild($divTabla.lastChild);
          }
          const $letrero = document.createElement("h4");
          $letrero.innerText = "No has tenido ninguna cita aun, agenda una"
          $divTabla.appendChild($letrero);
       }
        },10000);
        
        
      };
    
      return {
        init: () => {
          _initElements();
        },
      }
     

  })();
  
  mainHistorial.init();