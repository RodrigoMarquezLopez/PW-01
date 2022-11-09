const main = (() => {
    const $selectEsp = document.getElementById("selectEsp");
    const $descripcionEsp = document.getElementById("descripcionEsp");
    const BASE_URL = "http://localhost:4000/";
    
    const _getData = async () => {
      const response = await http.get(BASE_URL);
      for(let index = 0; index < response.length; index++){
            _createOption(response[index],"idOption");

      }
      
      
    };

   

    const _createOption = (item={},itemId = "")=>{
        const $option = document.createElement("option");
        for(const key in item){
            const value = item["nombreEsp"];
            $option.innerText = value;
            $option.setAttribute("idEspecialidad",item["idEspecialidad"]);
            $selectEsp.appendChild($option);
            console.log(value);
        }

    };

    const _actionSelectEsp = (event) =>{
        const $selectEvent = event.target;
        console.log($selectEvent.value);
        var idEsp = $selectEvent.value;
        _getDescription(idEsp);
       // $descripcionEsp.innerText = 
    };

    const _getDescription = async (nombreEsp)=>{
        const response = await http.get(BASE_URL);
        for(let index = 0; index < response.length; index++){
            var item = response[index];
            console.log(item);
            for(const key in item){
                if(nombreEsp == item["nombreEsp"]){
                    $descripcionEsp.innerText = item["descripcion"];
                    break;
                }
                
            }

      }
    }
  
     const _initElements = () => {
      _getData();
     
    };
  
    return {
      init: () => {
        _initElements();
        $selectEsp.addEventListener('change',_actionSelectEsp);
      },
    };
  })();
  
  main.init();
  