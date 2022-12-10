/**
 * Funcionalidad para el modal que abre la receta, es para genear una receta de la vista dada
 * por lo tanto el botnon que esta en la agenda solo se encarga de abrir este modal
 */
const mainModalReceta =  (() => {
    const BASE_URL = "https://clinicaesp-q.onrender.com/";
    var doctor;

    /**
     * Funcion para abirar el modal cargando las datos del doctor
     * @param {doctor} item 
     */
    const iniciarModal = (item = {}) =>{
        doctor = JSON.stringify(item);
        var elems = document.getElementById("modal3");
        var instance = M.Modal.getInstance(elems);
        //$texto.innerText = texto;
        instance.open();
      };
      

      /**
       * Esta receta tiene que tener la opcion de generar un pdf de la receta realizada por lo que 
       * se le pasan todos los paramentros del doctor y los que hayan sifdo rellenados por el doctor
       * por lo que se encarga de tomar la informacion de los campos y pasarlo 
       * a un arreglo json
       */
    const _accionVerPDF = async () => {
        const $modalDoctor = document.getElementById("form-doctor");
        const $modalFecha = document.getElementById("form-fecha");
        const $modalHora = document.getElementById("form-hora");
        const $modalEspecialidad= document.getElementById("form-especialidad");
        const $modalPaciente= document.getElementById("form-paciente");
        const $modalMotivo = document.getElementById("form-motivo");
        const $modalPeso = document.getElementById("form-peso");
        const $modalEdad = document.getElementById("form-edad");
        const $modalAltura=document.getElementById("form-altura");
        const $modalDiagnostico=document.getElementById("form-diagnostico");
        const $modalIndicaciones=document.getElementById("form-indicaciones");
        const $modalCedula=document.getElementById("form-cedula");

        console.log("Soy doctor modal"+doctor)
        const data ={
            "url":BASE_URL+'doctor/receta',
            "body":{
                  "doctor":$modalDoctor.value,
                  "fecha":$modalFecha.value,
                  "cedula":$modalCedula.value,
                  "especialidad":$modalEspecialidad.value,
                  "paciente":$modalPaciente.value,
                  "motivo":$modalMotivo.value,
                  "diagnostico":$modalIndicaciones.value,
                  "indicaciones":$modalIndicaciones.value,
                  "edad":$modalEdad.value,
                  "peso":$modalPeso.value,
                  "altura":$modalAltura.value

                },
          };
          console.log(data);
          const htmlcontent= await http.post(data); 
          var opt = {
            margin:       2,
            filename:     'myfile.pdf',
            image:        { type: 'jpeg', quality: 1.0 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
          html2pdf().from(htmlcontent["htmlContent"]).output('dataurlnewwindow');

          console.log(htmlcontent["htmlContent"]);
    }
    
    const init = () =>{
        const $btnPDF = document.getElementById("btnPdf");
        $btnPDF.addEventListener("click",_accionVerPDF);
    }

    return {
        inicio: () => {
          init();
          console.log("Soy doctor modal"+doctor)
        },
        iniciarModal
      }
})();

mainModalReceta.inicio();