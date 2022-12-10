const mainModalHC = (() =>{
    /**
     * Funcion que se encarga de vaciar los elementos de la tabla historial
     * del modal que se abre al ver el historial de un paciente
     * esta funcionalidad es para los botones del modal
     * @param {*} event 
     */
    const _actionButtonTerminar = (event) =>{
        var elems = document.getElementById("modal2");
        var instance = M.Modal.getInstance(elems);
         
        const $tabla = document.getElementById("cuerpotabla");
        while ($tabla.firstChild) {
            $tabla.removeChild($tabla.lastChild);
         }
         instance.close();
        };


     const inicio = () =>{
        const $terminar = document.getElementById("terminar");
        $terminar.addEventListener("click",_actionButtonTerminar);
        console.log("termine");
     } 
     return {
        init: () => {
          inicio();
        },
      }
})();
mainModalHC.init();