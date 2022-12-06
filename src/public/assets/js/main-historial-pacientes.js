const mainHistorialPaciente = (() => {
    const $cuerpoTabla = document.getElementById("tablabody");
    var $NombrePaciente = document.getElementById("nombre-paciente");
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const hoy = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; 

    const fechaActualCorrecta = anioActual+"-"+mesActual+"-"+hoy;
   
    var identificadorPersona = null;
    //var cita;
    const BASE_URL = "http://localhost:4000/";
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
          for(i=0; i<contador;i++){
            $cuerpoTabla.removeChild($cuerpoTabla.childNodes[0]);
          }
        }
        if($NombrePaciente.value != ""){
        const response = await http.get(BASE_URL+"doctor/agenda/citas");
        for(let index = 0; index < response.length; index++){
             _createRow(response[index]);
           
        }
        }else{
          alert("Escriba el nombre del paciente");
        }
      };

      const _createRow = async (item = {}) =>{
        const response3 = await http.get(BASE_URL+`persona/${item["idPersona"]}`);
        if(item["idDoctor"]==doctor["idDoctor"] && (response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"])==$NombrePaciente.value){
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);


            const $td = document.createElement("td");
            const $td2 = document.createElement("td");
            const $td3 = document.createElement("td");
            const $td4 = document.createElement("td");

            const $btn = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn.textContent = "Receta";
            $btn.className = "waves-effect blue darken-1 btn";
            
            
            
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
  
  mainHistorialPaciente.init();
