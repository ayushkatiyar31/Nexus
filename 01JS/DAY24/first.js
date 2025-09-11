const form = document.getElementById('myForm');
    const result = document.getElementById('result');

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // stop page reload

  
      const data = new FormData(form);

      
      const formObj = Object.fromEntries(data.entries());
 
      console.log("Form Data:", formObj);
 
      result.innerText = `${formObj.first} ${formObj.second} is a good Boy`;
 
    });

    form.addEventListener('reset', () => {
      result.innerText = "";  
      console.log("Form Reset");
    });