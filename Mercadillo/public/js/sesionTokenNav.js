const usuario = document.querySelector("#usuario")
const sesion = document.querySelector("#sesion")
const miEnlaceUsuario = document.querySelector("#miEnlaceUsuario")
const cerrar = document.querySelector("#cerrar-sesion")

function getCookie(name) {
const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]*)');
return cookieValue ? cookieValue.pop() : null;
}

const token = getCookie("token");
function isTokenExpired (token){

if(!token){
  usuario.textContent = "Ingresar"
  sesion.textContent = "Registrarse"
  miEnlaceUsuario.href = "/MercadilloBucaramanga/Login"
}else{
  const arrayToken = token.split('.')
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  usuario.textContent = tokenPayload.userName
  sesion.textContent = "Cerrar Sesion"
  console.log(tokenPayload)

  if(tokenPayload.role === 1){
    miEnlaceUsuario.href = "/MercadilloBucaramanga/Vendedor";
  }else if(tokenPayload.role === 2){
    miEnlaceUsuario.href = "/MercadilloBucaramanga/Admin";
  }
}
}

isTokenExpired(token);
