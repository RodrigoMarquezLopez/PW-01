const main = (() => {
    const $selectEsp = document.getElementById("selectEsp");
    const $descripcionEsp = document.getElementById("descripcionEsp");
    const $selectDoctor = document.getElementById("selectDoctor");
    const $selectFecha = document.getElementById("fecha");
    const $selectHora = document.getElementById("selectHora");
    const $guardar = document.getElementById("guardar");
    const BASE_URL = "http://localhost:4000/";
    var doctor;
     //$selectDoctor.selectmenu("disble");


    const _getData = async () => {
      const response = await http.get(BASE_URL);
      for(let index = 0; index < response.length; index++){
            _createOption(response[index],"idOption");

      }
      
      
    };
    
    const _getDataDoctor = async (idEspecialidad)=>{
      const response = await http.get(BASE_URL+`doctor/${idEspecialidad}`);
      for(let index = 0; index < response.length; index++){
          _createOptionDoctor(response[index]);

      }
    };


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

const _actionSelectDoctor = (event)=>{
  doctor = $selectDoctor.options[$selectDoctor.selectedIndex].getAttribute("iddoctor");
  
}



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

    const _actionSelectEsp = (event) =>{
        const $selectEvent = event.target;
        console.log($selectEvent.value);
        var idEsp = $selectEvent.value;
        _getDescription(idEsp);
       // $descripcionEsp.innerText = 
    };


    const _actionSelectFecha = async (event)=>{
        const response = await http.get(BASE_URL+"doctor/buscar/"+doctor);
        console.log($selectFecha.value);
        _getCitas(doctor,new Date($selectFecha.value).toISOString(),response["horaEntrada"],response["horaSalida"]);
    }
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

    const _getCitas = async (idDoctor,fecha,horaEntrada,horaSalida)=>{
        const response = await http.get(BASE_URL+`citas/${idDoctor}/${fecha}`);
        console.log(response);
        const arregloHoras = _generarArrgeloComparacion(horaEntrada,horaSalida);
        console.log(arregloHoras);
        if(response.length > 0){
        for(let index = 0; index < response.length; index++){
            for(let i  = 0; i<arregloHoras.length;i++){
                if(response[index]["hora"]==arregloHoras[i]){
                    arregloHoras[i] = -1;
                }
            }
        }


      }
      console.log(arregloHoras);
      _agregarHoras(arregloHoras);
    };

    const _agregarHoras = (citasDisponibles = [])=>{
      for(let index = 0; index<citasDisponibles.length;index++){
        const $option = document.createElement("option");
        if(citasDisponibles[index] != -1){
          $option.innerText = citasDisponibles[index];
          $selectHora.appendChild($option);
          
        }
      }
    };

    const _actionRegistrar = async (event) => {
      if($selectDoctor.value != "Doctor" && $selectFecha.value != "" && 
      $selectHora != "Elige una hora" && document.getElementById("motivo").value != ""){
        //idPersona,idDoctor,fecha,hora,motivo,estado
        console.log("llegue");
         // const body = new FormData();
          //const data = new FormData();
         // body.append('estado',"agendada");
         // body.append('fecha',$selectFecha.value);
          //body.append('hora',$selectHora.value);
          //body.append('motivo',document.getElementById("motivo").value);
          //body.append('idDoctor',parseInt(doctor));
          //body.append('idPersona',1);
         // data.append('url',BASE_URL+'citas/registrar');
         // data.append('body',body);
          const data ={
                          "url":BASE_URL+'citas/registrar',
                          "body":{
                                "estado":"agendada",
                                "fecha":new Date($selectFecha.value).toISOString().split('T')[0],
                                "hora":$selectHora.value,
                                "motivo":document.getElementById("motivo").value,
                                "idDoctor":parseInt(doctor),
                                "idPersona":17,
                              },
                        };
                        

        console.log(data);
        await http.post(data);    
        //console.log(response);              
      }

    };
  
     const _initElements = () => {
      _getData();
     
    };


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
