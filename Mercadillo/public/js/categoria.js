import { convertirUpperCamelCase } from "../js/upperCamelCase.js";
const catalogo = document.querySelector(".select-catalogo");
const select = document.querySelectorAll("#catalogo");
const url = "http://localhost:3000/MercadilloBucaramanga/Admin/Categorias/";
const bodyTable = document.querySelector("table");
const btnModalEliminar = document.querySelector(".btnModalEliminar");
const eliminarModalLabel = document.querySelector("#eliminarModalLabel");
let notificacion = document.getElementById("notificacion");
let notificacionLlenarCampos = document.getElementById("notificacionLlenarCampos")
const modalCategoria = new bootstrap.Modal(
  document.getElementById("modalCategoria")
);
const modalEliminar = new bootstrap.Modal(
  document.getElementById("eliminarModal")
);
const formCategoria = document.querySelector("form");
let nombreCategoria = document.querySelector("#categoria");
const btnCrear = document.querySelector("#btn-crear");

let idCatalogo;
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
  nombreDeCategoria: false,
  selectCatalogo: false,
};

const expresiones = {
  categoria: /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
  catalogo: "",
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "categoria":
      console.log(e.target.value.trim())
      if (!expresiones.categoria.test(e.target.value.trim())) {
        document
          .querySelector(`#grupocategoria .formulario__input-error`)
          .classList.add("formulario__input-error-activo");
          campos['nombreDeCategoria']= false;
      } else {
        document
          .querySelector(`#grupocategoria .formulario__input-error`)
          .classList.remove("formulario__input-error-activo");
          console.log("aca nombre categoria")
          console.log(campos)
          campos['nombreDeCategoria']= true;
      }
      
      break;
    case "catalogo":
      if (e.target.value === expresiones.catalogo) {
        document
          .querySelector(`#grupocatalogo .formulario__input-error`)
          .classList.add("formulario__input-error-activo");
          campos['selectCatalogo'] = false;
      } else {
        document
          .querySelector(`#grupocatalogo .formulario__input-error`)
          .classList.remove("formulario__input-error-activo");
          console.log("aca nombre catalogo")
          console.log(campos)
          campos['selectCatalogo'] = true;
      }
      break;
  }
};

/*Validar el input nombre categoria*/
nombreCategoria.addEventListener("keyup", validarFormulario);
nombreCategoria.addEventListener("click", validarFormulario);
catalogo.addEventListener("click", validarFormulario);

catalogo.addEventListener("click", () => {
  select.forEach((e) => {
    idCatalogo = e.value;
  });
});

btnCrear.addEventListener("click", () => {
  formCategoria.reset();
  activarModalCategoria();
  campos['selectCatalogo'] = false;
  campos['nombreDeCategoria'] = false;
  notificacionLlenarCampos.innerHTML = ``;
  opcion = "crear";
});

function eliminarUsuario(id) {
  btnModalEliminar.addEventListener("click", () => {
    desactivarModalEliminar();
    fetch(url + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        notificacionExitosa(data);
        tiempoNotificacion();
      })
      .catch((error) => {
        notificacionAlerta(error);
      });
  });
}

function activarModalEliminar(id, nombreCategoria) {
  modalEliminar.show();
  eliminarModalLabel.textContent = `Esta seguro de Eliminar la categoria ${nombreCategoria}`;
  eliminarUsuario(id);
}

function desactivarModalEliminar() {
  modalEliminar.hide();
}

function activarModalCategoria() {
  
  if(nombreCategoria.value != "" && catalogo.value != ""){
    campos['nombreDeCategoria'] = true;
    campos['selectCatalogo'] = true;
  }
  modalCategoria.show();
}
function desactivarModalCategoria() {
  modalCategoria.hide();
}

function notificacionAlerta(data) {
  notificacion.classList.remove("alert-success", "d-none");
  notificacion.classList.add("alert-danger", "d-block");
  notificacion.textContent = data.message;
}

function notificacionExitosa(data) {
  notificacion.classList.remove("alert-danger", "d-none");
  notificacion.classList.add("alert-success", "d-block");
  notificacion.textContent = data.message;
}

function tiempoNotificacion() {
  setTimeout(() => {
    location.reload();
    notificacion.classList.add("d-none");
    notificacion.textContent = "";
  }, 2000);
}

const on = (elemento, evento, selector, funcion) => {
  elemento.addEventListener(evento, (e) => {
    if (e.target.className === selector) {
      funcion(e);
    }
  });
};

on(document, "click", "btn-eliminar-usuario", (e) => {
  const fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  const nombreCategoria = fila.children[1].innerHTML;
  activarModalEliminar(id, nombreCategoria);
});

on(document, "click", "btn-actualizar-usuario", (e) => {
  const fila = e.target.parentNode.parentNode;
  idForm = fila.children[0].innerHTML; //traer el indice de la tabla

  nombreCategoria.value = fila.children[1].innerHTML; //traer la categoria de la tabla
  for (let i = 0; i < catalogo.options.length; i++) {
    //seleccionar el catalogo dependiendo la fila
    if (catalogo.options[i].text === fila.children[2].innerHTML) {
      // Establecer la opción como seleccionada en el form
      catalogo.selectedIndex = i;
      break;
    }
  }
  opcion = "actualizar";
  activarModalCategoria();
});



function actualizarOCrear(){
  if (opcion == "crear") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nombre: convertirUpperCamelCase(nombreCategoria.value).trim(),
        id_Cat: parseInt(catalogo.value),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error(
              `Categoria ${nombreCategoria.value} ya se encuentra registrada`
            );
          } else {
            throw new Error("La solicitud no fue exitosa");
          }
        }
        return response.json();
      })
      .then((data) => {
        notificacionExitosa(data);
        tiempoNotificacion();
      })
      .catch((error) => {
        notificacionAlerta(error);
      });
  }
  if (opcion == "actualizar") {
    fetch(url + idForm, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nombre: convertirUpperCamelCase(nombreCategoria.value).trim(),
        id_Cat: parseInt(catalogo.value),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error(`Categoria ${nombreCategoria.value} ya existe`);
          } else {
            throw new Error("La solicitud no fue exitosa");
          }
        }
        return response.json();
      })
      .then((data) => {
        notificacionExitosa(data);
        tiempoNotificacion();
      })
      .catch((error) => {
        notificacionAlerta(error);
      });
  }
}

formCategoria.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(campos.nombreDeCategoria)
  if(campos.nombreDeCategoria && campos.selectCatalogo ){
    actualizarOCrear();
    desactivarModalCategoria();
  }else{
    notificacionLlenarCampos.classList.remove("d-none");
    notificacionLlenarCampos.classList.add("alert-danger","d-block");
    notificacionLlenarCampos.innerHTML = `Debe llenar todos los campos`;
  }
});

window.addEventListener("load", () => {
  let prueba = new DataTable(bodyTable, dataTablaOpciones)
    .order([0, "dec"])
    .draw();
});
