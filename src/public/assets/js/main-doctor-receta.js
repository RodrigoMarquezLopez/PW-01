const mainModalReceta =  (() => {
    const BASE_URL = "http://localhost:4000/";
    const _accionVerPDF = async () => {
        const $modalDoctor = document.getElementById("modal-doctor");
        const $modalFecha = document.getElementById("modal-fecha");
        const $modalHora = document.getElementById("modal-hora");
        const $modalEspecialidad= document.getElementById("modal-especialidad");
        const $modalPaciente= document.getElementById("modal-paciente");
        const $modalMotivo = document.getElementById("modal-motivo");
        const data ={
            "url":BASE_URL+'doctor/receta',
            "body":{
                  "nombreDoctor":$modalDoctor.innerText,
                  "fecha":$modalFecha.innerText,
                  "especialidad":$modalEspecialidad.innerText,
                  "nombrePaciente":$modalPaciente.innerText
                },
          };
          console.log(data);
          await http.post(data); 
    }
    
    const init = () =>{
        const $btnPDF = document.getElementById("botonPdf");
      //$btnPDF.addEventListener("click",_accionVerPDF);
    }

    return {
        inicio: () => {
          init();
        },
      }
})();

mainModalReceta.inicio();