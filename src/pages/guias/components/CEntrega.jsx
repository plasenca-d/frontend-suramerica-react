import { Box, Card, CardHeader, Flex, Heading, CardBody, SimpleGrid, IconButton, Checkbox, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    Text,
    useToast,
    Select,
} from '@chakra-ui/react';
import instanceWithToken from '../../../utils/instanceWithToken';

export const CEntrega = ({ setEntregaPP, direccionDestinatario, setCourier }) => {
    let [status, setStatus] = useState(false)
    let [couriers, setCouriers] = useState([])
    let [label, setLabel] = useState("")
    let [search, setSearch] = useState("")
    let [filteredCouriers, setFilteredCouriers] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();

    const setCheck = (event) => {
        setEntregaPP(event.target.checked);
        setStatus(event.target.checked)
    };

    const getCouriers = () => {
        instanceWithToken.get('couriers').then((result) => {
            setCouriers(result.data.data)
        })
    }

    const alert = () => {
        onOpen()
    }

    const seleccionar = (data) => {
        setCourier(data.id)
        setLabel(data.estado + ' - ' + data.ciudad + ' - ' + data.direccion)
        onClose()
    }

    useEffect(() => {
        getCouriers()
    }, [])

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredCouriers([]);
        } else {
            const results = couriers.filter(courier =>
                courier.estado.toLowerCase().includes(search.toLowerCase()) ||
                courier.ciudad.toLowerCase().includes(search.toLowerCase()) ||
                courier.direccion.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredCouriers(results);
        }
    }, [search, couriers]);

    return (
        <>
            <Card mt={5} mb={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Forma de Entrega</Heading>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <SimpleGrid columns={20} spacing={4}>
                        <Box gridColumn="span 4">
                            <Checkbox mt={6} onChange={setCheck}>Entrega Puerta a Puerta</Checkbox>
                        </Box>
                        <Box gridColumn="span 1">
                            {!status && <IconButton mt={5} onClick={() => alert()} isRound={true} colorScheme='blue' icon={<FaSearch />} />}
                        </Box>
                        <Box gridColumn="span 15">
                            <Textarea disabled value={status ? direccionDestinatario : label} placeholder='Direccion de entrega' />
                        </Box>
                    </SimpleGrid>
                </CardBody>
            </Card>

            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Seleccionar Oficina de Entrega</ModalHeader>
                    <ModalBody>
                        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Escribe la ciudad, el estado o una parte de la direccion' />
                        {search.trim() !== "" && (
                            <SimpleGrid columns={1} spacing={3} mt={4}>
                                {filteredCouriers.map((courier, index) => (
                                    <Box key={index} p={3} borderWidth="1px" borderRadius="md">
                                        <Text><strong>Estado:</strong> {courier.estado}</Text>
                                        <Text><strong>Ciudad:</strong> {courier.ciudad}</Text>
                                        <Text><strong>Dirección:</strong> {courier.direccion}</Text>
                                        <Button colorScheme='blue' onClick={() => seleccionar(courier)} width={'100%'} mt={3}>Seleccionar</Button>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
