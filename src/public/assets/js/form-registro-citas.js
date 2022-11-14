
//Inicializacion del selector de fecha Codigo necesario
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems,{
        format:"yyyy-mm-dd"
    });
    console.log("Si me ejecute");
  });



 
/*

const form = (() => {
  const $formRegistrar = document.getElementById("formRegistrar");
  //const $inputStatus = document.getElementById("status");
  //const $inputDescription = document.getElementById("description");
  const $selectFecha = document.getElementById("fecha");
  const $selectHora = document.getElementById("selectHora");

  const request = {
    "POST":()=>{
      http.post({url:"http://localhost:4000/citas/registrar",body:{
        idPersona:1,
        idDoctor:2,
        fecha:$selectFecha.value,
        hora:$selectHora.value,
        motivo:document.getElementById("motivo").value,
        estado:"agendada"
        }});
    },
    "PUT":() =>{
      http.put({url:"http://localhost:4000/api/v2/example",body:{
          
      }});
    }
  };

  const _sendActionForm = (event = {}) => {
    request["POST"]();
    /*event.preventDefault();
    if ($inputStatus.value === "" || $inputDescription.value === "") {
      alert("Todos los campos son requeridos");
    }
  };

  const _addActionForm = () => {
    $formStatus.addEventListener("submit", _sendActionForm);
  };

  return {
    init: () => {
      _addActionForm();
    },
  };
})();

form.init();


**/

