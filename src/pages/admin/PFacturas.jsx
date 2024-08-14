import React, { useEffect, useState } from 'react'
import { ListadoFacturas } from '../../components/ListadoFacturas'
import instanceWithToken from '../../utils/instanceWithToken'
import { useParams } from 'react-router-dom'

export const PFacturas = () => {
  let { cargaId } = useParams() 
  let [facturas, setFacturas] = useState([])

  const getFacturas = () => {
    let url = 'facturas'
    
    if (cargaId) {
      url += `?carga=${cargaId}`
    }

    instanceWithToken.get(url).then((result) => {
      setFacturas(result.data.data)
    })
  }

  useEffect(() => { getFacturas() }, [cargaId])
  
  return (
    <div>
      <ListadoFacturas facturas={facturas} />
    </div>
  )
}
