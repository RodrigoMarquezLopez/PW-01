
const main = (() => {
   
   
    const $cuerpoTabla = document.getElementById("cuerpotabla");
    var cita;
    const BASE_URL = "http://localhost:4000";
    const persona = JSON.parse(OBJpersona);



     const _getData = async () => {
        const response = await http.get(BASE_URL+"/citas");
        console.log(response.length);

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
        const request = await http.get(BASE_URL+`/correo/confirmar/${idC}/${idP}`);
        
        

        
        
      };
    
      const _actionButtonEliminar = async (event) => {
        const $btn = event.target;
        const idP = $btn.getAttribute("persona-id");
        const idC =$btn.getAttribute("cita-id");
        console.log(idC);
        console.log(idP);
        const request = await http.get(BASE_URL+`/cita/eliminar/${idC}`);
      };

      
      

      const _initElements = () => {
        _getData();
      };
    
      return {
        init: () => {
          _initElements();
        },
      }
     

  })();
  
  main.init();

  