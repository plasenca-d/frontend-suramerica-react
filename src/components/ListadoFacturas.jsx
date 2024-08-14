import { Badge, Card, CardBody, CardHeader, Heading, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { FaFileArrowDown } from 'react-icons/fa6'

export const ListadoFacturas = ({ facturas, onUpdate }) => {
  return (
    <>
      <Card mt={5}>
        <CardHeader>
          <Heading size='sm'>Listado de Facturas</Heading>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th textAlign={'center'}>Numero</Th>
                  <Th textAlign={'center'}>Empresa</Th>
                  <Th textAlign={'center'}>Monto Facturado</Th>
                  <Th textAlign={'center'}>Estado</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {facturas.map((factura, index) => (
                  <Tr key={index}>
                    <Td textAlign={'center'}>{factura.id}</Td>
                    <Td textAlign={'center'}>{factura.empresa.nombre}</Td>
                    <Td textAlign={'center'}>{factura.montoTotal} USD</Td>
                    <Td textAlign={'center'}>
                        {factura.status && <Badge colorScheme='green'>PAGADA</Badge>}
                        {!factura.status && <Badge colorScheme='red'>NO PAGADA</Badge>}
                    </Td>
                    <Td>
                      <IconButton colorScheme='blue' icon={<FaFileArrowDown />} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  )
}
