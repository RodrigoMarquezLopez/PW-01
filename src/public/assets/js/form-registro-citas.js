
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




