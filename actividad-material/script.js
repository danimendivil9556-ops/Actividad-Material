const formulario = document.querySelector("#formulario");
const nombre = document.querySelector("#nombre");
const lista = document.querySelector("#lista");
const contadorPendientes = document.querySelector("#contador-pendientes");
const contadorCompletadas = document.querySelector("#contador-completadas");
const mensaje = document.querySelector("#mensaje");
const vacio = document.querySelector("#vacio");
const btnEliminarCompletadas = document.querySelector("#btn-eliminar-completadas");

let siguienteId = 0;

function actualizarContadores() {
  const totalTareas = lista.children.length;
  const completadas = lista.querySelectorAll('input[type="checkbox"]:checked').length;
  const pendientes = totalTareas - completadas;

  contadorPendientes.textContent = `Pendientes: ${pendientes}`;
  contadorCompletadas.textContent = `Completadas: ${completadas}`;

  vacio.hidden = totalTareas > 0;
  btnEliminarCompletadas.hidden = completadas === 0;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = nombre.value.trim();

  if (texto === "") {
    mensaje.textContent = "Escribe el nombre de la tarea.";
    nombre.focus();
    return;
  }

  const tarea = document.createElement("li");
  tarea.className = "tarea";

  const casilla = document.createElement("input");
  casilla.type = "checkbox";
  casilla.id = `tarea-${++siguienteId}`;

  const etiqueta = document.createElement("label");
  etiqueta.htmlFor = casilla.id;
  etiqueta.textContent = texto;

  const btnEliminar = document.createElement("button");
  btnEliminar.type = "button";
  btnEliminar.className = "btn-eliminar";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.setAttribute("aria-label", `Eliminar tarea: ${texto}`);

  casilla.addEventListener("change", function () {
    tarea.classList.toggle("completada", casilla.checked);
    actualizarContadores();
  });

  btnEliminar.addEventListener("click", function () {
    tarea.remove();
    actualizarContadores();
    mensaje.textContent = "Tarea eliminada.";
  });

  tarea.append(casilla, etiqueta, btnEliminar);
  lista.append(tarea);

  formulario.reset();
  actualizarContadores();
  mensaje.textContent = "Tarea agregada correctamente.";
  nombre.focus();
});

btnEliminarCompletadas.addEventListener("click", function () {
  const tareasCompletadas = lista.querySelectorAll(".tarea.completada");
  tareasCompletadas.forEach(tarea => tarea.remove());
  actualizarContadores();
  mensaje.textContent = "Tareas completadas eliminadas.";
});