document.getElementById("iniciarSesion").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const contrasena = document.getElementById("contraseña").value.trim();

  fetch(`https://jsonplaceholder.typicode.com/todos/1?email=${email}&contrasena=${contrasena}`)
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del servidor:", data);
      if (data.id) {
        Swal.fire("Inicio de sesión exitoso");
        window.location.href = "./iniciarsesion.html";
      } else {
        Swal.fire("Credenciales incorrectas");
      }
    })
    .catch(error => {
      console.error("Error al realizar la solicitud:", error);
      Swal.fire({
        title: "Hubo un error",
        text: "Intente iniciar sesión nuevamente o contactenos via info@gmail.com",
        icon: "error"
      });
    });
});