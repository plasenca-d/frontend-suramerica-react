import React, { useEffect, useState } from 'react'
import instanceWithToken from '../../utils/instanceWithToken'
import { ListadoGuias } from '../../components/ListadoGuias'

export const GuiasPage = () => {
  let [guias, setGuias] = useState([])

  const getGuias = () => {
    instanceWithToken.get('guias').then((result) => {
      setGuias(result.data.data)
    })
  }

  useEffect(() => {
    getGuias()
  }, [])

  return (
    <ListadoGuias guias={guias} updateGuias={getGuias} />
  )
}
