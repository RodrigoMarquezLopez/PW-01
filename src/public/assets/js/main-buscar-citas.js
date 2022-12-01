const mainBuscarCitas = (() => {
    const $cuerpoTabla = document.getElementById("tablabody");
    const $nombreDoctor = document.getElementById("listadoctor");
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const hoy = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; 
  
    const fechaActualCorrecta = anioActual+"-"+mesActual+"-"+hoy;
    // var identificadorPersona = null;
    //var cita;
    const BASE_URL = "http://localhost:4000/";
    //$selectDoctor.selectmenu("disble");
    const $btnBuscarCita = document.getElementById("btn-buscar-cita");
    //console.log($nombreDoctor.getSelected);
  
    const _BuscarCita = async () => {
  
      const persona = await http.get(BASE_URL + "admin/personas");
      for (let index = 0; index < persona.length; index++) {
        _RellenarNombreDoctor(persona[index]);
      }
      $btnBuscarCita.addEventListener("click", _actionFuntion);
    };
  
    const _RellenarNombreDoctor = async (item = {}) => {
      for (var i = 0; i < (($nombreDoctor.childNodes.length) - 1); i++) {
        var contador = i + 1;
        if (($nombreDoctor.childNodes[contador].value) == item["idPersona"]) {
          $nombreDoctor.childNodes[contador].innerText = "Dr." + " " + item["nombres"] + " " + item["apellidoP"] + " " + item["apellidoM"];
        }
      }
    }
  
    const _actionFuntion = async () => {
      if ($cuerpoTabla.childNodes.length > 0) {
        var contador = $cuerpoTabla.childNodes.length;
        for (i = 0; i < contador; i++) {
          $cuerpoTabla.removeChild($cuerpoTabla.childNodes[0]);
        }
      }
      if ($nombreDoctor.value != "especialidad") {
        console.log("funciono xd")
        const response = await http.get(BASE_URL + "admin/citas");
        for (let index = 0; index < response.length; index++) {
          _createRow(response[index]);
  
        }
      } else {
        alert("Seleccione un doctor");
      }
    };
  
    const _createRow = async (item = {}) => {
      var value = $nombreDoctor.options[$nombreDoctor.selectedIndex].value;
      const response2 = await http.get(BASE_URL + `admin/doctor/${value}`);
      const response3 = await http.get(BASE_URL + `admin/persona/${item["idPersona"]}`);
      console.log(item["idDoctor"]);
      console.log(response2["idDoctor"]);
      if (item["idDoctor"] == response2["idDoctor"] && (item["fecha"].toString().split('T')[0])== fechaActualCorrecta) {
        const $row2 = document.createElement("tr");
        $cuerpoTabla.appendChild($row2);
  
  
        const $td = document.createElement("td");
        const $td2 = document.createElement("td");
        const $td3 = document.createElement("td");
        const $td4 = document.createElement("td");
  
  
        $td.innerText = item["idCita"];
        $td2.innerText = response3["nombres"] + " " + response3["apellidoP"] + " " + response3["apellidoM"];
        $td3.innerText = item["hora"];
        $td4.innerText = item["motivo"];
  
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
      _BuscarCita();
    };
  
    return {
      init: () => {
        _initElements();
      },
    }
  
  
  })();
  
  mainBuscarCitas.init();