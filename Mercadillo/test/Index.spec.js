import app from "../app";
import request from 'supertest'
 
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
       const responder =  await request(app).get('/').send()
     //  console.log(responder)
    })
})

describe('Get /Admin/Categorias', () => { 

    test('Debería responder con codigo 200',async()=>{
       const responder =  await request(app).get('/').send()
     //  console.log(responder)
    })
})