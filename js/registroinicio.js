
document.getElementById("registrar").addEventListener("click", function () {
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const contrasena = document.getElementById("contraseña").value.trim();

  if (validarCampos(nombre, apellido, email, telefono, contrasena)) {
    const datosUsuario = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      contrasena: contrasena
    };

    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosUsuario)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Respuesta del servidor:", data);
        Swal.fire("¡Se ha registrado exitosamente!");
        window.location.href = "./iniciarsesion.html";
      })
      .catch(error => {
        console.error("Error al realizar la solicitud:", error);
        Swal.fire({
          title: "Hubo un error",
          text: "Intente rellenar los campos nuevamente, si no puede contactenos via info@gmail.com",
          icon: "error"
        });
      });
  } else {
    Swal.fire("Debe completar todos los campos del registro");
  }
});

function validarCampos(nombre, apellido, email, telefono, contrasena) {
  return nombre && apellido && email && telefono && contrasena;
}