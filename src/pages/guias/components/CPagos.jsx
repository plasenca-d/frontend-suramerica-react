import { Box, Card, CardHeader, Flex, Heading, CardBody, Input, Button, SimpleGrid, Text, IconButton, Select, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export const CPagos = ({ moneda, pagos, setPagos, tasaData, peso, volumen, montoSeguro, montoDelivery, paquetePrecio, total, setTotal }) => {
  const [abono, setAbono] = useState(0);
  const [restante, setRestante] = useState(0);
  const [vuelto, setVuelto] = useState(0);
  const [tipoPago, setTipoPago] = useState('');
  const [monto, setMonto] = useState(0);

  const calculate = () => {
    let monto = 0;
    let pesoCalculado = 0;

    const montoDeliveryNum = parseFloat(montoDelivery) || 0;
    const montoSeguroNum = parseFloat(montoSeguro) || 0;
    const paquetePrecioNum = parseFloat(paquetePrecio) || 0;
    const pesoNum = parseFloat(peso) || 0;
    const volumenNum = parseFloat(volumen) || 0;
    const tasaMontoNum = tasaData ? parseFloat(tasaData.monto) : 0;

    if (tasaData) {
      if (tasaData.tipoPrecio === 'FIJO') {
        monto = tasaMontoNum + montoDeliveryNum + montoSeguroNum + paquetePrecioNum;
      }
      if (tasaData.tipoPrecio === 'CALCULADO') {
        pesoCalculado = Math.max(pesoNum, volumenNum, 1);
        monto = pesoCalculado * tasaMontoNum + montoDeliveryNum + montoSeguroNum + paquetePrecioNum;
      }
    }

    setTotal(monto);
    console.log(monto);
  };

  const add = () => {
    const newPago = { tipoPago, monto: parseFloat(monto) };
    const newPagos = [...pagos, newPago];
    setPagos(newPagos);
    updateMontos(newPagos);

    // Limpiar los campos de entrada
    setTipoPago('');
    setMonto(0);
  };

  const eliminar = (index) => {
    const newPagos = pagos.filter((_, i) => i !== index);
    setPagos(newPagos);
    updateMontos(newPagos);
  };

  const updateMontos = (newPagos) => {
    const totalAbonado = newPagos.reduce((acc, pago) => acc + pago.monto, 0);
    const restante = Math.max(total - totalAbonado, 0);
    const vuelto = Math.max(totalAbonado - total, 0);

    setAbono(parseFloat(totalAbonado.toFixed(2)));
    setRestante(parseFloat(restante.toFixed(2)));
    setVuelto(parseFloat(vuelto.toFixed(2)));
  };

  useEffect(() => {
    calculate();
    setPagos([]);
    setAbono(0);
    setRestante(0);
    setVuelto(0);
  }, [tasaData, peso, volumen, montoSeguro, montoDelivery, paquetePrecio]);

  return (
    <Card mt={5} mb={5}>
      <CardHeader>
        <Flex spacing='4' justifyContent={'space-between'} alignContent={'space-between'}>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box>
              <Heading size='lg'>Pagos</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={4} spacing={5}>
          <Box>
            <Text>Monto a Pagar</Text>
            <Text fontSize='3xl'>
              {total} {moneda}
            </Text>
          </Box>
          <Box>
            <Text>Monto Abonado</Text>
            <Text fontSize='3xl'>
              {abono} {moneda}
            </Text>
          </Box>
          <Box>
            <Text>Monto Restante</Text>
            <Text fontSize='3xl'>
              {restante} {moneda}
            </Text>
          </Box>
          <Box>
            <Text>Vuelto</Text>
            <Text fontSize='3xl'>
              {vuelto} {moneda}
            </Text>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={3} spacing={5} mt={3}>
          <Box>
            <Select placeholder='Tipo de Pago' value={tipoPago} onChange={(event) => setTipoPago(event.target.value)}>
              <option value={'EFECTIVO'}>EFECTIVO</option>
              <option value={'TRANSFERENCIA BANCARIA'}>TRANSFERENCIA BANCARIA</option>
              <option value={'BILLETERA DIGITAL'}>BILLETERA DIGITAL</option>
            </Select>
          </Box>

          <Box>
            <Input type='number' placeholder='Monto' value={monto} onChange={(event) => setMonto(event.target.value)} />
          </Box>

          <Box>
            <Button onClick={add} colorScheme='blue' width={'100%'}>
              Agregar
            </Button>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} spacing={5} mt={5}>
          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Tipo de Pago</Th>
                  <Th isNumeric>Monto</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {pagos.map((pago, index) => (
                  <Tr key={index}>
                    <Td>{pago.tipoPago}</Td>
                    <Td isNumeric>{pago.monto}</Td>
                    <Td>
                      <IconButton colorScheme='red' icon={<FaTrash />} onClick={() => eliminar(index)} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};
