import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { format } from 'date-fns';

Font.register({ family: 'Cabin', src: '/cabin/Cabin-Regular.otf', fontStyle: 'normal', fontWeight: 'normal' });
Font.register({ family: 'Cabin', src: '/cabin/Cabin-Bold.otf', fontStyle: 'normal', fontWeight: 'bold' });

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Cabin',
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 30,
        position: 'relative',
    },
    title: {
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    divider: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderBottomStyle: 'solid',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    rowB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
        borderTop: '1px solid black',
    },
    line: {
        fontSize: 10,
    },
    table: {
        marginVertical: 10,
        width: '100%',
        borderBottom: '1px solid black',
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
    },
    tableHeader: {
        fontSize: 10,
        flexDirection: 'row',
        backgroundColor: 'gray',
        padding: 5,
    },
    tableCell: {
        fontSize: 10,
        borderRight: '1px solid black',
        paddingHorizontal: 3,
    },
    tableCellLast: {
        fontSize: 10,
        borderLeft: '1px solid black',
        paddingHorizontal: 3,
    },
    tableText: {
        fontSize: 10,
    },
    observacion: {
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        textDecoration: 'underline',
        textAlign: 'center',
        fontSize: 14,
    },
    certifico: {
        fontSize: 10,
        textAlign: 'justify',
        marginTop: 10,
    },
    signatureContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    signatureLine: {
        borderBottom: '1px solid black',
        width: '30%',
        marginBottom: 5,
        marginTop: 40,
    },
    signatureText: {
        fontSize: 10,
        fontFamily: 'Cabin',
        fontWeight: 'bold',
    },
    firma: {
        fontSize: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
    },
});

const Footer = ({ guia }) => (
    <View style={styles.footer}>
        <Text style={styles.firma}>Generado Por: {guia.user.name}</Text>
        <Text style={styles.firma}>Sucursal: {guia.sucursal.codigo} - {guia.sucursal.nombre}</Text>
        <Text style={styles.firma}>Empresa: {guia.empresa.nombre}</Text>
    </View>
);

export const EstructuraGuia = ({ guia }) => {
    const articuloText = guia.articulos.map(item => `(${item.cantidad}) - ${item.articulo}`).join(', ');
    const totalMonto = guia.articulos.reduce((total, item) => total + (item.cantidad * item.monto), 0);
    const formattedDate = format(new Date(guia.createdAt), 'dd-MM-yyyy HH:mm');

    return (
        <Document>
            <Page size={'A4'} style={styles.page}>
                <Text style={styles.title}>GUIA: {guia.sucursal.codigo}-{guia.id}</Text>
                <Text style={styles.subtitle}>(OFICINA: {guia.sucursal.codigo} - {guia.sucursal.nombre})</Text>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Text style={styles.line}>Peso En Kilos: {guia.peso} KG</Text>
                    <Text style={styles.line}>Peso Volumetrico: {guia.pesoVolumetrico} </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.line}>Medidas: {guia.alto}CM * {guia.ancho}CM * {guia.largo}CM</Text>
                    <Text style={styles.line}>Medidas en Pulgadas:{parseFloat(guia.alto / 2.54).toFixed(1)}" * {parseFloat(guia.ancho / 2.54).toFixed(1)}" * {parseFloat(guia.largo / 2.54).toFixed(1)}"</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.line}>Pie Cubico: {guia.ft3}</Text>
                    <Text style={styles.line}>M3: {guia.m3}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Text style={styles.line}>Tipo de Envio: {guia.tipoGuia} KG</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.line}>Pais Origen: {guia.paisOrigen}</Text>
                    <Text style={styles.line}>Pais Destino: {guia.paisDestino}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.line}>Remitente: {guia.cliente.nombre} {guia.cliente.apellido}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.line}>Tipo de Documento: {guia.cliente.tipoDocumento}</Text>
                    <Text style={styles.line}>Numero de Documento: {guia.cliente.documento}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.line}>Destinatario: {guia.destinatario.nombre} {guia.destinatario.apellido}</Text>
                    <Text style={styles.line}>Telefono: {guia.destinatario.telefono}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.line}>Tipo de Documento: {guia.destinatario.tipoDocumento}</Text>
                    <Text style={styles.line}>Numero de Documento: {guia.destinatario.documento}</Text>
                </View>
                <View style={styles.divider} />

                {/* Tabla */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCell, { flex: 8 }]}>RESUMEN</Text>
                        <Text style={[styles.tableCellLast, { flex: 2 }]}>TOTAL</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.tableCell, { flex: 8 }]}>
                            {articuloText}
                        </Text>
                        <Text style={[styles.tableCellLast, { flex: 2 }]}>{totalMonto}</Text>
                    </View>
                </View>

                <Text style={styles.observacion}>OBSERVACION IMPORTANTE</Text>
                <Text style={styles.certifico}>Certifico bajo juramento que el contenido del presente envío entregado a {guia.sucursal.codigo} - {guia.empresa.nombre}. Se ajusta a lo declarado en la guía
                    y me hago responsable, ante las autoridades nacionales y extranjeras por el contenido y valor declarado. Este envío cumple los
                    parámetros aduaneros del país destino. Adicionalmente certifico que el envió no tiene dinero, valores negociables, ni objetos de
                    prohibido transporte, según las normas internacionales y legislación aplicable en el país destino u origen. Puede Existir retraso en la
                    llegada en la cual acepto.</Text>

                <View style={styles.signatureContainer}>
                    <View style={styles.signatureLine} />
                    <Text style={styles.signatureText}>Firma Remitente</Text>
                </View>

                <Footer guia={guia} />
            </Page>
            <Page size={'A4'} style={styles.page}>
                <Text style={styles.title}>ANEXO 1</Text>
                <Text style={styles.subtitle}>DECLARACION JURADA DE VALOR</Text>
                <Text style={styles.certifico}>Yo {guia.cliente.nombre} {guia.cliente.apellido} de nacionalidad {guia.cliente.nacionalidad} , con documento de identidad N° {guia.cliente.documento},
                    domiciliado en {guia.cliente.direccion}, en merito a la Ley del Procedimiento Administrativo General Ley N° 27444, declaro el valor FOB estimado de la mercancia,
                    asi como de los datos siguientes: GUIA {guia.sucursal.codigo}-{guia.id}</Text>


                <Text style={styles.certifico}>Declaro bajo juramento que los presentes datos obedecen a la verdad, sometiendome a las sanciones administrativas, civiles y
                    penales que correspondan en caso de falsedad de los mismo</Text>
                <View style={styles.signatureContainer}>
                    <View style={styles.signatureLine} />
                    <Text style={styles.signatureText}>Firma Remitente</Text>
                </View>

                <Footer guia={guia} />
            </Page>
        </Document>
    );
};
