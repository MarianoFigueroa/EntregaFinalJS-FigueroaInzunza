function saludo() {
    alert("Bienvenido al registro");
  }
  
  saludo();
  
  function solicitudNombre() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let edad = parseInt(document.getElementById("edad").value);
    let contraseña = document.getElementById("contraseña").value;
  
    if (!isNaN(edad) && edad > 0) {
      if (edad < 18) {
        alert("No puede registrar. Necesita ser mayor de edad.");
      } else {
        alert("Su registro se ha completado exitosamente.");
      }
    } else {
      alert("Por favor, ingrese una edad válida mayor a 0.");
    }
  }
  
  
  
  
  document.getElementById("registrar").addEventListener("click", function() {
    solicitudNombre();
  }); 

// la configuracion del boton la tuve que construir buscando videos  //

