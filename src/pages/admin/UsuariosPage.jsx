import React, { useEffect, useState } from 'react'
import instanceWithToken from '../../utils/instanceWithToken'
import { ListadoUsuarios } from '../../components/ListadoUsuarios'
import Cookies from 'js-cookie'
export const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([])
    const [empresaId, setEmpresaId] = useState("")
    const getUsuarios = () => {
        instanceWithToken.get('users').then((result) => {
            console.log(result.data.data)
            setUsuarios(result.data.data)
        })
    }

    useEffect(() => {
        setEmpresaId(Cookies.get("empresaId"))
        getUsuarios()
    }, [])
    return (
        <ListadoUsuarios users={usuarios} empresaId={empresaId} />
    )
}
