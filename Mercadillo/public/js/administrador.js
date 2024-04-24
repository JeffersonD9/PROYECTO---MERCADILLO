
async function admin(){

    const admin = await fetch("http://localhost:3000/MercadilloBucaramanga/Admin",{
        method:"GET",
        headers:{
        "Content-type":"application/json"
        }
    });
}

admin();