import { convertirUpperCamelCase } from "../js/upperCamelCase.js";
const categoria = document.querySelector(".select-categoria");
const selectDisponibilidad = document.querySelector(".select-disponibilidad");
const disponibilidad = document.querySelectorAll("#disponibilidad");
const fileInput = document.querySelector("#imagenProducto");
let archivo = fileInput.files[0];

const select = document.querySelectorAll("#categoria");
const url = "http://localhost:3000/MercadilloBucaramanga/Usuario/Productos/";
const bodyTable = document.querySelector("table");
const inputs = document.querySelectorAll(" #formulario input");
const textArea = document.querySelector(" #formulario textarea");

const btnModalEliminar = document.querySelector(".btnModalEliminar");
const eliminarModalLabel = document.querySelector("#eliminarModalLabel");
let notificacion = document.getElementById("notificacion");
let notificacionLlenarCampos = document.getElementById(
  "notificacionLlenarCampos"
);
let idFila;
let filaTabla;

const modalProducto = new bootstrap.Modal(
  document.getElementById("modalProducto")
);

const modalEliminar = new bootstrap.Modal(
  document.getElementById("eliminarModal")
);

const formProducto = document.querySelector("form");
let nombreProducto = document.querySelector("#nombreProducto");
const btnCrear = document.querySelector("#btn-crear");
let idCategoria;
let opcion = "";
let idForm = 0;

const dataTablaOpciones = {
  pageLength: 10,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún usuario encontrado",
    info: " _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún usuario encontrado",
    infoFiltered: "(filtrados desde _MAX_ registros totales)",
    search: "Buscar:",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior",
    },
  },
};

let campos = {
  nombreProducto: false,
  descripcionProducto: false,
  disponibilidad: false,
  precioProducto: false,
  presentacionProducto: false,
  imagen: false,
  selectCategoria: false,
};

const expresiones = {
  nombreProducto: /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
  categoria: "",
  disponibilidad: "",
  descripcionProducto: /^.{1,200}$/,
  presentacion: /^.{1,50}$/,
  precio: /^\d{20}$/,
};

// Manejar el evento de cambio en el select
let productoSeleccionado;
categoria.addEventListener("change", function () {
  // Obtener el índice de la opción seleccionada
  var selectedIndex = categoria.selectedIndex;

  // Obtener el texto de la opción seleccionada
  productoSeleccionado = categoria.options[selectedIndex].text;

  // Mostrar el texto seleccionado en la consola (puedes usarlo como necesites)
  console.log("Texto seleccionado:", productoSeleccionado);
});

// Manejar el evento de cambio en el select
let disponibilidadSeleccionado;
selectDisponibilidad.addEventListener("change", function () {
  // Obtener el índice de la opción seleccionada
  var selectedIndex = selectDisponibilidad.selectedIndex;
  // Obtener el texto de la opción seleccionada
  disponibilidadSeleccionado = selectDisponibilidad.options[selectedIndex].text;
  // Mostrar el texto seleccionado en la consola (puedes usarlo como necesites)
});

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombreProducto":
      validarCampo(expresiones.nombreProducto, e.target, "nombreProducto");
      break;
    case "descripcionProducto":
      validarCampo(
        expresiones.descripcionProducto,
        e.target,
        "descripcionProducto"
      );
      break;
    case "precio":
      validarCampo(expresiones.precio, e.target, "precio");
      break;
    case "presentacion":
      validarCampo(expresiones.presentacion, e.target, "presentacion");
      break;

    case "disponibilidad":
      if (e.target.value === expresiones.disponibilidad) {
        document
          .querySelector(`#grupo_disponibilidad .formulario__input-error`)
          .classList.add("formulario__input-error-activo");
        campos["disponibilidad"] = false;
      } else {
        document
          .querySelector(`#grupo_disponibilidad .formulario__input-error`)
          .classList.remove("formulario__input-error-activo");
        console.log(campos);
        campos["disponibilidad"] = true;
      }

      break;

    case "categoria":
      if (e.target.value === expresiones.categoria) {
        document
          .querySelector(`#grupo_categoria .formulario__input-error`)
          .classList.add("formulario__input-error-activo");
        campos["categoria"] = false;
      } else {
        document
          .querySelector(`#grupo_categoria .formulario__input-error`)
          .classList.remove("formulario__input-error-activo");
        console.log("aca nombre catalogo");
        console.log(campos);
        campos["categoria"] = true;
      }
      break;
  }
};

//Validar los campos Nombre-Apellido-Usuario-Email
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value.trim())) {
    //Verificar si cumple con al expresion regular
    document
      .querySelector(`#grupo_${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .querySelector(`#grupo_${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};
let idtextArea;
//asignmos el evento para cada input
inputs.forEach((input) => {
    console.log(input)
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

selectDisponibilidad.addEventListener("click", validarFormulario);
selectDisponibilidad.addEventListener("click", () => {
  disponibilidad.forEach((e) => {
    idtextArea = e.value;
    console.log(e.value);
  });
});

categoria.addEventListener("click", validarFormulario);
categoria.addEventListener("click", () => {
  select.forEach((e) => {
    idtextArea = e.value;
    console.log(e.value);
  });
});

function desactivarModalProducto() {
  modalProducto.hide();
}

function desactivarModalEliminar() {
  modalEliminar.hide();
}

function activarModalCategoria() {
  modalProducto.show();
}

function activarModalEliminar(nombreCategoria) {
  modalEliminar.show();
  eliminarModalLabel.textContent = `Esta seguro de Eliminar la categoria ${nombreCategoria}`;
}

btnCrear.addEventListener("click", () => {
  formProducto.reset();
  activarModalCategoria();
  campos["nombreProducto"] = false;
  campos["descripcionProducto"] = false;
  campos["disponibilidadProducto"] = false;
  campos["precioProducto"] = false;
  campos["presentacionProducto"] = false;
  campos["selectCategoria"] = false;

  notificacionLlenarCampos.innerHTML = ``;
  opcion = "crear";
});
