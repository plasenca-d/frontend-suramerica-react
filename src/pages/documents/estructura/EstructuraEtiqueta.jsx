import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Times-Roman',
        fontStyle: 'bold',
    },
    subtitle: {
        fontSize: 10,
    },
    tracking: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
    },
    detail: {
        border: 1,
        borderColor: 'black',
        width: '100%',
        borderRadius: 10,
        padding: 4,
        marginBottom: 4,
    },
    detailLine: {
        fontSize: 13,
    },
    qrContainer: {
        alignItems: 'center',
    },
    qrCode: {
        width: 150, // Ajusta el tamaño del QR aquí
        height: 50,
    },
});

export const EstructuraEtiqueta = ({ guia }) => {
    let canvas = document.createElement('canvas');

    JsBarcode(canvas, guia.id, {
        width: 1,
        height: 50,
    });

    const barcode = canvas.toDataURL();

    return (
        <Document>
            <Page size={{ width: 419.53, height: 'auto' }} style={styles.page}>
                <Text style={styles.title}>{guia.empresa.nombre}</Text>
                <Text style={styles.subtitle}>({guia.sucursal.codigo}) - {guia.sucursal.nombre}</Text>
                <Text style={styles.subtitle}>{guia.sucursal.direccion}</Text>
                <Text style={styles.subtitle}>Teléfono: {guia.sucursal.telefono}</Text>
                <Text style={styles.tracking}>{guia.sucursal.codigo}-{guia.id}</Text>
                <View style={styles.detail}>
                    <Text style={styles.detailLine}>Destinatario: {guia.destinatario.nombre} {guia.destinatario.apellido}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailLine}>País: {guia.paisDestino}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailLine}>Peso: {guia.peso}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailLine}>Tipo de Envío: {guia.tipoGuia}</Text>
                </View>
                <View style={styles.qrContainer}>
                    <Image style={styles.qrCode} src={barcode} />
                </View>
            </Page>
        </Document>
    );
};
