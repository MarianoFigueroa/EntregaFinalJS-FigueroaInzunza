Swal.fire({
  icon: "info",
  title: "Bienvenido a la Tienda",
  text: "Regístrese para tener una mejor experiencia, si ya está registrado inicie sesión.",
  footer: '<a href="../inicio.html">Ir a Registro</a>'
});

function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

const productos = [
  new Producto("lana", 500),
  new Producto("hilos", 350),
  new Producto("agujas", 100),
  new Producto("agujastejer", 200),
  new Producto("maquinacoser", 2000),
  new Producto("telajean", 300),
  new Producto("telanotejida", 250),
  new Producto("hilosisal", 100),
  new Producto("telasweater", 400),
  new Producto("relleno", 125)
];

let valorTotal = 0;
let cantidadesProductos = {};
const productosAgregados = [];

const tiempoDeInactividad = 300000;
let timeoutID;

document.addEventListener("DOMContentLoaded", function () {
  const productosGuardados = JSON.parse(localStorage.getItem("productosGuardados")) || [];
  productosAgregados.push(...productosGuardados);
  actualizarTabla();

  const comprarBotones = document.querySelectorAll(".comprar");
  const cantidadInputs = document.querySelectorAll(".cantidad-input");

  comprarBotones.forEach((button, index) => {
    button.addEventListener("click", function () {
      const producto = button.getAttribute("data-producto");
      const precio = parseInt(button.getAttribute("data-precio"));
      const cantidad = parseInt(cantidadInputs[index].value);

      if (!isNaN(cantidad) && cantidad >= 0) {
        if (!cantidadesProductos[producto]) {
          cantidadesProductos[producto] = 0;
        }

        cantidadesProductos[producto] += cantidad;
        const costoProducto = cantidad * precio;
        valorTotal += costoProducto;

        productosAgregados.push({
          producto: producto,
          cantidad: cantidad,
          total: costoProducto
        });
        actualizarTabla();
        resetearTemporizador();
      } else {
        alert("Cantidad no válida.");
      }
    });
  });

  const borrarCarritoButton = document.getElementById("borrarCarrito");
  borrarCarritoButton.addEventListener("click", function () {
    valorTotal = 0;
    cantidadesProductos = {};
    productosAgregados.length = 0;

    comprarBotones.forEach(button => {
      const producto = button.getAttribute("data-producto");
      button.textContent = "Comprar";
    });

    actualizarTabla();
    localStorage.removeItem("productosGuardados");
    resetearTemporizador();
  });

  const finalizarCarritoBoton = document.getElementById("finalizarCarrito");
  finalizarCarritoBoton.addEventListener("click", function () {
    const totalGasto = valorTotal;
    valorTotal = 0;
    cantidadesProductos = {};
    productosAgregados.length = 0;

    comprarBotones.forEach(button => {
      const producto = button.getAttribute("datos-del-producto");
      button.textContent = "Comprar";
    });

    actualizarTabla();
    localStorage.removeItem("productosGuardados");
    resetearTemporizador();

    Swal.fire({
      icon: "success",
      title: "Su compra se ha finalizado.",
      text: "Has gastado un total de $" + totalGasto + ". ¡Gracias por confiar, vuelva pronto!"
    });
  });

  function actualizarTabla() {
    mostrarTabla();
    localStorage.setItem("productosGuardados", JSON.stringify(productosAgregados));
  }

  function mostrarTabla() {
    const resultadoTabla = document.getElementById("resultadoTabla");
    resultadoTabla.innerHTML = "";

    productosAgregados.forEach((producto, index) => {
      const row = document.createElement("tr");
      const productoCell = document.createElement("td");
      const cantidadCell = document.createElement("td");
      const totalCell = document.createElement("td");
      const eliminarCell = document.createElement("td");

      productoCell.textContent = producto.producto;
      cantidadCell.textContent = producto.cantidad;
      totalCell.textContent = "$${producto.total}";

      const eliminarButton = document.createElement("button");
      eliminarButton.textContent = "Eliminar";
      eliminarButton.addEventListener("click", function () {
        eliminarProducto(index);
      });

      eliminarCell.appendChild(eliminarButton);

      row.appendChild(productoCell);
      row.appendChild(cantidadCell);
      row.appendChild(totalCell);
      row.appendChild(eliminarCell);

      resultadoTabla.appendChild(row);
    });
  }

  function eliminarProducto(index) {
    const productoEliminado = productosAgregados.splice(index, 1)[0];
    valorTotal -= productoEliminado.total;
    cantidadesProductos[productoEliminado.producto] -= productoEliminado.cantidad;

    actualizarTabla();
    resetearTemporizador();
  }

  function resetearTemporizador() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      valorTotal = 0;
      cantidadesProductos = {};
      productosAgregados.length = 0;

      comprarBotones.forEach(button => {
        const producto = button.getAttribute("data-producto");
        button.textContent = "Comprar ";
      });

      actualizarTabla();
      localStorage.removeItem("productosGuardados");
    }, tiempoDeInactividad);
  }
});
