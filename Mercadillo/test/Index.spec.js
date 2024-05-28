import app from "../app";
import request from 'supertest'
 
//TESTING DE ROUTINGS GET 

describe('POST /Login', () => { 

    test('Debería responder con codigo 200',async()=>{
       const responder =  await request(app).get('/MercadilloBucaramanga/Login').send()
     // console.log(responder)
    })
})

describe('POST /Register', () => { 

    test('Debería responder con codigo 200',async()=>{
       const responder =  await request(app).get('/MercadilloBucaramanga/Registrar').send()
       //console.log(responder)
    })
})

describe('Get /Admin', () => { 

    test('Debería responder con codigo 200',async()=>{
       const responder =  await request(app).get('/MercadilloBucaramanga/Admin').send()
     //  console.log(responder)
    })
})


describe('Get /Usuario', () => { 

    test('Debería responder con codigo 200',async()=>{
       const responder =  await request(app).get('/MercadilloBucaramanga/Usuario').send()
     //  console.log(responder)
    })
})

describe('Get /Admin/Categorias', () => { 

    test('Debería responder con codigo 200',async()=>{
       const responder =  await request(app).get('/MercadilloBucaramanga/Admin/Categorias').send()
     //  console.log(responder)
    })
})

//TESTING ROUTING POST

describe('Post /Admin', () => { 

    test('Debería responder con codigo 404',async()=>{
       const responder =  await request(app).post('/MercadilloBucaramanga/Admin').send()
     //  console.log(responder)
    })
})

describe('Post /Admin', () => { 

    test('Debería responder con codigo 404',async()=>{
       const responder =  await request(app).post('/MercadilloBucaramanga/Usuario').send()
     //  console.log(responder)
    })
})