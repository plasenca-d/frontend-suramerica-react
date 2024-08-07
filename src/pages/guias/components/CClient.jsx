import { Box, Card, CardHeader, Flex, Heading, CardBody, InputGroup, Input, InputRightElement, Button, SimpleGrid, IconButton, useToast, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import instanceWithToken from '../../../utils/instanceWithToken'
import { MCrearCliente } from './modals/MCrearCliente'

export const CClient = ({ setClient, setDestinatarios }) => {
    const toast = useToast()
    let [documentClient, setDocumentClient] = useState("")
    let [label, setLabel] = useState("")

    const { isOpen: isCrearModalOpen, onOpen: onCrearModalOpen, onClose: onCrearModalClose } = useDisclosure();

    const consultClient = () => {
        instanceWithToken.get('clientes/by-document/' + documentClient).then((result) => {
            let data = result.data.data
            setLabel(data.nombre + ' ' + data.apellido)
            console.log(data)
            setDestinatarios(data.destinatarios)
            setClient(data.id)
            toast({
                title: 'Exito.',
                description: "Cliente encontrado con exito",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((e) => {
            setLabel("")
            onCrearModalOpen()
            toast({
                title: 'Error.',
                description: e.request.response,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return (
        <Card mt={5} mb={5}>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Box>
                            <Heading size='lg'>Cliente</Heading>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>

                <SimpleGrid columns={6} spacing={4}>
                    <Box gridColumn="span 2">
                        <InputGroup size='md'>
                            <Input
                                value={documentClient}
                                onChange={(event) => setDocumentClient(event.target.value)}
                                pr='4.5rem'
                                type='text'
                                placeholder='Documento Cliente'
                            />
                            <InputRightElement>
                                <IconButton colorScheme='blue' onClick={() => consultClient()} icon={<FaSearch />} />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Box gridColumn="span 4">
                        <InputGroup size='md'>
                            <Input
                                disabled
                                value={label}
                                type='text'
                                placeholder='Nombre del Cliente'
                            />
                            <InputRightElement>
                                <IconButton colorScheme='blue' onClick={() => consultClient()} icon={<FaEdit />} />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </SimpleGrid>


                <MCrearCliente isOpen={isCrearModalOpen} onClose={onCrearModalClose} setLabel={setLabel} setClient={setClient} />
            </CardBody>
        </Card>
    )
}
