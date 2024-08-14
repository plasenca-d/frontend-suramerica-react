import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format, addDays } from 'date-fns';

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 20,
  },
  companyInfo: {
    fontSize: 12,
    marginBottom: 10,
  },
  invoiceInfo: {
    fontSize: 12,
    textAlign: 'right',
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
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center'
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
          <Text style={styles.companyInfo}>
            SurAmericaCargo
          </Text>
          <Text style={styles.invoiceInfo}>
            Factura #: {factura.id}{"\n"}
            Fecha: {format(factura.createdAt, 'dd/MM/yyyy')}{"\n"}
            {/* Fecha de Vencimiento: {format(dueDate, 'dd/MM/yyyy')} */}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Factura</Text>

        {/* Bill To Section */}
        <View style={styles.section}>
          <Text>Facturado a:</Text>
          <Text>{factura.empresa.nombre}</Text>
          <Text>{factura.empresa.correo}</Text>
          <Text>{factura.empresa.telefono}</Text>
        </View>

        {/* Itemized Table */}
        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Guia</Text>
            <Text style={styles.tableCell}>Tipo de Guia</Text>
            <Text style={styles.tableCell}>Peso</Text>
            <Text style={styles.tableCell}>Monto Facturado</Text>
          </View>
          {factura.guias.map((guia, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{guia.id}</Text>
              <Text style={styles.tableCell}>{guia.tipoGuia}</Text>
              <Text style={styles.tableCell}>{guia.peso} KG</Text>
              <Text style={styles.tableCell}>{guia.montoFacturado}</Text>
            </View>
          ))}
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
          Desde la fecha de emision de una factura tienes un lapso no mayor a 3 dias para pagar la misma.
        </Text>

      </Page>
    </Document>
  );
}
