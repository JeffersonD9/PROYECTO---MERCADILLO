const usuario = document.querySelector("#usuario")
const sesion = document.querySelector("#sesion")
const miEnlaceUsuario = document.querySelector("#miEnlaceUsuario")


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
  console.log(miEnlaceUsuario.href)
}else{
  const arrayToken = token.split('.')
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  usuario.textContent = tokenPayload.UserName
  sesion.textContent = "Cerrar Sesion"
  

  if(tokenPayload.role === 1){
    miEnlaceUsuario.href = "/MercadilloBucaramanga/Vendedor";
  }
  if(tokenPayload.role === 2){
    
    miEnlaceUsuario.href = "/MercadilloBucaramanga/Admin";
    console.log(" a c asdasdsa",miEnlaceUsuario.href, " aca")
  }
}
}

isTokenExpired(token);
