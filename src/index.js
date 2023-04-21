import * as bootstrap from 'bootstrap';
function testResults (form) {
    var inputValue = form.email.value;
    fetch("http://localhost:5000", {
      method: "Post",
      body:  inputValue
  }).then((response) => response.text())
    .then((responseText) => {
      alert(responseText);
    })
    .catch((error) => {
      console.error("foo: " + error)
    })
  }
  const link = document.querySelectorAll(".nav-item");
  link.forEach((li)=>{
    li.addEventListener("click",()=>{
     li.toogle("active");
    })
  })