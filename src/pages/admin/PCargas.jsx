import React, { useEffect, useState } from 'react'
import instanceWithToken from '../../utils/instanceWithToken'
import { ListadoCargas } from '../../components/ListadoCargas'

export const PCargas = () => {

  let [cargas, setCargas] = useState([])

  const getCargas = () => {
    instanceWithToken.get('cargas').then((result) => {
      setCargas(result.data.data)
    })
  }

  useEffect(() => {
    getCargas()
  }, [])


  return (
    <div>
      <ListadoCargas cargas={cargas} onUpdate={getCargas} />
    </div>
  )
}
