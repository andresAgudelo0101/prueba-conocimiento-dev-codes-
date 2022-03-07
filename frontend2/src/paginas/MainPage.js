import React, { useEffect, useState } from 'react';
import { GetApi } from '../api/GetApi';
import styles from "./MainPage.module.css";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { startCodigoMatricula,getCodigoMatricula } from '../redux/modules/user.actions';
import {useDispatch,useSelector} from "react-redux"

export default function MainPage() {
    
    const[productos,setProductos]=useState([]);
    const [mensaje, setmensaje] = useState("");
    const [display, setdisplay] = useState(false);
    const url="http://localhost:4000/productos";
    const url2="http://localhost:4000/consultarMatricula";
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const test1=useSelector(getCodigoMatricula);

    useEffect(()=>{
       GetApi(url)
       .then((data)=>{
           setProductos(data.productos)
           console.log(data.productos)
       })
       
   },[]);

 const verificarVocales=(codigo)=>{
       let cont=0;
        for(let i=0; i<codigo.length; i++){
            if (codigo[i]==='A' || codigo[i]==='E' || codigo[i]==='I' || codigo[i]==='O' || codigo[i]==='U'){
            cont=cont+1;
            }
        }
        if(cont>=3){
            setmensaje("Este codigo tiene 3 o mas vocales ");
            setdisplay(true);
            
        }else{
            verificarMatricula(codigo);
        }
   }

   const verificarMatricula=(codigo)=>{
    Axios.post(url2,{
      matricula:codigo
    }).then((response)=>{
        if(response.data.respuesta.length>=1){
           setmensaje("Este codigo ya tiene un registro ");
           setdisplay(true);
        }else{
            dispatch(startCodigoMatricula({matricula:codigo}))
            navigate("/comprobacionMatricula")
        }
    })
    };

  return (
    <div className={styles.container}>
        <div className={styles.usersGrid}>
            <div className={styles.containerTable}>
                <table>
                    <thead >
                        <tr>
                            <th className={styles.th}>Nombre Propietario</th>
                            <th className={styles.th}>Codigo Producto</th>
                        </tr>
                    </thead>
                <tbody>
                {
                productos?.map((prod)=>(
                    <tr key={prod.codigo}>
                        <td>{prod.propietario}</td>
                        <td>{prod.codigo}</td>
                        <td><button className={styles.button} onClick={()=>verificarVocales(prod.codigo)}>Verificar Matricula</button></td>
                    </tr>
                ))
                }
                </tbody>
                </table>
            </div>
            <div className={styles.containerMensaje}>
                <div style={{display:display?"block":"none"}}>
                    {mensaje}
                    <button onClick={()=>setdisplay(false)}>x</button>
                </div>
            </div>
        </div>
    </div>
  )
}
