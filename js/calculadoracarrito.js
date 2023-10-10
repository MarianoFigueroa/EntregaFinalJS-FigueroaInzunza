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
  new Producto("agujas", 50),
  new Producto("hilos", 200)
];

let valorTotal = 0; // con esta variable llevo el seguimiento del total de producto
const cantidadesProductos = {};

let cliente = prompt("¿Quieres comprar productos? (SI/NO)");

while (cliente.trim().toUpperCase() === "SI") {
  const seleccionProducto = prompt("Productos disponibles: lana, agujas, hilos. Elija solo un producto").toLowerCase();
  
  const productoSeleccionado = productos.find(producto => producto.nombre === seleccionProducto);

  if (productoSeleccionado) {
    const cantidad = parseInt(prompt(`¿Cuántos ${seleccionProducto} deseas comprar?`));

    if (!isNaN(cantidad) && cantidad >= 0) {
      if (!cantidadesProductos[seleccionProducto]) {
        cantidadesProductos[seleccionProducto] = 0;
      }
      
      cantidadesProductos[seleccionProducto] += cantidad;
      const costoProducto = cantidad * productoSeleccionado.precio;
      valorTotal += costoProducto; // el valor del producto se va actualizando aca
      alert(`Has agregado ${cantidad} ${seleccionProducto} a tu carrito. Total del producto: $${costoProducto}`);
    } else {
      alert("Cantidad no válida.");
    }
  } else {
    alert("Producto no válido.");
  }

  cliente = prompt("¿Quieres seguir comprando? (SI/NO)");
}

// muestra en el carrito el total de los productos. el total en el carrito
alert(`Total del valor de los productos en el carrito: $${valorTotal}`);

// Lo que quise poner acá fue una tabla con resultados, para que se refleje que operación se realizó y su respectivo resultad. También quise darle un valor a cada entidad "lana, agujas, hilos" pero se me resultó muy complejo. Por ahora me quedaré con esta tablita, hasta que más adelante pueda poner un botón en el html que detecte el producto y tenga un valor.

const tablaResultados = document.getElementById("tablaResultados");
const tbody = tablaResultados.querySelector("tbody");

if (valorTotal > 0) {
  const row = document.createElement("tr");
  const operacionCell = document.createElement("td");
  const resultadoCell = document.createElement("tbody");

  operacionCell.textContent = "Valor total de los productos";
  resultadoCell.textContent = `$${valorTotal}`;
  row.appendChild(operacionCell);
  row.appendChild(resultadoCell);
  tbody.appendChild(row);
}
// acá cree un boton para que luego de realizar todas las cuentas, filtre las cuentas de 550 o menores a ellas
const botonFiltro = document.getElementById("botonFiltro");

botonFiltro.addEventListener("click", function() {
  const valorFiltrado = parseFloat(prompt("Elije el valor para filtrar (550 o menos)"));
  if (!isNaN(valorFiltrado)) {
    const cuentasFiltradas = cuentas.filter(function (cuenta){
      return cuenta <= valorFiltrado;
    });

    tbody.innerHTML = "";

    cuentasFiltradas.forEach(function (cuenta){
      const row = document.createElement("tr");
      const operacionCell = document.createElement("td");
      const resultadoCell = document.createElement("td");

      operacionCell.textContent = "Filtrado";
      resultadoCell.textContent = cuenta;
      row.appendChild(operacionCell);
      row.appendChild(resultadoCell);
      tbody.appendChild(row);
    });
  } else {
    alert ("Ingrese un valor válido para comenzar el filtrado.")
  }
});