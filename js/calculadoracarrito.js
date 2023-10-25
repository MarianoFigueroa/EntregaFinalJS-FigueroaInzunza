function saludo() {
  alert("Bienvenido a la sección de compras");
}

saludo();

function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

const productos = [
  new Producto("lana", 300),
  new Producto("hilos", 200),
  new Producto("agujas", 50)
];

let valorTotal = 0;
let cantidadesProductos = {};
const productosAgregados = [];

document.addEventListener("DOMContentLoaded", function() {
  // Cargar los detalles de productos desde el almacenamiento local si existen
  const productosGuardados = JSON.parse(localStorage.getItem("productosGuardados"));
  if (productosGuardados) {
    productosAgregados.push(...productosGuardados);
    actualizarTabla();
  }

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

        button.textContent = `Comprar (${cantidadesProductos[producto]}`;
        alert(`Has agregado ${cantidad} ${producto} a tu carrito. Total del producto: $${costoProducto}`);

        // Actualizar la tabla y guardar los detalles de productos en el almacenamiento local
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
      button.textContent = `Comprar (0)`;
    });

    actualizarTabla();
    localStorage.removeItem("productosGuardados");
  });

  function actualizarTabla() {
    // no se si se puede mejorar alguna codificacion del storage
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


