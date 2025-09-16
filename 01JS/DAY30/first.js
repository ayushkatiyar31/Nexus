document.querySelector('button').addEventListener('click',()=>{

    const place = document.getElementById('location').value;
    
    function updateTemp(data){
       const element = document.getElementById('weatherInfo');
       element.innerHTML = `Today's Temperature: ${data.current.temp_c}`;
    }
    
    const prom = fetch(`http://api.weatherapi.com/v1/current.json?key=298e16224e5b413b9b6171110251609&q=${place}&aqi=no`)
    
    prom
    .then(response=>response.json())
    .then(data=> updateTemp(data));

})