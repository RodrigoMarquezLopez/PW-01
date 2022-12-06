const mainHistorialPaciente = (() => {
    const $cuerpoTabla = document.getElementById("tablabody");
    var $NombrePaciente = document.getElementById("nombre-paciente");
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const hoy = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; 

    const fechaActualCorrecta = anioActual+"-"+mesActual+"-"+hoy;
    var numeroDeRows = 0;
    var persona = null;
    //var cita;
    const BASE_URL = "https://clinicaesp-d.onrender.com/";
    const doctor = JSON.parse(OBJdoctor);
    console.log(doctor["idDoctor"] );
     //$selectDoctor.selectmenu("disble");
    const $btnBuscarPaciente = document.getElementById("buscar-paciente")

     const _GenerarAgenda = async () => {
        $btnBuscarPaciente.addEventListener("click", _actionFuntion);
      };

      const _actionFuntion = async () => {
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
        }else{
            modalResultado.iniciarModal("/assets/other/tache.png","Ingresa un nombre recuerda es el nombre completo",``);
        }
        setTimeout(()=>{
            console.log(numeroDeRows);
         if(numeroDeRows == 0){
            modalResultado.iniciarModal("/assets/other/tache.png","Paciente sin historial",``);
         }
          },3000);
      };

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

            const $btn = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn.textContent = "Receta";
            $btn.className = "waves-effect blue darken-1 btn";
            $btn.value = JSON.stringify({item,response2,response3});
            $btn.addEventListener("click",_actionButtonHistoral);
            
            
            
            $td.innerText = item["fecha"].toString().split('T')[0];
            $td2.innerText = item["hora"];
            $td3.innerText = item["motivo"];
            $td4.appendChild($btn);
            
            $row2.appendChild($td);
            $row2.appendChild($td2);
            $row2.appendChild($td3);
            $row2.appendChild($td4);
          return $row2;
          
        }
      };

      const _actionButtonHistoral = async (event) => {
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


      const _initElements = () => {
        _GenerarAgenda();
      };
    
      return {
        init: () => {
          _initElements();
        },
      }
     

  })();
  
  mainHistorialPaciente.init();