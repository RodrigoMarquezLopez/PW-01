const mainModalReceta =  (() => {
    const BASE_URL = "http://localhost:10000/";
    var doctor;
    const iniciarModal = (item = {}) =>{
        doctor = item;
        var elems = document.getElementById("modal3");
        var instance = M.Modal.getInstance(elems);
        //$texto.innerText = texto;
        instance.open();
      };
      

   
    const _accionVerPDF = async () => {
        const $modalDoctor = document.getElementById("modal-doctor");
        const $modalFecha = document.getElementById("modal-fecha");
        const $modalHora = document.getElementById("modal-hora");
        const $modalEspecialidad= document.getElementById("modal-especialidad");
        const $modalPaciente= document.getElementById("modal-paciente");
        const $modalMotivo = document.getElementById("modal-motivo");
        console.log("Soy doctor modal"+doctor)
        const data ={
            "url":BASE_URL+'doctor/receta',
            "body":{
                  "nombreDoctor":$modalDoctor.innerText,
                  "fecha":$modalFecha.innerText,
                  "especialidad":$modalEspecialidad.innerText,
                  "nombrePaciente":$modalPaciente.innerText,
                  "cedula":doctor["cedula"]
                },
          };
          console.log(data);
          await http.post(data); 
    }
    
    const init = () =>{
        const $btnPDF = document.getElementById("btnPdf");
        //$btnPDF.addEventListener("click",_accionVerPDF);
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