const idUsuario = 5;

async function eliminarUsuario(){
    try {
            const admin = await fetch(`http://localhost:3000/MercadilloBucaramanga/Usuario/${idUsuario}`,{
        method:"DELETE",
    });
    if (response.ok) {
        console.log(`Usuario con ID ${idUsuario} eliminado correctamente`);
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }
  

eliminarUsuario();