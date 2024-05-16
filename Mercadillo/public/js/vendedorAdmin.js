//const idUsuario = 5;
const btnModalEliminar = document.querySelector(".btnModalEliminar");
let notificacion = document.getElementById("notificacion");

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





const modalEliminar = new bootstrap.Modal(
  document.getElementById("eliminarModal")
);

function tiempoNotificacion() {
  setTimeout(() => {
    notificacion.classList.add("d-none");
    notificacion.textContent = "";
  }, 3000);
}

function notificacionExitosa(data) {
  notificacion.classList.remove("alert-danger", "d-none");
  notificacion.classList.add("alert-success", "d-block");
  notificacion.textContent = data.message;
}

function notificacionAlerta(data) {
  notificacion.classList.remove("alert-success", "d-none");
  notificacion.classList.add("alert-danger", "d-block");
  notificacion.textContent = data.message;
}

function eliminarUsuario(idUsuario,fila){

  btnModalEliminar.addEventListener("click",async()=>{
    desactivarModalEliminar();
    try {
      const response = await fetch(`http://localhost:3000/MercadilloBucaramanga/Admin/Usuarios/${idUsuario}`,{
      method:"DELETE",
  });

  let json = await response.json();

  if (response.ok) {
    fila.parentNode.removeChild(fila); //Elimina la fila
    notificacionExitosa(json) 
    tiempoNotificacion();
    } else {
      notificacionAlerta('Error al eliminar el usuario')
    }
  } catch (error) {
    notificacionAlerta('Error al realizar la solicitud:', error);
  }
  })
  }

  document.addEventListener("click", (e) => {
    // Verifica si el clic ocurrió en un elemento con la clase "btn-eliminar-usuario"
    if (e.target.classList.contains("btn-eliminar-usuario")) {
      const fila = e.target.parentNode.parentNode;
      const id = fila.firstElementChild.innerHTML;
      const nombreUsuario = fila.children[1].innerHTML;
      activarModalEliminar(id, nombreUsuario,fila);
    }
  });


  function activarModalEliminar(id, nombreUsuario,fila) {
    modalEliminar.show();
    eliminarModalLabel.textContent = `Está seguro de Eliminar Usuario ${nombreUsuario}`;
    eliminarUsuario(id,fila);
  }

  function desactivarModalEliminar() {
    modalEliminar.hide();
  }



  window.addEventListener("load", () => {
    let prueba = new DataTable(bodyTable, dataTablaOpciones)
      .order([0, "dec"])
      .draw();
  });
  
