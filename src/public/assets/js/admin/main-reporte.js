const fechaIni = (()=>{
    const init = ()=>{
        document.addEventListener('DOMContentLoaded', function() {
            let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
                let hoy = new Date();
                let ayer = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);
                
                
        
            var elems = document.querySelectorAll('.datepicker');
            var instances = M.Datepicker.init(elems,{
                format:"yyyy-mm-dd",
                defaultDate:ayer,
                setDefaultDate:true,
                maxDate:ayer,
                i18n:{
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                weekdaysShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
                weekdaysAbbrev: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
                cancel:	'Cancelar',
                done:"Aceptar"
                }
                
            });
          });
    }
    return {init};

})();
fechaIni.init();
const mainReporte = ( ()=>{
    const $fechaInc = document.getElementById("fechaInicio");
    const $fechaFin = document.getElementById("fechaFin");
    const BASE_URL = "https://clinicaesp-q.onrender.com/";
    const $graficaDoc = document.getElementById("graficaDoc");
    const $graficaHoras = document.getElementById("graficaHoras"); 
    const $graficaEsp = document.getElementById("graficaEsp");
    const $tDoc = document.getElementById("tDoc");
    const $tHora = document.getElementById("tHora");
    const $tEsp = document.getElementById("tEsp");
    
    const $totalCitas = document.getElementById("totalCitas");
    const $totalCanceladas=document.getElementById("totalCanceladas");
    const $totalCitasFinal = document.getElementById("totalFinal");
    const $btn = document.getElementById("generar");
    const $totales = document.getElementById("totales");

    //divs contenedores
    const $divContenedor = document.getElementById("bProgreso");
    var barra = document.createElement("div");
        barra.className = "progress blue darken-1";
    var barraInterna = document.createElement("div");
        barraInterna.className = "indeterminate";
        barra.appendChild(barraInterna);
    var activo = false;
    /**
     * <div id="bProgreso">
        <div class="progress" id="progres">
            <div class="indeterminate"></div>
        </div>
    </div>
     */
    var graficaDoctor;
    var graficaHoras;
    var graficaEspCount;
   
    const rellenarPorcentajeCitasEspecialidad = async ()=>{
        try{
        $totales.className = "valign-wrapper card blue darken-1 hide"; 
        $tDoc.innerText = ""
        $tHora.innerText = ""
        $tEsp.innerText = ""  
         $divContenedor.appendChild(barra);
         console.log($fechaInc.value);
         console.log($fechaFin.value);   
         const fechaInicio = new Date($fechaInc.value);
         const fechaFin = new Date($fechaFin.value);
         console.log(fechaInicio);
         console.log(fechaFin);
         if(fechaInicio <= fechaFin){
            activo = true;
            const countHoras = await http.get(BASE_URL+`admin/horas/${$fechaInc.value}/${$fechaFin.value}`);
            const doctoresEsp = await http.get(BASE_URL+`admin/especialidades`);
            const countCitas = await http.get(BASE_URL+`admin/countDoc/${$fechaInc.value}/${$fechaFin.value}`);
            const allEspecialidades = await http.get(BASE_URL+`admin/all/especialidades`);

            console.log(countHoras);
            console.log(doctoresEsp);
            console.log(countCitas);

            const personas = await personasDoc(doctoresEsp);
            console.log(personas);
            const dataCitas = {
                labels: personas,
                datasets: [{
                    label:"Cantidad de citas",
                    scaleSteps:1,
                    scaleStartValue:0,
                    scaleStartValue:0,
                    scaleStepWidth:1,
                    data: cantidadCitas(countCitas),
                    backgroundColor: 'rgba(9, 129, 176, 0.2)',
                    
                }]
                };
                const configCitas = {
                type: 'bar',
                data: dataCitas,
                options:{indexAxis: 'y'}
            };
                

                const dataHoras = {
                    labels: etiquetasHoras(countHoras),
                    datasets: [{
                        label:"Cantidad de citas",
                        scaleSteps:1,
                        scaleStartValue:0,
                        scaleStartValue:0,
                        scaleStepWidth:1,
                        data: valoresHoras(countHoras),
                        backgroundColor: 'rgba(9, 129, 176, 0.2)',
                        
                    }]
                    };
                

                    const configHoras = {
                        type: 'bar',
                        data: dataHoras,
                        options:{indexAxis: 'x'}
                    };
                    
                
                var etiquetasEspecialidades = etiquetasEsp(allEspecialidades);
                var colors = [etiquetasEspecialidades.length];
                for(let i = 0; i<etiquetasEspecialidades.length;i++){
                    colors[i] = generarColor();
                }    
                const dataEsp ={
                    labels: etiquetasEspecialidades,
                    datasets: [{
                        label:"Cantidad de citas",
                        scaleSteps:1,
                        scaleStartValue:0,
                        scaleStartValue:0,
                        scaleStepWidth:1,
                        data: await countEspCita(allEspecialidades),
                        backgroundColor: colors,
                        
                    }]
                    };  
                    
                    const configEsp = {
                        type: 'doughnut',
                        data: dataEsp,
                        
                    };


                    var numeroCitas = await http.get(BASE_URL+`admin/countCitas/${$fechaInc.value}/${$fechaFin.value}`);

                    console.log(numeroCitas);
                    ///countCitas/:fechaInc/:fechaFin

                    $totalCitas.innerText = "TOTAL DE CITAS: " + numeroCitas["cantidad"]
                    $totalCanceladas.innerText = "TOTAL DE CITAS CANCELADAS: "+numeroCitas["canceladas"];
                    $totalCitasFinal.innerText = "TOTAL CITAS REALIZADAS: "+numeroCitas["final"]

                   
                    $tDoc.innerText = "Citas atendidas por doctor"
                    graficaDoctor= new Chart($graficaDoc,configCitas);
                    $tHora.innerText = "Horas concurridas"
                    graficaHoras=new Chart($graficaHoras,configHoras); 
                    $tEsp.innerText = "Porcentaje de citas por especialidad"
                    graficaEspCount=new Chart($graficaEsp,configEsp);   
                    $totales.className = "valign-wrapper card blue darken-1";
                    $divContenedor.removeChild($divContenedor.lastChild);

                    
           
         }else{
            modalResultado.iniciarModal("/assets/other/tache.png","Intervalo no valido",``);
         }
         
        }catch(error){
            console.log(error);
            modalResultado.iniciarModal("/assets/other/tache.png","No hay registros en ese intervalo de tiempo",``);
        }
    };

    const generarColor = ()=>{
        const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
        return `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`
    }

    const countEspCita = async (array=[])=>{
        //array especialidades
       // /admin/countDocId/2022-12-06/2022-12-06/1
        const data = [array.length]
        for(let i = 0; i<array.length;i++){
            data[i] = 0; 
        }
        for(let i = 0; i<array.length;i++){
            var doctores = await http.get(BASE_URL+`admin/doctorEsp/${array[i]["idEspecialidad"]}`);
            for(let j = 0; j<doctores.length;j++){
                var cDoc = await http.get(BASE_URL+`admin/countDocId/${$fechaInc.value}/${$fechaFin.value}/${doctores[j]["idDoctor"]}`);
                if(cDoc.length > 0){
                data[i] = data[i] + parseInt(cDoc[0]["counDoctor"]); 
                }
            }
        }
        return data;
    };

    const personasDoc = async (array =[])=>{
        var pDoc = [array.length];
        for(let i = 0; i<array.length;i++){
           var personaD = await http.get(BASE_URL+`admin/persona/${array[i]["idPersona"]}`);
           pDoc[i] = "Dr."+" "+personaD["nombres"]+" "+personaD["apellidoP"]+" "+personaD["apellidoM"]
            
        }
        return pDoc;
    };

    const cantidadCitas = (array=[])=>{
        var nCitas = [array.length];
        for(let i = 0; i<array.length;i++){
            nCitas[i] = array[i]["countDoc"]
        }
        return nCitas;
    };


    const etiquetasHoras = (array=[])=>{
        var etqHoras = [array.length];
        for(let i = 0; i<array.length;i++){
            etqHoras[i] = array[i]["hora"];
        }
        return etqHoras;
    };

    const valoresHoras = (array=[])=>{
        var valHoras = [array.length];
        for(let i = 0; i<array.length;i++){
            valHoras[i] = array[i]["counHoras"];
        }
        return valHoras;
    };

    const acitonBoton = (event)=>{
        // var graficaDoctor;
                    //var graficaHoras;
                    //var graficaEspCount
        //$fechaInc.getAttribute("readonly",true)
        //$fechaFin.getAttribute("readonly",true);
        if(activo){
        $totalCitas.innerText ="";
        $totalCanceladas.innerText ="";
        $totalCitasFinal.innerText ="";

        graficaDoctor.destroy();
        graficaEspCount.destroy();
        graficaHoras.destroy();
        }
        rellenarPorcentajeCitasEspecialidad();
    }

    //adminRouter.use("/all/especialidades",getAllEsp);

    const etiquetasEsp = (array=[])=>{
        var valEsp = [array.length];
        for(let i = 0; i<array.length;i++){
            valEsp[i] = array[i]["nombreEsp"];
        }
        return valEsp;
    };

   const inicio = ()=>{
    
    $btn.addEventListener("click",acitonBoton),3500;
    //$btn.addEventListener("click",acitonBoton);
   }
   const init = ()=>{
        inicio();
   } 
   return {init}
})();

mainReporte.init();