// Selecciona el botón de hamburguesa
const btn = document.querySelector(".menu-toggle");

// Selecciona el menú horizontal
const menu = document.querySelector(".menu-horizontal");

// Al hacer clic en el botón de hamburguesa
btn.addEventListener("click", () => {
  // Alterna (agrega o quita) la clase "active" en el menú
  // Esto hace que se muestre o se oculte
  menu.classList.toggle("active");

  // (opcional) También puedes alternar una clase en el botón si quieres cambiar su apariencia
  // btn.classList.toggle("open");
});

// Evento al enviar el formulario de contacto
/*
document
  .getElementById("formularioContacto")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío real del formulario

    // Muestra el mensaje de confirmación
    const mensaje = document.getElementById("mensajeEnviado");
    mensaje.style.display = "block";

    // Opcional: limpiar el formulario
    this.reset();

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      mensaje.style.display = "none";
    }, 5000);
  });*/

// VALIDACION DE FORMULARIO
const form = document.querySelector('form[name="frm"]');
form.addEventListener("submit", (event) => {
  const fnombres = form.elements["nombres"].value;
  const fapellidos = form.elements["apellidos"].value;
  const femail = form.elements["email"].value;
  const ftelefono = form.elements["telefono"].value;

  if (!fnombres || !fapellidos || !femail || !ftelefono) {
    event.preventDefault();
    alert("Por favor, complete todos los campos del formulario");
  } else if (!validateEmail(femail)) {
    event.preventDefault();
    alert("Por favor, ingrese un correo valido");
  } else {
    const confirmation = confirm(
      "Esta a punto de enviar el formulario, ¿Desea Continuar?"
    );
    if (!confirmation) {
      event.preventDefault();
    }
  }
});

//CREAR FUNCION validateEmail(femail)
function validateEmail(femail) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(femail).toLowerCase());
}

// Lista global
let estudiantes = [];
// Evento del formulario
document.getElementById("notaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Obtener datos
  const codigo = document.getElementById("code").value.trim();
  const nombres = document.getElementById("name").value.trim();
  const apellidos = document.getElementById("lastname").value.trim();
  const curso = document.getElementById("course").value;
  const notaStr = document.getElementById("note").value;
  const nota = Number(notaStr);
  // Validación
  if (
    codigo === "" ||
    nombres === "" ||
    apellidos === "" ||
    curso === "" ||
    notaStr === "" ||
    isNaN(nota) ||
    nota < 0 ||
    nota > 20
  ) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }
  // Agregar alumno
  const nuevo = { codigo, nombres, apellidos, curso, nota };
  estudiantes.push(nuevo);
  // Orden descendente
  estudiantes.sort((a, b) => b.nota - a.nota);
  // Mostrar resultado
  mostrarRanking();
  // Limpiar formulario
  this.reset();
});
// Mostrar lista ordenada con barra
function mostrarRanking() {
  const lista = document.getElementById("listaEstudiantes");
  lista.innerHTML = "";
  estudiantes.forEach((est) => {
    const li = document.createElement("li");
    li.className = "barra-progreso";
    const barra = document.createElement("div");
    barra.className = "progreso";
    barra.style.width = `${(est.nota / 20) * 100}%`;
    const texto = document.createElement("span");
    texto.textContent = `${est.nombres} ${est.apellidos} (${est.curso}) – Nota: ${est.nota}`;
    li.appendChild(barra);
    li.appendChild(texto);
    lista.appendChild(li);
  });
}
