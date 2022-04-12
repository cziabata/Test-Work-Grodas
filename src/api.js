// fetch local json
const getData=()=>{
    fetch("data.json", {
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      mode: "cors",
    }
    ).then(response=> { 
        console.log(response)
        return response.json()}).then(data => {
        console.log(data);
      });
  }
  // fetch local json using new Request
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: "cors",}
  let request = new Request("./data.json", init);
  let getData2 = async () => {
    const response = await fetch(request);
    return await response.json();
  }
  // fetch local json using XMLHttpRequest
  let http = new XMLHttpRequest();
  http.open('get', './data.json', true);
  http.send();
  http.onload = function(){
    if(this.readyState === 4 && this.status === 200){
      let products = JSON.parse(this.responseText);
      console.log(products)
    }
  }
  http.onload();