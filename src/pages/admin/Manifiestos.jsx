import React, { useState } from 'react'
import { ListadoManifiestos } from '../../components/ListadoManifiestos'

export const Manifiestos = () => {

    let [manifiestos, setmanifiestos] = useState([])

    const getManifiestos = () => {
        
    }

    return (
        <ListadoManifiestos />
    )
}
