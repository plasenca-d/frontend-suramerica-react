import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 10
    },
    title: {
        fontSize: 15,
        fontFamily: 'Times-Roman',
        fontStyle: 'bold'
    },
    subtitle: {
        fontSize: 10
    },
    tracking: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 25
    },
    detail: {
        border: 1,
        borderColor: 'black',
        width: '100%',
        borderRadius: 10,
        padding: 4,
        marginBottom: 4
    },
    detailLine: {
        fontSize: 13
    }
  });

export const EstructuraEtiqueta = ({ guia }) => {
    return (
        <Document>
            <Page size={{ width: 419.53, height: 'auto' }} style={styles.page}>
                <Text style={styles.title}>{guia.empresa.nombre}</Text>
                <Text style={styles.subtitle}>({guia.sucursal.codigo}) - {guia.sucursal.nombre}</Text>
                <Text style={styles.subtitle}>{guia.sucursal.direccion}</Text>
                <Text style={styles.subtitle}>Telefono: {guia.sucursal.telefono}</Text>
                <Text style={styles.tracking}>{guia.sucursal.codigo}-{guia.id}</Text>
                <View style={styles.detail}>
                    <Text style={styles.detailLine}>Destinatario: {guia.destinatario.nombre} {guia.destinatario.apellido}</Text> 
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailLine}>Pais: {guia.paisDestino}</Text> 
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailLine}>Peso: {guia.peso}</Text> 
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailLine}>Tipo de Envio: {guia.tipoGuia}</Text> 
                </View>
            </Page>
        </Document>
    )
}
