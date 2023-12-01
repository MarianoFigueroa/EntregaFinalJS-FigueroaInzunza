
document.addEventListener("DOMContentLoaded", function(){
document.getElementById("registrar").addEventListener("click", function(e) {
 e.preventDefault();
  var nombre = document.getElementById("nombre").value.trim();
  var apellido = document.getElementById("apellido").value.trim();
  var email = document.getElementById("email").value.trim();
  var telefono = document.getElementById("telefono").value.trim();
  var contrasena = document.getElementById("contrasena").value.trim();
  
  var usuario = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    telefono: telefono,
    contrasena: contrasena,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Respuesta del servidor:", data);
    Swal.fire("¡El registro se ha realizado con exito!");
    setTimeout(function() {
      window.location.href = "./pages/carrito.html";
    }, 2000);
  })
  .catch(error =>{
    console.error("Error en la solicitud:", error);
    Swal.fire("¡Algo ha ocurrido con el registro, intentalo de nuevo!");

  });
});

});

