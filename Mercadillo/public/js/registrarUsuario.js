const formulario = document.querySelector("#formulario");
const inputs = document.querySelectorAll(" #formulario input");
let notificacion = document.getElementById("notificacion");

const expresiones = {
  username: /^[a-zA-Z0-9_\-]{4,30}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,20}$/, // 4 a 20 digitos.
  email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
};

const campos = {
  username: false,
  nombre: false,
  password: false,
  email: false,
  apellido: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "username":
      validarCampo(expresiones.username, e.target, "username");
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      break;
  }
};

function agregarIconoCorrecto(campo){
  document.getElementById(`grupo_${campo}`).classList.remove('icono-error');
  document.querySelector(`#grupo_${campo}`).classList.add('icono-correcto');
  document.querySelector(`#grupo_${campo}  i`).classList.add('bi-check-circle-fill');
  document.querySelector(`#grupo_${campo}  i`).classList.remove('bi-x-circle-fill');
}
function agregarIconoError(campo){
  document.getElementById(`grupo_${campo}`).classList.remove('icono-correcto');
  document.querySelector(`#grupo_${campo}`).classList.add('icono-error');
  document.querySelector(`#grupo_${campo}  i`).classList.add('bi-x-circle-fill');
  document.querySelector(`#grupo_${campo}  i`).classList.remove('bi-check-circle-fill');
}

//Validar los campos Nombre-Apellido-Usuario-Email
const validarCampo = (expresion, input, campo) => {
  if (expresion.test((input.value).trim())) { //Verificar si cumple con al expresion regular
    
    document
      .querySelector(`#grupo_${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
      agregarIconoCorrecto(campo) //Agregamos el icono check
      campos[campo] = true;  
  } else {
    document
      .querySelector(`#grupo_${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
      agregarIconoError(campo);//Agregamos el icono x
      campos[campo] = false;
  }
};



//asignmos el evento para cada input
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});


//Funcion para registrar los usuarios
async function registrarUsuario(e) {
  e.preventDefault();
  let Nombres = (document.getElementById("nombre").value).trim();
  let Apellidos = (document.getElementById("apellido").value);
  let UserName = (document.getElementById("username").value).trim();
  let Email = (document.getElementById("email").value).trim();
  let Password = (document.getElementById("password").value).trim();
  
  try {
    const registroFetch = await fetch(
      "http://localhost:3000/MercadilloBucaramanga/Registrar",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          Nombres,
          Apellidos,
          UserName,
          Email,
          Password,
        }),
      }
    );
    let json = await registroFetch.json();
    if (registroFetch.ok) { //si los datos fueron enviados correctamente
      notificacion.classList.remove("alert-danger" ,"d-none")
      notificacion.classList.add("alert-success","d-block");

      notificacion.textContent = "Usuario Registrado"; //mostramos en la vista

      formulario.reset(); //Eliminar los valores del formulario
      document.querySelectorAll('.icono-correcto').forEach((icono) => {
        icono.classList.remove('icono-correcto'); //eliminar la clase
      });

      setTimeout(() => {
        notificacion.classList.add("d-none");
        notificacion.textContent = "";

        window.location.href = json.redirect;


      }, 2000);

    } else { //si el usuario no se registró correctamente
      notificacion.classList.remove("alert-success","d-none")
      notificacion.classList.add("alert-danger","d-block");
      notificacion.textContent = `${json.error.message}`;

      //agregar el icono error para el usuario o email
      if(json.error.details === "Usuario_UserName_key"){
        agregarIconoError("username")
      }
      if(json.error.details === "Usuario_Email_key"){
        agregarIconoError("email")
      }
    }
  } catch (error) {
    notificacion.textContent = `${error}`;
  }
}

//Evento cuando se da click en el boton registrar
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  //Validamos que los campos se encuentre llenos
  if(campos.username && campos.nombre && campos.password && campos.email && campos.apellido ){
    registrarUsuario(e);
  }else{ //inputs no llenados
    notificacion.classList.remove("d-none");
    notificacion.classList.add("alert-danger","d-block");
    notificacion.innerHTML = `Debe llenar todos los campos`;
   
    inputs.forEach(e=>{
        let prueba = document.querySelector(`#grupo_${e.name}`);
        if(!prueba.classList.contains("icono-correcto")){
          agregarIconoError(e.name);
        };
    })
  }
});
