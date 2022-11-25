const mainDocAgenda = (() => {
    const $cuerpoTabla = document.getElementById("tablabody");
    var $fechaBusqueda = document.getElementById("fecha-agenda");
    const fechaActual = new Date().toISOString().toString().split('T')[0];
    console.log(fechaActual);
    //var cita;
    const BASE_URL = "http://localhost:4000/";
    const doctor = JSON.parse(OBJdoctor);
     //$selectDoctor.selectmenu("disble");
    const $btnAgendaCita = document.getElementById("buscar-agenda")

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
            
            if(fechaActual != (item["fecha"].toString().split('T')[0])){

              $btn.disabled=true;
              $btn2.disabled=true;
              $btn3.disabled=true;
            }

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