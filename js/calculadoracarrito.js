function saludo() {
  alert("Bienvenido a la sección de compras");
}

saludo();

function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

const productos = [
  new Producto("lana", 500),
  new Producto("hilos", 350),
  new Producto("agujas", 100)
];

let valorTotal = 0;
let cantidadesProductos = {};
const productosAgregados = [];

document.addEventListener("DOMContentLoaded", function () {
  const productosGuardados = JSON.parse(localStorage.getItem("productosGuardados")) || [];
  productosAgregados.push(...productosGuardados);
  actualizarTabla();

  const comprarBotones = document.querySelectorAll(".comprar");
  const cantidadInputs = document.querySelectorAll(".cantidad-input");

  comprarBotones.forEach((button, index) => {
    button.addEventListener("click", function() {
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
        alert(`Has agregado ${cantidad} ${producto} a tu carrito. Total del producto: $${costoProducto}`);
        actualizarTabla();
      } else {
        alert("Cantidad no válida.");
      }
    });
  });

  const borrarCarritoButton = document.getElementById("borrarCarrito");
  borrarCarritoButton.addEventListener("click", function() {
    valorTotal = 0;
    cantidadesProductos = {};
    productosAgregados.length = 0;

    comprarBotones.forEach(button => {
      const producto = button.getAttribute("data-producto");
    });

    actualizarTabla();
    localStorage.removeItem("productosGuardados");
  });

  function actualizarTabla() {
    mostrarTabla();
    localStorage.setItem("productosGuardados", JSON.stringify(productosAgregados));
  }

  function mostrarTabla() {
    const resultadoTabla = document.getElementById("resultadoTabla");
    resultadoTabla.innerHTML = '';

    productosAgregados.forEach(producto => {
      const row = document.createElement("tr");
      const productoCell = document.createElement("td");
      const cantidadCell = document.createElement("td");
      const totalCell = document.createElement("td");

      productoCell.textContent = producto.producto;
      cantidadCell.textContent = producto.cantidad;
      totalCell.textContent = `$${producto.total}`;

      row.appendChild(productoCell);
      row.appendChild(cantidadCell);
      row.appendChild(totalCell);

      resultadoTabla.appendChild(row);
    });
  }
});


