import React, { useEffect, useState } from 'react'
import { ListadoTasas } from '../../components/ListadoTasas'
import instanceWithToken from '../../utils/instanceWithToken'

export const TasasPage = () => {
  let [tasas, setTasas] = useState([])

  const getTasas = () => {
    instanceWithToken.get('tasas').then((result) => {
      setTasas(result.data.data)
    })
  }

  useEffect(() => {
    getTasas()
  }, [])
  return (
    <ListadoTasas tasas={tasas} />
  )
}
