import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '80mm',
  },
  section: {
    margin: 3,
    padding: 3,
    flexGrow: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  precio: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  col: {
    flexDirection: 'col',
    marginVertical: 2,
  },
  h5: {
    fontSize: 15,
  },
  leftText: {
    fontSize: 10,
    textAlign: 'left',
  },
  rightText: {
    fontSize: 10,
    textAlign: 'right',
  },
  bgGray: {
    backgroundColor: 'gray',
    color: 'white',
    padding: 3,
    marginVertical: 2,
  },
  terminos: {
    fontSize: 8,
    textAlign: 'justify',
    paddingLeft: 10,
    paddingRight: 10
  }
});

// Create Document Component
export const EstructuraTicket = ({ guia }) => {
  // Formatear la fecha
  const formattedDate = format(new Date(guia.createdAt), 'dd/MM/yyyy HH:mm');

  return (
    <Document>
      <Page size={{ width: 230, height: 'auto' }} style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{guia.empresa.nombre}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>{guia.sucursal.codigo} - {guia.sucursal.nombre}</Text>
          <Text style={styles.text}>{guia.sucursal.direccion}</Text>
          <Text style={styles.text}>TELEFONO: {guia.sucursal.telefono}</Text>
        </View>
        <View style={[styles.section, styles.row]}>
          <Text style={[styles.leftText, styles.h5]}>TRACKING</Text>
          <Text style={[styles.rightText, styles.h5]}>{guia.sucursal.codigo}-{guia.id}</Text>
        </View>
        <View style={[styles.section, styles.row]}>
          <Text style={styles.leftText}>FECHA</Text>
          <Text style={styles.rightText}>{formattedDate}</Text>
        </View>
        <View style={[styles.section, styles.bgGray]}>
          <Text style={styles.title}>REMITENTE</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.col}>
            <Text style={styles.leftText}>Nombre</Text>
            <Text style={styles.rightText}>{guia.cliente.nombre} {guia.cliente.apellido}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.leftText}>Documento</Text>
            <Text style={styles.rightText}>{guia.cliente.tipoDocumento} {guia.cliente.documento}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Teléfono</Text>
            <Text style={styles.rightText}>{guia.cliente.telefono}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.bgGray]}>
          <Text style={styles.title}>DESTINATARIO</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.leftText}>Nombre</Text>
            <Text style={styles.rightText}>{guia.destinatario.nombre} {guia.destinatario.apellido}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.leftText}>Documento</Text>
            <Text style={styles.rightText}>{guia.destinatario.tipoDocumento} {guia.destinatario.documento}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Teléfono</Text>
            <Text style={styles.rightText}>{guia.destinatario.telefono}</Text>
          </View>
        </View>
        {guia.entregaPP &&
          <>
            <View style={[styles.section, styles.bgGray]}>
              <Text style={styles.title}>ENTREGA PUERTA A PUERTA</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.leftText}>Pais Origen</Text>
                <Text style={styles.rightText}>{guia.paisOrigen}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Pais Destino</Text>
                <Text style={styles.rightText}>{guia.paisDestino}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Estado</Text>
                <Text style={styles.rightText}>{guia.destinatario ? guia.destinatario.estado : null}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Ciudad</Text>
                <Text style={styles.rightText}>{guia.destinatario ? guia.destinatario.ciudad : null}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Direccion</Text>
                <Text style={styles.rightText}>{guia.destinatario ? guia.destinatario.direccion : null}</Text>
              </View>
            </View>
          </>
        }
        {!guia.entregaPP &&
          <>
            <View style={[styles.section, styles.bgGray]}>
              <Text style={styles.title}>RECOJO EN COURIER</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.leftText}>Pais Origen</Text>
                <Text style={styles.rightText}>{guia.paisOrigen}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Pais Destino</Text>
                <Text style={styles.rightText}>{guia.paisDestino}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Estado</Text>
                <Text style={styles.rightText}>{guia.courier ? guia.courier.estado : null}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Ciudad</Text>
                <Text style={styles.rightText}>{guia.courier ? guia.courier.ciudad : null}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.leftText}>Direccion</Text>
                <Text style={styles.rightText}>{guia.courier ? guia.courier.direccion : null}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Codigo</Text>
                <Text style={styles.rightText}>{guia.courier ? guia.courier.CodOficina : null}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.leftText}>Nombre</Text>
                <Text style={styles.rightText}>{guia.courier ? guia.courier.nombre : null}</Text>
              </View>
            </View>
          </>
        }
        <>
          <View style={[styles.section, styles.bgGray]}>
            <Text style={styles.title}>CARATERISTICAS DEL PAQUETE</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.leftText}>Tipo de Envio</Text>
              <Text style={styles.rightText}>{guia.tipoGuia}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Peso KG</Text>
              <Text style={styles.rightText}>{guia.peso} KG</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Peso Vol</Text>
              <Text style={styles.rightText}>{guia.pesoVolumetrico}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Dimensiones</Text>
              <Text style={styles.rightText}>{guia.alto}cm X {guia.ancho}cm X {guia.largo}cm </Text>
            </View>
          </View>
        </>
        {guia.paquete &&
          <>
            <View style={[styles.section, styles.bgGray]}>
              <Text style={styles.title}>EMPAQUETADO ADICIONAL</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.leftText}>Tipo</Text>
                <Text style={styles.rightText}>{guia.paqueteNombre}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Precio</Text>
                <Text style={styles.rightText}>{guia.paquetePrecio}</Text>
              </View>
            </View>
          </>
        }
        <View style={[styles.section, styles.bgGray]}>
          <Text style={styles.title}>SEGURO</Text>
        </View>
        {!guia.seguro &&
          <View style={styles.section}>
            <Text style={styles.title}>ENVIO NO ASEGURADO</Text>
          </View>
        }
        {guia.seguro &&
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.leftText}>Monto</Text>
              <Text style={styles.rightText}>{guia.montoSeguro}</Text>
            </View>
          </View>
        }
        {guia.delivery &&
          <>
            <View style={[styles.section, styles.bgGray]}>
              <Text style={styles.title}>DELIVERY</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.leftText}>Monto</Text>
                <Text style={styles.rightText}>{guia.montoDelivery}</Text>
              </View>
            </View>
          </>
        }
        <>
          <View style={[styles.section, styles.bgGray]}>
            <Text style={styles.title}>MONTO FACTURADO</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.precio}>{guia.monto} {guia.divisa}</Text>
          </View>
        </>
        <View style={[styles.section, styles.bgGray]}>
          <Text style={styles.title}>TERMINOS Y CONDICIONES</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.terminos}>
            ENTIENDO Y ACEPTO QUE "{guia.empresa.nombre}" NO ASUMIRÁ
            RESPONSABILIDAD ALGUNA POR LOS ENVIOS
            DECOMISADOS BIEN SEA POR CONTENER OBJETOS
            PROHIBIDOS O SOMETIDOS A DERECHO DE ADUANA
            O CONFISCADO POR LAS AUTORIDADES. Asi mismo
            declaro conocer que este servicio tiene limitaciones impuestos
            por razones de conveniencia general en defensa moral y
            pública de seguridad nacional, defensa del tesoro público y
            también por razones de interés del propio servicio y de sus
            funciones. De acuerdo con el principio anterior, certifico que
            no estoy enviando ningúno de los siguientes articulos. *
            Objetos cuya admisión o circulación esté prohibida en el país
            destino. * Dinero en efectivo y otros objetos de valor como
            (moneda, oro, platino, plata, piedras preciosas). * Materiales
            explosivos, informales, virus,agentes irritables o peligrosos. *
            Todo aquello que los convenios o acuerdos internacionales
            consagran como prohibida circulación. Dicho esto también
            declaro haber sido notificado que "Todos los envíos
            internacionales están sujetos a revisión por parte de las
            autoridades en los países de origen, destino y transito y pueden
            llegar a generar pagos de impuestos en el país de destino y/o
            demorarse por seguridad, por lo tanto, me comprometo a
            presentar y pagar ante las autoridades correspondientes los
            impuestos que pudiense generar en las aduanas nacionales o
            coordinar con el destinatario para el pago de los impuestos
            aduanales en el país destino en caso que así lo requieran las las
            autoridades correspondientes"
          </Text>
        </View>
      </Page>
    </Document>
  );
};
