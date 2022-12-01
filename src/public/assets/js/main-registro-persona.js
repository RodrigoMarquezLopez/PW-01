const formRegistrar = (()=>{
    const $formRegistrar = document.getElementById("registrar");
    const $nombre = document.getElementById("name");
    const $apellidoP = document.getElementById("apellidoP");
    const $apellidoM = document.getElementById("apellidoM");
    const $correo = document.getElementById("correo");
    const $constrenia = document.getElementById("contrasenia");
    const $constreniaConf = document.getElementById("contraseniaConf");
    const $spanContrasenia = document.getElementById("errorContrasenia");


    const acitonForm = (event)=>{
        event.preventDefault();
        console.log($nombre.value);
        console.log($constrenia.value);
        console.log($constreniaConf.value);
        if($nombre.value === "" || $apellidoP.value === "" || 
            $apellidoM.value === "" || $correo.value === ""
            || $constrenia.value === "" || $constreniaConf.value ===""){
                //alert("Todos los campos son necesarios");
                modalResultado.iniciarModal("/assets/other/tache.png","TODOS LOS CAMPOS SON NECESARIOS","");
        }else if(!$correo.value.includes("@")){
            alert("Correo no valido");
            modalResultado.iniciarModal("/assets/other/tache.png","Correo NO VALIDO","");
        }else if($constrenia.value !== $constreniaConf.value){
            //alert("Las contraseñas no coinciden");
            modalResultado.iniciarModal("/assets/other/tache.png","LAS CONTRASEÑAS NO COINCIDEN","");
            $constrenia.value="";
            $constreniaConf.value="";
        }else{
            $formRegistrar.submit();
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