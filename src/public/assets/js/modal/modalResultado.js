const modalResultado=(()=>{
      

    const iniciarModal = (ubicacionImagen,texto,referencia) =>{
      const $imagen = document.getElementById("imagen");
      const $texto = document.getElementById("texto");
      const $btn = document.getElementById("aceptar");
      var elems = document.getElementById("modalResultado");
      var instance = M.Modal.getInstance(elems);
      $imagen.setAttribute("src",ubicacionImagen);
      $texto.innerText = texto;
      if(referencia != ""){
      $btn.setAttribute("href",referencia);
      }
      //Aatrox.setAttribute("src", "http://images.evisos.hn/2014/09/02/cachorros-husky-siberianos-urgente_d75de2f77_3.jpg");
      instance.open();
    };
    return {iniciarModal}
 })();