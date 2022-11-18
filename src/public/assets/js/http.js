console.log("Soy http");

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
    return { get: _get, post:_post };
  })();
  

