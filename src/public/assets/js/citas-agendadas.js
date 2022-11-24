


const main = (() => {
   
   
    const $cuerpoTabla = document.getElementById("cuerpotabla");
    var cita;
    const BASE_URL = "http://localhost:4000";
    const persona = JSON.parse(OBJpersona);
     //$selectDoctor.selectmenu("disble");


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

        //if(value==17){
          if(value==persona["idPersona"] && item["estado"]=="agendada"){
        //const $row2 = document.getElementById("datos");
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);
            const $td = document.createElement("td");
            const $td2 = document.createElement("td");
            const $td3 = document.createElement("td");
           
            $td.innerText = item["fecha"].toString().split('T')[0];
            $td2.innerText = item["hora"];
            $td3.innerText = "Dr. "+response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"];
            //$td.setAttribute("fecha",item["fecha"]);
            //$td2.setAttribute("hora",item["hora"]);
           // $td3.setAttribute("doctor", "Dr. "+response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"];);
            $row2.appendChild($td);
            $row2.appendChild($td2);
            $row2.appendChild($td3);
            $row2.appendChild(_createBtnAction(value, "Confirmar","blue", _actionButtonConfirmar));
            $row2.appendChild(_createBtnAction(correo, "Eliminar","red",_actionButtonEliminar));
          return $row2;
          
        }
      };

      
      const _createBtnAction = (itemId = 0, labelBtn = "",color="", _actionFuntion = () => {}) => {
        

        const $btn = document.createElement("button");
        $btn.innerText = labelBtn;
        $btn.className += "waves-effect waves-light btn "+color;
        $btn.setAttribute("item-id", itemId);
        $btn.addEventListener("click", _actionFuntion);
        return $btn;
      };

      const _actionButtonConfirmar = async (event) => {
        const $btn = event.target;
        const correo = $btn.getAttribute("item-id");
        console.log(correo);
        const request = await http.get(BASE_URL+`/correo/${correo}`);
        

        
      };
    
      const _actionButtonEliminar = async (event) => {
        const $btn = event.target;
        const idCita = $btn.getAttribute("item-id");
        const response = await http.delete({url:`${BASE_URL}/${idCita}`});
        producto.getData();
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

  