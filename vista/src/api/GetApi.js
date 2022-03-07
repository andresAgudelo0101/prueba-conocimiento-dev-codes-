import React from 'react'

export async function GetApi(url) {

    let data=[];

    await fetch(url)
    .then((response)=>response.json())
    .then((datos)=>{
        data=datos;
    })
  return data
}
