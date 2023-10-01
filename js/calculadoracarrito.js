function saludo() {
  alert("Bienvenido a la sección de compras");
}

saludo();

function mostrador() {
  alert("Los productos que tenemos para ofrecer son: Lana $300, Hilos $200 y agujas $50");
}

mostrador();

let cliente = prompt("¿Quieres sumar tus productos?");
const operaciones = [];
const cuentas = [];

while (cliente.trim().toUpperCase() === "SI") {
  const productouno = parseFloat(prompt("Si va a comprar lana ingrese 300, si no 0"));
  const calculo = prompt("Indique el símbolo de operación (+ o -) para proceder");
  const productodos = parseFloat(prompt("Si va a comprar hilos ingrese 200, si no 0"));
  const productotres = parseFloat(prompt("Si va a comprar agujas ingrese 50, si no 0"));

  let resultado = NaN;
  switch (calculo.trim()) {
    case "+":
      resultado = productouno + productodos + productotres;
      break;
    case "-":
      resultado = productouno - productodos - productotres;
      break;
    default:
      alert("Indique el símbolo de operación (+ o -) para proceder");
      break;
  }
  
  if (!isNaN(resultado)) {
    alert("El resultado de la operación es " + resultado);
    operaciones.push({ operacion: calculo, resultado });

    cuentas.push(resultado);
  } else {
    alert("Algo ha salido mal, no se pudo realizar la operación");
  }

  cliente = prompt("¿Quieres sumar productos?");
}

alert("Gracias por usar la calculadora de productos.");

// hice un Array que muestra las cuentas de todas las operaciones que s ehicieron
console.log("Las cuentas que se realizaron:", cuentas);

// Lo que quise poner acá fue una tabla con resultados, para que se refleje que operación se realizó y su respectivo resultad. También quise darle un valor a cada entidad "lana, agujas, hilos" pero se me resultó muy complejo. Por ahora me quedaré con esta tablita, hasta que más adelante pueda poner un botón en el html que detecte el producto y tenga un valor.
if (operaciones.length > 0) {
  const tablaResultados = document.getElementById("resultadoTabla");
  const tbody = document.createElement("tbody");

  operaciones.forEach((item) => {
    const { operacion, resultado } = item;
    const row = document.createElement("tr");
    const operacionCell = document.createElement("td");
    const resultadoCell = document.createElement("td");

    operacionCell.textContent = operacion;
    resultadoCell.textContent = resultado;

    row.appendChild(operacionCell);
    row.appendChild(resultadoCell);

    tbody.appendChild(row);
  });

  tablaResultados.appendChild(tbody);
  tablaResultados.style.display = "block";
}
// acá cree un boton para que luego de realizar todas las cuentas, filtre las cuentas de 550 o menores a ellas
const botonFiltro = document.getElementById("botonFiltro")

botonFiltro.addEventListener("click", function() {
  const valorFiltrado = parseFloat(prompt("Elije el valor para filtrar (550 o menos)"));
  if (!isNaN(valorFiltrado)) {
    const cuentasFiltradas = cuentas.filter(function (cuenta){
      return cuenta <= valorFiltrado;
    });

    const tbody = document.querySelector ("#resultadoTabla tbody");
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
    alert ("Ingrese un valor valido para comenzar el filtrado.")
  }
});