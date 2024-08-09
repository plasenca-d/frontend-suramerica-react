import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';

Font.register({ family: 'Cabin', src: '/cabin/Cabin-Regular.otf', fontStyle: 'normal', fontWeight: 'normal' });
Font.register({ family: 'Cabin', src: '/cabin/Cabin-Bold.otf', fontStyle: 'normal', fontWeight: 'bold' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    column: {
        width: '33.3%', // Cada columna ocupa un tercio del ancho
        fontSize: 12,
    },
    table: {
        marginVertical: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderLeftWidth: 1,
        borderLeftColor: 'black',
        borderRightWidth: 1,
        borderRightColor: 'black',
    },
    tableHeader: {
        fontSize: 10,
        flexDirection: 'row',
        backgroundColor: 'gray',
        padding: 5,
    },
    tableCell: {
        fontSize: 10,
        borderRightWidth: 1,
        borderRightColor: 'black',
        paddingHorizontal: 3,
    },
    tableCellLast: {
        fontSize: 10,
        paddingHorizontal: 3,
    },
});

export const EstructuraManifiesto = ({ manifiesto }) => {
    const formattedDate = format(new Date(manifiesto.createdAt), 'dd-MM-yyyy HH:mm');

    const calcularFOB = (articulos) => {
        return articulos.reduce((total, articulo) => {
            return total + (articulo.cantidad * articulo.monto);
        }, 0).toFixed(2); // Devolver el total con dos decimales
    };

    return (
        <Document>
            <Page size={'A4'} orientation='landscape' style={styles.page}>
                <Text style={styles.title}>Manifiesto de Carga: {manifiesto.id}</Text>

                {/* Primera fila de tres columnas */}
                <View style={styles.row} mt={2}>
                    <Text style={styles.column}>Empresa:  {manifiesto.empresa.nombre}</Text>
                    <Text style={styles.column}></Text>
                    <Text style={styles.column}>Tipo Manifiesto: {manifiesto.tipoGuia}</Text>
                </View>

                {/* Segunda fila de tres columnas */}
                <View style={styles.row} mb={2}>
                    <Text style={styles.column}>Creado Por: {manifiesto.user.name}</Text>
                    <Text style={styles.column}>Fecha:  {formattedDate}</Text>
                    <Text style={styles.column}>Peso Total</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCell, { width: '5%' }]}>Nº</Text>
                        <Text style={[styles.tableCell, { width: '10%' }]}>GUIA</Text>
                        <Text style={[styles.tableCell, { width: '30%' }]}>DESTINATARIO</Text>
                        <Text style={[styles.tableCell, { width: '10%' }]}>DOC</Text>
                        <Text style={[styles.tableCell, { width: '5%' }]}>KG</Text>
                        <Text style={[styles.tableCell, { width: '10%' }]}>VOL</Text>
                        <Text style={[styles.tableCell, { width: '10%' }]}>M3</Text>
                        <Text style={[styles.tableCell, { width: '10%' }]}>FT3</Text>
                        <Text style={[styles.tableCell, { width: '10%' }]}>FOB</Text>
                    </View>
                    {manifiesto.guias.map((guia, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={[styles.tableCell, { width: '5%' }]}>{index + 1}</Text>
                            <Text style={[styles.tableCell, { width: '10%' }]}>{guia.id}</Text>
                            <Text style={[styles.tableCell, { width: '30%' }]}>{guia.destinatario.nombre} {guia.destinatario.apellido}</Text>
                            <Text style={[styles.tableCell, { width: '10%' }]}>{guia.destinatario.documento}</Text>
                            <Text style={[styles.tableCell, { width: '5%' }]}>{guia.peso} KG</Text>
                            <Text style={[styles.tableCell, { width: '10%' }]}>{guia.pesoVolumetrico}</Text>
                            <Text style={[styles.tableCell, { width: '10%' }]}>{guia.m3}</Text>
                            <Text style={[styles.tableCell, { width: '10%' }]}>{guia.ft3}</Text>
                            <Text style={[styles.tableCell, { width: '10%' }]}>{calcularFOB(guia.articulos)} USD </Text>
                        </View>
                    ))}

                </View>
            </Page>
        </Document>
    );
};
