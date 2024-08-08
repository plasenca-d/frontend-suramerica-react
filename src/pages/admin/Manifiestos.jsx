import React, { useEffect, useState } from 'react'
import { ListadoManifiestos } from '../../components/ListadoManifiestos'
import instanceWithToken from '../../utils/instanceWithToken'

export const Manifiestos = () => {

    let [manifiestos, setManifiestos] = useState([])

    const getManifiestos = () => {
        instanceWithToken.get('manifiestos').then((result) => {
            setManifiestos(result.data.data)
        })
    }

    useEffect(() => {
        getManifiestos()
    }, [])
    return (
        <ListadoManifiestos manifiestos={manifiestos} />
    )
}
