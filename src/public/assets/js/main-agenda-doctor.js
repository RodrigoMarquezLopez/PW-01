const generarFecha = (()=>{
  const fechaFormatoCorrecto = ()=>{
    var yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - (offset*60*1000));
    return yourDate.toISOString().split('T')[0];
  }
  return {fechaFormatoCorrecto}

})();


const mainDocAgenda = (() => {
    const $cuerpoTabla = document.getElementById("tablabody");
    var $fechaBusqueda = document.getElementById("fecha-agenda");
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const hoy = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; 

    const fechaActualCorrecta = generarFecha.fechaFormatoCorrecto();//new Date().toString().split('T')[0];//anioActual+"-"+mesActual+"-"+hoy;
   
        //const $cuerpoTabla = document.getElementById("tablabody");
        var $fechaBusqueda = document.getElementById("fecha-agenda");
        var botonReceta = null;
        var terminar = null;
        var $formDoctor;
        var $fromFecha;
        var $fromHora;
        var $fromEspecialidad;
        var $formPaciente;
        var $formMotivo;
        var $formDiagnostico;
        var $formIndicaciones;
        var $formCedula;
        var $formAltura;
        var $formPeso;
        var $formEdad;

    //const fechaActual = new Date().toISOString().toString().split('T')[0];
    console.log(fechaActual);
    var identificadorPersona = null;
    //var cita;
    const BASE_URL = "https://clinicaesp-q.onrender.com/";
    const doctor = JSON.parse(OBJdoctor);
    var doctorPersona;
    var especialidadDoc;
    console.log(doctor);
    const $btnAgendaCita = document.getElementById("buscar-agenda")
    $fechaBusqueda.value=fechaActualCorrecta;

     const _GenerarAgenda = async () => {
        especialidadDoc = await http.get(BASE_URL+`especialidad/${doctor["idEspecialidad"]}`);
        doctorPersona = await http.get(BASE_URL+`persona/${doctor["idPersona"]}`);
        $formDoctor = document.getElementById("form-doctor");
        $fromFecha = document.getElementById("form-fecha");
        $fromHora = document.getElementById("form-hora");
        $fromEspecialidad= document.getElementById("form-especialidad");
        $formPaciente= document.getElementById("form-paciente");
        $formMotivo = document.getElementById("form-motivo");
        $formDiagnostico = document.getElementById("form-diagnostico");
        $formIndicaciones = document.getElementById("form-indicaciones"); 
        $formCedula = document.getElementById("form-cedula");
        $formEdad= document.getElementById("form-edad");
        $formAltura= document.getElementById("form-altura");
        $formPeso = document.getElementById("form-peso");
        $btnAgendaCita.addEventListener("click", _actionFuntion);

      };

      const _actionFuntion = async () => {
        console.log("funciono xd")
        if($cuerpoTabla.childNodes.length>0){
          var contador = $cuerpoTabla.childNodes.length;
          for(i=0; i<contador;i++){
            $cuerpoTabla.removeChild($cuerpoTabla.childNodes[0]);
          }
        }
        if($fechaBusqueda.value != ""){
        const response = await http.get(BASE_URL+"doctor/agenda/citas");
        for(let index = 0; index < response.length; index++){
             _createRow(response[index]);
           
        }
        }else{
          alert("No ha seleccionado una fecha");
          
        }
      };

      const _createRow = async (item = {}) =>{
        console.log(item);
        const response3 = await http.get(BASE_URL+`persona/${item["idPersona"]}`);
        if(item["idDoctor"]==doctor["idDoctor"] && (item["fecha"].toString().split('T')[0])==$fechaBusqueda.value){
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);


            const $td = document.createElement("td");
            const $td2 = document.createElement("td");
            const $td3 = document.createElement("td");
            const $td4 = document.createElement("td");

            const $btn = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn.textContent = "Historial";
            $btn.className = "waves-effect blue darken-1 btn";
            const $btn2 = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn2.textContent = "Receta";
            $btn2.className = "waves-effect blue darken-1 btn";
            const $btn3 = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn3.textContent = "Terminar";
            $btn3.className = "waves-effect blue darken-1 btn";
            $btn3.disabled = true;
            
            if(fechaActualCorrecta != (item["fecha"].toString().split('T')[0])||item["estado"]==="terminada"){

              $btn.disabled=true;
              $btn2.disabled=true;
              $btn3.disabled=true;
            }
            const comprobarReceta = await http.get(BASE_URL+`doctor/receta/${item["idCita"]}`);
              if(comprobarReceta != null){
              $btn.disabled=true;
              $btn2.disabled=true;
              $btn3.disabled=true;
              }


            console.log(response3["idPersona"]);
            $btn.value = response3["idPersona"];
            $btn.addEventListener("click",_actionButtonHistoral);
            $btn2.value = JSON.stringify({item,response3,$btn3});
            $btn2.id = response3["idPersona"];
            $btn3.id = "terminar"+response3["idPersona"];
            $btn3.value = item["idCita"];

            console.log("terminar"+response3["idPersona"]);

            $btn2.addEventListener("click",_actionButtonReceta);


            $btn3.addEventListener("click",_actionButtonTerminar);  

            $td.innerText = item["hora"];
            $td2.innerText = response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"];
            $td3.innerText = item["motivo"];
            $td4.appendChild($btn);
            $td4.appendChild($btn2);
            $td4.appendChild($btn3);

            $row2.appendChild($td);
            $row2.appendChild($td2);
            $row2.appendChild($td3);
            $row2.appendChild($td4);
          return $row2;
          
        }
      };

      const _actionButtonHistoral = async (event) => {
        const $tabla = document.getElementById("cuerpotabla");
        while ($tabla.firstChild) {
          $tabla.removeChild($tabla.lastChild);
          console.log("entree");
        }
          identificadorPersona = event.target.value;
          console.log(identificadorPersona);
          mainHistorialModal.init(identificadorPersona);
          var elems = document.getElementById("modal2");
          var instance = M.Modal.getInstance(elems);
          instance.open();
      }

      const _actionButtonReceta = async (event) => {
          if(botonReceta != null){
            if(botonReceta != event.target){
                terminar.disabled = true;
            }  
            
          }
          botonReceta = event.target;
          identificadorPersona = JSON.parse(event.target.value);
          console.log(identificadorPersona);
          console.log(doctorPersona);
          

          $formDiagnostico.value = "";
          $formIndicaciones.value = "";
          $formDoctor.value = "Dr: "+doctorPersona["nombres"]+" "+doctorPersona["apellidoP"]+" "+doctorPersona["apellidoM"];
          $fromEspecialidad.value = especialidadDoc["nombreEsp"]
          $formMotivo.value = identificadorPersona["item"]["motivo"];
          $fromFecha.value = identificadorPersona["item"]["fecha"].toString().split('T')[0];
          $fromHora.value = identificadorPersona["item"]["hora"];
          $formPaciente.value = identificadorPersona["response3"]["nombres"]+" "+identificadorPersona["response3"]["apellidoP"]+" "+identificadorPersona["response3"]["apellidoM"]
          $formCedula.value = doctor["cedula"]
          //var elems = document.getElementById("modal3");
          //var instance = M.Modal.getInstance(elems);
          terminar = document.getElementById("terminar"+event.target.id); 
          //instance.open();
          mainModalReceta.iniciarModal(doctor);
          const $termianr = document.getElementById("terminar"+event.target.id); 
          console.log("terminar"+event.target.id);
          $termianr.disabled = false
          
           






      };

      const _actionButtonTerminar=async (event)=>{
          if($formDiagnostico.value != "" && $formIndicaciones.value != ""){
            const data ={
              "url":BASE_URL+'doctor/receta/crear',
              "body":{
                    "idCita":event.target.value,
                    "diagnostico":$formDiagnostico.value,
                    "indicaciones":$formIndicaciones.value,
                    "edad":$formEdad.value,
                    "peso":$formPeso.value,
                    "altura":$formAltura.value,
                    },
            };
            const resultado = await http.post(data);
            if(resultado["httpCode"]==201){
              botonReceta.disabled = true;
              event.target.disabled = true;
              modalResultado.iniciarModal("/assets/other/realizado.png","Su cita se ha registrado correctamente",``);
          }else{
            modalResultado.iniciarModal("/assets/other/tache.png","Algo salio mal","");
          } 
            /*
            console.log(event.target.value);
            const datos = {
              "url":BASE_URL+`doctor/cita/${event.target.value}`,
              "body":{
                  "estado":"finalizada"
              },
            };
            await http.put(datos);
            */
            
          }

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
  
  mainDocAgenda.init();
























  const mainHistorialModal = (() => {
    const $cuerpoTabla = document.getElementById("cuerpotabla");
    var cita;
    const BASE_URL = "https://clinicaesp-q.onrender.com/";
    //const persona = JSON.parse(OBJpersona);
     var persona;     
      var numeroDeRows = 0;
    //Obteniendo los elementos pertenecientes al modal

    
        
    //var instance = M.Modal.getInstance(elem);
    
    //const instancia = M.Modal.init($modalReceta);
     //$selectDoctor.selectmenu("disble");


     const _getData = async (idP) => {
      persona = await http.get(BASE_URL+`persona/${idP}`);
        const response = await http.get(BASE_URL+"citas");
        console.log("Soy longitud response"+response.length);
        numeroDeRows = 0;
        for(let index = 0; index < response.length; index++){
             _createRow(response[index]);
             console.log($cuerpoTabla.childNodes);
           
        }
        
        
        
      };

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

      const _actionButton = async (event)=>{
        const $modalDoctor = document.getElementById("modal-doctor");
        const $modalFecha = document.getElementById("modal-fecha");
        const $modalHora = document.getElementById("modal-hora");
        const $modalEspecialidad= document.getElementById("modal-especialidad");
        const $modalPaciente= document.getElementById("modal-paciente");
        const $modalMotivo = document.getElementById("modal-motivo");
        var $modalDiagnostico = document.getElementById("modal-diagnostico");
        var $modalIndicaciones = document.getElementById("modal-indicaciones");
        var $modalCedula = document.getElementById("modal-cedula");
        var $modalAltura = document.getElementById("modal-altura");
        var $modalPeso = document.getElementById("modal-peso");
        var $modalEdad = document.getElementById("modal-edad");
    
        const especialidades = await http.get(BASE_URL);
        console.log(event.target);
        var citaSeleccionada = JSON.parse(event.target.value);
        const receta = await http.get(BASE_URL+`doctor/receta/${citaSeleccionada["item"]["idCita"]}`);
        console.log(citaSeleccionada["item"]["fecha"]);
        var elems = document.getElementById("modal1");
        var instance = M.Modal.getInstance(elems);
        $modalFecha.innerText = citaSeleccionada["item"]["fecha"].toString().split('T')[0];
        $modalDoctor.innerText = "Dr. "+citaSeleccionada["response3"]["nombres"]+" "+citaSeleccionada["response3"]["apellidoP"]+" "+citaSeleccionada["response3"]["apellidoM"];
        $modalHora.innerText = citaSeleccionada["item"]["hora"];
        var especialidadDoctor = citaSeleccionada["response2"]["idEspecialidad"];
        $modalCedula.innerText = citaSeleccionada["response2"]["cedula"];
        for(var i = 0; i < especialidades.length; i++){
            if(especialidadDoctor == especialidades[i]["idEspecialidad"]){
              $modalEspecialidad.innerText = especialidades[i]["nombreEsp"];
              break;
            }
        }
        $modalPaciente.innerText = persona["nombres"]+" "+persona["apellidoP"]+" "+persona["apellidoM"];
        $modalMotivo.innerText = citaSeleccionada["item"]["motivo"];
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
        instance.open();
      }

      const _initElements = async (idP) => {
        
        _getData(idP);
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
        },1500);
        
      };
    
      return {
        init: (idP) => {
          _initElements(idP);
        },
      }
     

  })();

  