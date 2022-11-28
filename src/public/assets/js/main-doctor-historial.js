const mainModalHC = (() =>{
    
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