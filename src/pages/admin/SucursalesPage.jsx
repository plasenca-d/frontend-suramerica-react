import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import instanceWithToken from '../../utils/instanceWithToken'
import { ListadoSucursales } from '../../components/ListadoSucursales'
export const SucursalesPage = () => {
    const [sucursales, setSucursales] = useState([])
    const [empresaId, setEmpresaId] = useState("")
    
    const getSucursales = () => {
        instanceWithToken.get('sucursales').then((result) => {
            setSucursales(result.data.data)
        })
    }

    useEffect(() => {
        setEmpresaId(Cookies.get("empresaId"))
        getSucursales()
    }, [])
    return (
        <ListadoSucursales sucursales={sucursales} empresaId={empresaId} />
    )
}
