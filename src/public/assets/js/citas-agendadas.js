const main = (() => {
   
   
    const $cuerpoTabla = document.getElementById("cuerpotablaI");
    var cita;
    const BASE_URL = "http://localhost:4000";
    const persona = JSON.parse(OBJpersona);
    var numeroDeRows = 0;


     const _getData = async () => {
        const response = await http.get(BASE_URL+"/citas");
        console.log(response.length);
         numeroDeRows = 0;
        for(let index = 0; index < response.length; index++){
          const $row1 = _createRow(response[index]);
          console.log($cuerpoTabla.childNodes);
        
     }
        
        
      };

      const _createRow = async (item = {}) =>{
        const value = item["idPersona"];
        const itemId =item["idCita"];
        
        const response2 = await http.get(BASE_URL+`/doctor/buscar/${item["idDoctor"]}`);
        const response3 = await http.get(BASE_URL+`/persona/${response2["idPersona"]}`);

        const persona2 = await http.get(BASE_URL+`/persona/${item["idPersona"]}`);
        const correo = persona2["correo"];


        if(value==persona["idPersona"] && item["estado"]=="agendada"){
        console.log(itemId);
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);
        numeroDeRows++;
            const $td = document.createElement("td");
            const $td2 = document.createElement("td");
            const $td3 = document.createElement("td");
           
            $td.innerText = item["fecha"].toString().split('T')[0];
            $td2.innerText = item["hora"];
            $td3.innerText = "Dr. "+response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"];
            $row2.appendChild($td);
            $row2.appendChild($td2);
            $row2.appendChild($td3);
            $row2.appendChild(_createBtnAction(itemId,value, "Confirmar","blue", _actionButtonConfirmar));
            $row2.appendChild(_createBtnAction(itemId,value, "Eliminar","red",_actionButtonEliminar));
          return $row2;
          
        }
      };

      
      const _createBtnAction = (citaId = 0, personaId=0, labelBtn = "",color="", _actionFuntion = () => {}) => {
        

        const $btn = document.createElement("button");
        $btn.innerText = labelBtn;
        $btn.className += "waves-effect waves-light btn "+color;
        $btn.setAttribute("cita-id", citaId);
        $btn.setAttribute("persona-id",personaId);
        $btn.addEventListener("click", _actionFuntion);
        return $btn;
      };

      const _actionButtonConfirmar = async (event) => {
        const $btn = event.target;
        const idP = $btn.getAttribute("persona-id");
        const idC =$btn.getAttribute("cita-id");
        console.log(idC);
        console.log(idP);
        const resultado = await http.get(BASE_URL+`/correo/confirmar/${idC}/${idP}`);
        $btn.disabled = true;
        if(resultado["httpCode"]==201){
            modalResultado.iniciarModal("/assets/other/realizado.png","Su cita se ha confimado correctamente",`/informacion/${persona["idPersona"]}`);
        }else{
            modalResultado.iniciarModal("/assets/other/tache.png","Algo salio mal","");
        } 
        /*
        const response = await http.get(BASE_URL+"/citas");
        

        for(let index = 0; index < response.length; index++){
          const $row1 = _createRow(response[index]);
          console.log($cuerpoTabla.childNodes);
        
     }*/
        
      };
    
      const _actionButtonEliminar = async (event) => {
        const $btn = event.target;
        const idP = $btn.getAttribute("persona-id");
        const idC =$btn.getAttribute("cita-id");
        console.log(idC);
        console.log(idP);
        const resultado = await http.get(BASE_URL+`/informacion/cita/eliminar/${idC}`);
        console.log(resultado);
        if(resultado["httpCode"]==201){
            modalResultado.iniciarModal("/assets/other/realizado.png","Su cita se ha eliminado correctamente",``);
        }else{
          modalResultado.iniciarModal("/assets/other/tache.png","Algo salio mal","#!");
        } 
      };

      
      

      const _initElements = () => {
        _getData();
        setTimeout(()=>{
          console.log(numeroDeRows);
       if(numeroDeRows == 0){
          const $divTabla = document.getElementById("divTablaAg");
          while($divTabla.firstChild){
              $divTabla.removeChild($divTabla.lastChild);
          }
          const $letrero = document.createElement("h4");
          $letrero.innerText = "NO tienes citas agendadas"
          $divTabla.appendChild($letrero);
       }
        },1500);
      };
    
      return {
        init: () => {
          _initElements();
        },
      }
     

  })();
  
  main.init();