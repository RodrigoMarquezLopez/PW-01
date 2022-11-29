const formRegistrar = (()=>{
    const $formRegistrar = document.getElementById("registrar");
    const $nombre = document.getElementById("name");
    const $apellidoP = document.getElementById("apellidoP");
    const $apellidoM = document.getElementById("apellidoM");
    const $correo = document.getElementById("correo");
    const $constrenia = document.getElementById("contrasenia");
    const $constreniaConf = document.getElementById("contraseniaConf");


    const acitonForm = (event = {})=>{
        event.preventDefault();

        if($nombre.value === "" || $apellidoP.value === "" || 
            $apellidoM.value === "" || $correo.value === ""
            || $constrenia.value === "" || $constreniaConf.value ===""){
                alert("Todos los campos son necesarios");
        }else if(!$correo.value.includes("@")){
            alert("Correo no valido");
        }else if(!$constrenia.value === $constreniaConf.value){
            alert("Las contraseñas no coinciden");
        }
        

        
    };
    const addActionForm = () =>{
        $formRegistrar.addEventListener("submit",acitonForm);
    }

    return {
        init:()=>{
            addActionForm();
        }
    };

})();
formRegistrar.init();