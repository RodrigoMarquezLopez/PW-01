const mainDocAgenda = (() => {
    const $cuerpoTabla = document.getElementById("tablabody");
    var $fechaBusqueda = document.getElementById("fecha-agenda");
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const hoy = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; 

    const fechaActualCorrecta = anioActual+"-"+mesActual+"-"+hoy;
   
    var identificadorPersona = null;
    //var cita;
    const BASE_URL = "http://localhost:4000/";
    const doctor = JSON.parse(OBJdoctor);
     //$selectDoctor.selectmenu("disble");
    const $btnAgendaCita = document.getElementById("buscar-agenda")
    $fechaBusqueda.value=fechaActualCorrecta;

     const _GenerarAgenda = async () => {
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
            
            if(fechaActualCorrecta != (item["fecha"].toString().split('T')[0])){

              $btn.disabled=true;
              //$btn2.disabled=true;
              //$btn3.disabled=true;
            }
            console.log(response3["idPersona"]);
            $btn.value = response3["idPersona"];
            $btn.addEventListener("click",_actionButtonHistoral);

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
          identificadorPersona = event.target.value;
          mainHistorialModal.init(identificadorPersona);
          var elems = document.getElementById("modal2");
          var instance = M.Modal.getInstance(elems);
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
  
  mainDocAgenda.init();

























  const mainHistorialModal = (() => {
    const $cuerpoTabla = document.getElementById("cuerpotabla");
    var cita;
    const BASE_URL = "http://localhost:4000/";
    //const persona = JSON.parse(OBJpersona);
     var persona;     

    //Obteniendo los elementos pertenecientes al modal

    
        
    //var instance = M.Modal.getInstance(elem);
    
    //const instancia = M.Modal.init($modalReceta);
     //$selectDoctor.selectmenu("disble");


     const _getData = async (idP) => {
      persona = await http.get(BASE_URL+`persona/${idP}`);
        const response = await http.get(BASE_URL+"citas");
        console.log(response.length);
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
        const especialidades = await http.get(BASE_URL);
        console.log(event.target);
        var citaSeleccionada = JSON.parse(event.target.value);
        console.log(citaSeleccionada["item"]["fecha"]);
        var elems = document.getElementById("modal1");
        var instance = M.Modal.getInstance(elems);
        $modalFecha.innerText = citaSeleccionada["item"]["fecha"].toString().split('T')[0];
        $modalDoctor.innerText = "Dr. "+citaSeleccionada["response3"]["nombres"]+" "+citaSeleccionada["response3"]["apellidoP"]+" "+citaSeleccionada["response3"]["apellidoM"];
        $modalHora.innerText = citaSeleccionada["item"]["hora"];
        var especialidadDoctor = citaSeleccionada["response2"]["idEspecialidad"]
        for(var i = 0; i < especialidades.length; i++){
            if(especialidadDoctor == especialidades[i]["idEspecialidad"]){
              $modalEspecialidad.innerText = especialidades[i]["nombreEsp"];
              break;
            }
        }
        $modalPaciente.innerText = persona["nombres"]+" "+persona["apellidoP"]+" "+persona["apellidoM"];
        $modalMotivo.innerText = citaSeleccionada["item"]["motivo"];


        instance.open();
      }

      const _initElements = async (idP) => {
        
        _getData(idP);
        
      };
    
      return {
        init: (idP) => {
          _initElements(idP);
        },
      }
     

  })();
  
  