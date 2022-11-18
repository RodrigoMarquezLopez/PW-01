//const { response } = require("express");

const main = (() => {
    const $cuerpoTabla = document.getElementById("cuerpotabla");
    var cita;
    const BASE_URL = "http://localhost:4000/citas";
    const persona = JSON.parse(OBJpersona);
     //$selectDoctor.selectmenu("disble");


     const _getData = async () => {
        const response = await http.get(BASE_URL);
        console.log(response.length);
        for(let index = 0; index < response.length; index++){
             const $row1 = _createRow(response[index]);
             console.log($cuerpoTabla.childNodes);
           
        }
      };

      const _createRow = async (item = {}) =>{
        const value = item["idPersona"];
        const response2 = await http.get(BASE_URL+`/doctor/${item["idDoctor"]}`);
        const response3 = await http.get(BASE_URL+`/persona/${response2["idPersona"]}`);
        //if(value==17){
          if(value==persona["idPersona"] && item["estado"]=="finalizada"){
        //const $row2 = document.getElementById("datos");
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);
            const $td = document.createElement("td");
            const $td2 = document.createElement("td");
            const $td3 = document.createElement("td");
            const $btn = document.createElement("button"); //la funcionalidad de este botón se le será asignada en la siguiente iteración
            $btn.textContent = "Ver Información";
            $td.innerText = item["fecha"].toString().split('T')[0];
            $td2.innerText = item["hora"];
            $td3.innerText = "Dr. "+response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"];
            //$td.setAttribute("fecha",item["fecha"]);
            //$td2.setAttribute("hora",item["hora"]);
           // $td3.setAttribute("doctor", "Dr. "+response3["nombres"]+" "+response3["apellidoP"]+" "+response3["apellidoM"];);
            $row2.appendChild($td);
            $row2.appendChild($td2);
            $row2.appendChild($td3);
            $row2.appendChild($btn);
          return $row2;
          
        }
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