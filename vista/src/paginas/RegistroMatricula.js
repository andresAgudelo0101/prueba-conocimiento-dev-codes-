import React, {useState } from 'react';
import Axios from "axios";
import styles from "./RegistroMatricula.module.css";
import {getCodigoMatricula,startCodigoMatricula } from '../redux/modules/user.actions';
import {useSelector,useDispatch} from "react-redux"
import { Link,useNavigate } from 'react-router-dom';
import moment from "moment";

export default function RegistroMatricula() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [precio_prod, setprecio_prod] = useState(0);
    const [fecha_solicitud_g, setfecha_solicitud_g] = useState("");
    const [fecha_fin_g, setfecha_fin_g] = useState("");
    const [precio_g, setprecio_g] = useState(0);
    const [mensaje, setmensaje] = useState("");
    const [display, setdisplay] = useState(false);
    const codigoMatricula=useSelector(getCodigoMatricula);
    const url="http://localhost:4000/newProductoGarantia";


    const nuevaMatricula=()=>{
      if(codigoMatricula!=""){
        Axios.post(url,{
          precio_producto:precio_prod,
          fecha_solicitud:fecha_solicitud_g,
          fecha_fin:fecha_fin_g,
          precio_garantia:precio_g,
          codigo_prod:codigoMatricula
        }).then((response)=>{
          console.log(response)
          dispatch(startCodigoMatricula({matricula:""}))
          if(response.status==200){
            alert("Datos insertados con exito");
            navigate("/");
          }
          else{
            alert("Ocurrio un error, regresando al inicio");
            navigate("/");
          }
        })
      }
    };
    
    const calcularGarantia=(precio)=>{
      setprecio_prod(precio)
      if(precio>10000000){
        setprecio_g(precio*0.2)
      }else{
        setprecio_g(0)
      }
    }
  
    function calcularFechaGarantia(fecha, dias) {
      var resultado = new Date(fecha);
      resultado.setDate(resultado.getDate() + dias);
      setfecha_solicitud_g(fecha);
      setfecha_fin_g(moment(resultado).format("YYYY/MM/DD"));
    }
   

    

  return (
    <div className={styles.container}>
        <div className={styles.usersGrid}>
          <div className={styles.containerInput}>
            <div className={styles.containerChildGridInput}>

            <div className={styles.containerLabel}>
                <label>Codigo Producto</label>
                <input 
                  className={styles.input} 
                  type="text"
                  placeholder={codigoMatricula}
                  readOnly
                />
              </div>

              <div className={styles.containerLabel}>
                <label>Precio Producto</label>
                <input 
                  className={styles.input} 
                  type="text"
                  placeholder='Precio Producto'
                  onChange={(e)=>{calcularGarantia(e.target.value)}}
                />
              </div>
              
              <div className={styles.containerLabel}>
                <label>Fecha inicio de garantia</label>
                <input 
                  className={styles.input} 
                  type="date"
                  placeholder='Fecha solicitud garantia'
                  onChange={(e)=>{calcularFechaGarantia(e.target.value,150)}}
                  />
              </div>

              <div className={styles.containerLabel}>
                <label>Fecha fin de garantia</label>
                <input 
                  className={styles.input} 
                  type="text"
                  placeholder={fecha_fin_g}
                  readOnly
                />
              </div>

              <div className={styles.containerLabel}>
                <label>Precio Garantia</label>
                <input 
                  className={styles.input} 
                  type="text"
                  readOnly
                  placeholder={precio_g}
                />
              </div>
             
            </div>
          </div>
          <div className={styles.containerButtons}>
            <button className={styles.button} onClick={nuevaMatricula}>Registrar</button>
            <Link className={styles.button} to="/">Regresar</Link>
          </div>
        </div>
    </div>
  )
}
