import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PiPlusCircleDuotone } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import instanceWithToken from '../../utils/instanceWithToken';
import { ListadoSucursales } from '../../components/ListadoSucursales';
import { ListadoUsuarios } from '../../components/ListadoUsuarios';

export const DetalleEmpresa = () => {
    let { empresaId } = useParams()
    let [empresa, setEmpresa] = useState(null);


    const getEmpresa = () => {
        instanceWithToken.get('empresa/' + empresaId).then((result) => {
            console.log(result.data.data)
            setEmpresa(result.data.data)
        })
    }

    useEffect(() => {
        getEmpresa()
    }, [])
    return (
        <div>
            {empresa ? (
                <>
                    <Card>
                        <CardHeader>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                        <Heading size='lg'>Empresa: {empresa.nombre}</Heading>
                                        <Heading size='sm'>Representante: {empresa.representante}</Heading>
                                        <Heading size='sm'>Direccion: {empresa.direccion}</Heading>
                                    </Box>
                                </Flex>
                            </Flex>
                        </CardHeader>
                    </Card>

                    <ListadoSucursales sucursales={empresa.sucursales} empresaId={empresa.id} />

                    <ListadoUsuarios users={empresa.users} empresaId={empresa.id} />
                </>
            ) : null}
        </div>
    );
};
