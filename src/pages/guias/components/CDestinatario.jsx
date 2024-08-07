import { Box, Card, CardHeader, Flex, Heading, CardBody, InputGroup, Input, InputRightElement, Button, SimpleGrid, IconButton, useToast, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPlusCircle, FaSearch } from 'react-icons/fa'
import { MSeleccionarDestinatario } from './modals/MSeleccionarDestinatario'
import { MCrearDestinatario } from './modals/MCrearDestinatario'

export const CDestinatario = ({ destinatarios, setDestinatario, client, setDireccionDestinatario }) => {
    let [label, setLabel] = useState("")
    const { isOpen: isSeleccionarModalOpen, onOpen: onSeleccionarModalOpen, onClose: onSeleccionarModalClose } = useDisclosure();
    const { isOpen: isCraearModalOpen, onOpen: onCraearModalOpen, onClose: onCraearModalClose } = useDisclosure();

    return (
        <>
            <Card mt={5} mb={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Destinatario</Heading>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <SimpleGrid columns={20} spacing={4}>
                        <Box gridColumn="span 2">
                            <IconButton isRound={true} colorScheme='blue' onClick={() => onSeleccionarModalOpen()} icon={<FaSearch />} />
                            <IconButton ml={3} isRound={true} colorScheme='blue' onClick={() => onCraearModalOpen()} icon={<FaPlusCircle />} />
                        </Box>
                        <Box gridColumn="span 18">
                            <Input value={label} type='text' disabled placeholder="Datos del destinatario" />
                        </Box>
                    </SimpleGrid>
                </CardBody>
            </Card>
            <MSeleccionarDestinatario setDireccionDestinatario={setDireccionDestinatario} setDestinatario={setDestinatario} destinatarios={destinatarios} isOpen={isSeleccionarModalOpen} onClose={onSeleccionarModalClose} setLabel={setLabel} />
            <MCrearDestinatario setDireccionDestinatario={setDireccionDestinatario} client={client} isOpen={isCraearModalOpen} onClose={onCraearModalClose} setDestinatario={setDestinatario} setLabel={setLabel} />
        </>
    )
}
