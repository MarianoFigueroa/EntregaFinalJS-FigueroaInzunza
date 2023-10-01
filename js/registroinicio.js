function saludo() {
    alert("Bienvenido a la sección de compras");
  }
  
  saludo();

  let cliente = prompt("¿Quieres sumar tus productos?");
  while (cliente.trim().toUpperCase() === "SI") {
    const productouno = parseFloat(prompt("Ingrese el precio del primer producto"));
    const calculo = prompt("Indique el símbolo de operación (+ o -) para proceder");
    const productodos = parseFloat(prompt("Ingrese el precio del segundo producto")
    );
  let resultado = NaN;
  switch (calculo.trim()) {
    case "+":
      resultado = sumar(productouno, productodos);
      break;
    case "-":
      resultado = restar(productouno, productodos);
      break;
    default:
      alert("Indique el símbolo de operación (+ o -) para proceder");
      break;
  }
  if (!isNaN(resultado)) {
    alert(
      "El resultado de sus productos es " + resultado);
  } else {
    alert("Algo ha salido mal, no se pudo realizar la operación");
  }

  cliente = prompt("¿Quieres sumar productos?"); 
}

alert("Gracias por usar la calculadora de productos, vuelva pronto.");
// no entiendo por que no me aparece el alert con el resultado