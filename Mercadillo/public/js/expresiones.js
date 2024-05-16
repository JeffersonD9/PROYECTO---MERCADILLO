export const expresiones = {
    username: /^[a-zA-Z0-9_\-]{4,30}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{10,20}$/, // 4 a 20 digitos.
    celular: /^3\d{9}$/, // 4 a 20 digitos.
    email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
  };



  export function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]*)');
    return cookieValue ? cookieValue.pop() : null;
    }