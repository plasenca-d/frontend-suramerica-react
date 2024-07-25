import React, { useEffect, useState } from 'react'
import { ListadoPaquetes } from '../../components/ListadoPaquetes'
import instanceWithToken from '../../utils/instanceWithToken'

export const PaquetesPage = () => {

    let [paquetes, setPaquetes] = useState([])

    const getPaquetes = () => {
        instanceWithToken.get('empaques').then((result) => {
            setPaquetes(result.data.data)
        })
    }

    useEffect(() => {
        getPaquetes()
    }, [])
    return (
        <ListadoPaquetes paquetes={paquetes} />
    )
}
