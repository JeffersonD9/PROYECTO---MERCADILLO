console.log("Desde el public js");

const usuarioRegistro = document.querySelector("[data-registro]");

async function registrarUsuario(evento) {
  evento.preventDefault();
  console.log(evento, "Esto es un evento");
  let Nombres = document.getElementById("Nombres").value;
  let Apellidos = document.getElementById("Apellidos").value;
  let UserName = document.getElementById("UserName").value;
  let Email = document.getElementById("Email").value;
  let Password = document.getElementById("Password").value;
  let usuarioRegistrado = document.getElementById("usuarioRegistrado")

  
  try {
    const registroFetch = await fetch("http://localhost:3000/MercadilloBucaramanga/Registrar", {
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
    });

    const respuesta = await registroFetch.json();

    console.log("Respuesta del servidor:", respuesta);
    usuarioRegistrado.innerHTML = `${respuesta.error.message}`

    if (!registroFetch.ok) {
      throw new Error("No fue posible enviar los datos");
    }
    
    
  } catch (error) {
    console.error("Error al intentar registrar:", error.message);
  }
}

usuarioRegistro.addEventListener("submit", (evento) =>
  registrarUsuario(evento)
);

