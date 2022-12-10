console.log("Soy http");
/**
 * Funciones http que permiten la comunicacion con el backend
 * se tienen 3 funciones principales:
 *  GET: se encarga de buscar los datos
 * y se utiliza exclusivamente para solictar datos
 *  POST: Dirijida al envio de datos, generalmente son datos en fomrato json y es 
 * utilizada para insertar valores a la base de datos
 * PUT: Se encarga de la actualizacion de registos, en donde los aprametros
 * a afectar es muy importante
 * 
 */
const http = (() => {
    const _get = async (url = "") => {
      const response = await fetch(url);
      const bodyResponse = await response.json();
      return bodyResponse;
    };
  
    const _post = async (data = { url: "", body: {} }) => {
      const {url,body} = data;
      console.log(body);
      //debugger;
      const response = await fetch(url, { method: "POST" ,
      headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(body)});
      const bodyResponse = await response.json();
      return bodyResponse;
    };
    const _put = async (data = { url: "", body: {} }) => {
      console.log("here");
      const { url, body } = data;
      const response = await fetch(url, {
        method: "PUT",
        headers:{'Content-Type': 'application/json',},
        body:JSON.stringify(body)
      });
      const bodyResponse = await response.json();
      return bodyResponse;
    };

    return { get: _get, post:_post,put:_put };
  })();
  

