
//Inicializacion del selector de fecha Codigo necesario
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems,{
        format:"yyyy-mm-dd"
    });
    console.log("Si me ejecute");
  });



$fecha = document.getElementById("fecha");
$fecha.addEventListener('change',event =>{
  console.log($fecha.value);
})  



const form = (() => {
  const $formRegistrar = document.getElementById("formRegistrar");
  const $inputStatus = document.getElementById("status");
  const $inputDescription = document.getElementById("description");

  const _sendActionForm = (event = {}) => {
    event.preventDefault();
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



