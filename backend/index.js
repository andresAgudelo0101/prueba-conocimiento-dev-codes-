const express=require("express");
const app=express()
const mysql=require("mysql")
const cors=require("cors");


app.use(cors())
app.use(express.json())

//configuracion base de datos
const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'api_rest'
});

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("conexion establecida con la base de datos")
    }
})

//consultas
app.get('/productos',(req,res)=>{
    db.query("SELECT * FROM `producto` ",
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({productos:result})
        }
    }
    )
})

app.post('/consultarMatricula',(req,res)=>{
    const matricula=req.body.matricula;
    const consulta=`SELECT * FROM garantia_producto WHERE codigo_producto="${matricula}" `

    db.query(consulta,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({respuesta:result})
        }
    })
})

app.post('/newProductoGarantia',(req,res)=>{
    const precio_producto=req.body.precio_producto;
    const fecha_solicitud=req.body.fecha_solicitud;
    const fecha_fin=req.body.fecha_fin;
    const precio_garantia=req.body.precio_garantia;
    const codigo_prod=req.body.codigo_prod;
    const consulta="INSERT INTO garantia_producto (`precio_producto`, `fecha_solicitud_garantia`, `fecha_fin_garantia`, `precio_garantia`, `codigo_producto`) VALUES (?,?,?,?,?)"

    db.query(consulta,[precio_producto,fecha_solicitud,fecha_fin,precio_garantia,codigo_prod],
        (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({respuesta:result})
        }
    })
})





app.listen(4000,()=>{
    console.log("server en ejecucion")
})