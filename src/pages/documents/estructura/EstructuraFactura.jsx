import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  companyInfo: {
    fontSize: 12,
    marginBottom: 10,
  },
  invoiceInfoContainer: {
    width: '20%',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  invoiceNumberContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  invoiceNumberTop: {
    backgroundColor: 'white',
    width: '100%',
    height: 10,
  },
  invoiceNumberMiddle: {
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    paddingVertical: 5,
    textAlign: 'center',
  },
  invoiceNumberBottom: {
    backgroundColor: 'white',
    width: '100%',
    height: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    fontSize: 12,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    backgroundColor: 'gray',
    color: 'white',
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalValue: {
    fontSize: 12,
  },
  footer: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
});

// Invoice structure component
export const EstructuraFactura = ({ factura }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyInfo}> Sur America Cargo </Text>
            <Text style={styles.companyInfo}> Lima - Peru </Text>
            {/* <Text style={styles.invoiceInfo}>
              Fecha: {format(factura.createdAt, 'dd/MM/yyyy')}
            </Text> */}
          </View>

          {/* Invoice Number Section */}
          <View style={styles.invoiceInfoContainer}>
            <View style={styles.invoiceNumberContainer}>
              <View style={styles.invoiceNumberTop} />
              <Text style={styles.invoiceNumberMiddle}>
                Recibo {factura.id}
              </Text>
              <View style={styles.invoiceNumberBottom} />
            </View>
          </View>
        </View>

        {/* Bill To Section */}
        <View style={styles.section}>
          <Text>Recibo Emitido a:</Text>
          <Text>{factura.empresa.nombre}</Text>
          <Text>{factura.empresa.correo}</Text>
          <Text>{factura.empresa.telefono}</Text>
        </View>

        {/* Itemized Table */}
        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Guia</Text>
            <Text style={styles.tableCell}>Tipo de Guia</Text>
            <Text style={styles.tableCell}>Cobro x</Text>
            <Text style={styles.tableCell}>Peso</Text>
            <Text style={styles.tableCell}>Monto Facturado</Text>
          </View>
          {factura.guias.map((guia, index) => {
            const pesoCalculado = guia.peso > guia.pesoVolumetrico ? guia.peso : guia.pesoVolumetrico;
            const tipoCalculo = guia.peso > guia.pesoVolumetrico ? 'PESO' : 'VOLUMEN';

            return (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{guia.sucursal.codigo}-{guia.id}</Text>
                <Text style={styles.tableCell}>{guia.tipoGuia}</Text>
                <Text style={styles.tableCell}>{tipoCalculo}</Text>
                <Text style={styles.tableCell}>{pesoCalculado} KG</Text>
                <Text style={styles.tableCell}>{guia.montoFacturado}</Text>
              </View>
            );
          })}

        </View>

        {/* Total Section */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>
            {factura.guias.reduce((sum, item) => sum + item.montoFacturado, 0).toFixed(2)}
          </Text>
        </View>

        {/* Footer Section */}
        <Text style={styles.footer}>
          Gracias por confiar en nosotros!{"\n"}
          24 Horas habiles para la cancelacion del presente recibo!{"\n"}
          La no cancelacion del mismo, incurrira en retrasos de entrega de su carga!
        </Text>

      </Page>
    </Document>
  );
};
