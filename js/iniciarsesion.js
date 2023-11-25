document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("iniciarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    
    var email = document.getElementById("emailInicio").value.trim();
    var contrasena = document.getElementById("contrasenaInicio").value.trim();

    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      const usuarioEncontrado = users.find(user => user.email === email && user.website === contrasena);
      
      if (usuarioEncontrado) {
        console.log("¡Se ha iniciado sesion con exito!", usuarioEncontrado);
      } else {
        console.log("¡Algo ha ocurrido, verifique los datos!");
      }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
    });
});
});