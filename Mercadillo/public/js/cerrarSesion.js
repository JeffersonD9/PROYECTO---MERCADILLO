console.log("interfaz Admin");


const cerrarSesion = document.querySelector("#cerrar-sesion");
cerrarSesion.addEventListener("click",async(e)=>{
    e.preventDefault();
    const cerrar = await fetch("http://localhost:3000/MercadilloBucaramanga/LogOut",{
        method: "POST",
        headers: {
          "Content-type": "application/json",
        }
      }
    );

   
    const jsonCerrar = await cerrar.json();
    console.log(jsonCerrar);
    document.location.href = jsonCerrar.redirect;
})