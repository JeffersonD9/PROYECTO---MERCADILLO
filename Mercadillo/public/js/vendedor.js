async function vendedor(){
    const admin = await fetch("http://localhost:3000/MercadilloBucaramanga/Usuario",{
        method:"GET",
        headers:{
        "Content-type":"application/json"
        }
    });
}

vendedor();