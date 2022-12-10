/**
 * Funcion principal para ela tabla del paciente, aqui se añade la funcionalidad a la tabla 
 * en la cual vera las citas agendadas, a esta tabla se accedede mediante el apartado de informacion
 * del usuario
 * 
 */
const main = (() => {
   
   
    const $cuerpoTabla = document.getElementById("cuerpotablaI");
    var cita;
    const BASE_URL = "https://clinicaesp-q.onrender.com";
    const persona = JSON.parse(OBJpersona);
    var numeroDeRows = 0;

    /**
     * FUncion encargada de generar los datos para la tabla, estos datos son cargados 
     * y estan en funcion de las citas agendadas que tenga el paciente
     */
     const _getData = async () => {
        const response = await http.get(BASE_URL+"/citas");
        console.log(response.length);
         numeroDeRows = 0;
        for(let index = 0; index < response.length; index++){
          const $row1 = _createRow(response[index]);
          console.log($cuerpoTabla.childNodes);
        
     }
        
        
      };
      /**
       * Funcion interna para la generacion de la fila, se encarga de buscar las citas agendadas 
       * por el paciente y añadiralas a la tabla con solo los datos necesarios
       * @param {cita} item 
       * @returns {tr} 
       */
      const _createRow = async (item = {}) =>{
        const value = item["idPersona"];
        const itemId =item["idCita"];
        
        const response2 = await http.get(BASE_URL+`/doctor/buscar/${item["idDoctor"]}`);
        const response3 = await http.get(BASE_URL+`/persona/${response2["idPersona"]}`);

        const persona2 = await http.get(BASE_URL+`/persona/${item["idPersona"]}`);
        const correo = persona2["correo"];


        if(value==persona["idPersona"] && (item["estado"]=="agendada"||item["estado"]=="confirmada")){
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
            var $botonConfirmar = _createBtnAction(itemId,value, "Confirmar","blue", _actionButtonConfirmar)
            if(item["estado"]=="confirmada"){
                $botonConfirmar.disabled = true;
            }
            $row2.appendChild($botonConfirmar);
            
            $row2.appendChild(_createBtnAction(itemId,value, "Eliminar","red",_actionButtonEliminar));
          return $row2;
          
        }
      };

      /**
       * 
       * @param {*} citaId 
       * @param {*} personaId 
       * @param {*} labelBtn 
       * @param {*} color 
       * @param {*} _actionFuntion 
       * @returns 
       */
      
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
        console.log(resultado)
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
            modalResultado.iniciarModal("/assets/other/realizado.png","Su cita se ha eliminado correctamente",`/informacion/${persona["idPersona"]}`);
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
        },30000);
      };
    
      return {
        init: () => {
          _initElements();
        },
      }
     

  })();
  
  main.init();