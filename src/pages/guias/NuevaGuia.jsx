import React, { useState } from 'react';
import { CClient } from './components/CClient';
import { CDestino } from './components/CDestino';
import { CDestinatario } from './components/CDestinatario';
import { CEntrega } from './components/CEntrega';
import { CTasa } from './components/CTasa';
import { CAdicionales } from './components/CAdicionales';
import { CArticulos } from './components/CArticulos';
import { CPagos } from './components/CPagos';
import Cookies from 'js-cookie';
import { Button, useToast } from '@chakra-ui/react';
import instanceWithToken from '../../utils/instanceWithToken';
import { useNavigate } from 'react-router-dom';

export const NuevaGuia = () => {
  let [moneda, setMoneda] = useState(Cookies.get('moneda'));
  const navigate = useNavigate()
  const [tipoGuia, setTipoGuia] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [client, setClient] = useState('');
  const [destinatarios, setDestinatarios] = useState([]);
  const [destinatario, setDestinatario] = useState('');
  const [entregaPP, setEntregaPP] = useState(false);
  const [direccionDestinatario, setDireccionDestinatario] = useState('');
  const [courier, setCourier] = useState('');
  const [peso, setPeso] = useState('');
  const [tasa, setTasa] = useState('');
  const [tasaData, setTasaData] = useState('');
  const [alto, setAlto] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const [volumen, setVolumen] = useState('');
  const [seguro, setSeguro] = useState(false);
  const [montoSeguro, setMontoSeguro] = useState(0);
  const [delivery, setDelivery] = useState(false);
  const [montoDelivery, setMontoDelivery] = useState(0);
  const [paquete, setPaquete] = useState(false);
  const [paqueteNombre, setPaqueteNombre] = useState('');
  const [paquetePrecio, setPaquetePrecio] = useState(0);
  const [articulos, setArticulos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [total, setTotal] = useState();
  const toast = useToast()
  const store = () => {
    if (Cookies.get("sucursalId") == "null") {
      alert("No puedes generar guias, solicita a tu administrador que te asigne una sucursal para poder realizar esta operacion!")
    }
    if (!tipoGuia) {
      alert('Debes seleccionar un tipo de guía');
      return;
    }
    if (!origen) {
      alert('Debes ingresar el origen');
      return;
    }
    if (!destino) {
      alert('Debes ingresar el destino');
      return;
    }
    if (!client) {
      alert('Debes seleccionar un cliente');
      return;
    }
    if (!destinatario) {
      alert('Debes seleccionar un destinatario');
      return;
    }
    if (!peso) {
      alert('Debes ingresar el peso');
      return;
    }
    if (!tasa) {
      alert('Debes ingresar la tasa');
      return;
    }
    if (!alto) {
      alert('Debes ingresar la altura');
      return;
    }
    if (!ancho) {
      alert('Debes ingresar el ancho');
      return;
    }
    if (!largo) {
      alert('Debes ingresar el largo');
      return;
    }
    if (!volumen) {
      alert('Debes ingresar el volumen');
      return;
    }
    if (!total) {
      alert('El total debe ser calculado');
      return;
    }
    if (articulos.length === 0) {
      alert('Debes agregar al menos un artículo');
      return;
    }
    if (pagos.length === 0) {
      alert('Debes agregar al menos un pago');
      return;
    }

    let payload = {
      tipoGuia,
      alto,
      largo,
      ancho,
      pesoVolumetrico: volumen,
      m3: (alto * ancho * largo) / 1000000,
      ft3: alto * ancho * largo * 0.0000353147,
      peso,
      monto: total,
      divisa: Cookies.get("moneda"),
      paisOrigen: origen,
      paisDestino: destino,
      seguro,
      montoSeguro,
      entregaPP,
      paquete,
      paqueteNombre,
      paquetePrecio,
      delivery,
      montoDelivery,
      cliente: client,
      destinatario,
      tasa,
      courier: courier ? courier : null,
      user: Cookies.get("id"),
      empresa: Cookies.get("empresaId"),
      sucursal: Cookies.get("sucursalId"),
      articulos,
      pagos
    }

    instanceWithToken.post('guias', payload).then((result) => {
      toast({
        title: 'Exito.',
        description: 'Guia Generada con exito Numero de guia: ' + result.data.data.id,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      window.open('/documents/ticket/' + result.data.data.id, '_blank');
      navigate("/documents/guia/" + result.data.data.id)
    }).catch((error) => alert("Esta guia no se genero o presento fallas durante su generacion, antes de volverlo a intentar revisa el listado de tus guias, si esta creada pero existe algun error contacta con soporte!"))
  };

  return (
    <>
      <CDestino
        tipoGuia={tipoGuia}
        setTipoGuia={setTipoGuia}
        origen={origen}
        setOrigen={setOrigen}
        destino={destino}
        setDestino={setDestino}
      />
      <CClient setClient={setClient} setDestinatarios={setDestinatarios} />
      <CDestinatario
        destinatarios={destinatarios}
        setDestinatario={setDestinatario}
        client={client}
        setDireccionDestinatario={setDireccionDestinatario}
      />

      <CEntrega
        entregaPP={entregaPP}
        setEntregaPP={setEntregaPP}
        direccionDestinatario={direccionDestinatario}
        setCourier={setCourier}
      />

      <CTasa
        moneda={moneda}
        setTasaData={setTasaData}
        tipoGuia={tipoGuia}
        peso={peso}
        setPeso={setPeso}
        volumen={volumen}
        setVolumen={setVolumen}
        tasa={tasa}
        setTasa={setTasa}
        alto={alto}
        setAlto={setAlto}
        ancho={ancho}
        setAncho={setAncho}
        largo={largo}
        setLargo={setLargo}
      />

      <CAdicionales
        moneda={moneda}
        seguro={seguro}
        montoSeguro={montoSeguro}
        delivery={delivery}
        montoDelivery={montoDelivery}
        paquete={paquete}
        paqueteNombre={paqueteNombre}
        paquetePrecio={paquetePrecio}
        setSeguro={setSeguro}
        setMontoSeguro={setMontoSeguro}
        setDelivery={setDelivery}
        setMontoDelivery={setMontoDelivery}
        setPaquete={setPaquete}
        setPaqueteNombre={setPaqueteNombre}
        setPaquetePrecio={setPaquetePrecio}
      />

      <CArticulos articulos={articulos} setArticulos={setArticulos} />

      <CPagos
        total={total}
        setTotal={setTotal}
        tasaData={tasaData}
        peso={peso}
        volumen={volumen}
        pagos={pagos}
        setPagos={setPagos}
        moneda={moneda}
        setMoneda={setMoneda}
        montoDelivery={montoDelivery}
        montoSeguro={montoSeguro}
        paquetePrecio={paquetePrecio}
      />

      <Button width={'100%'} onClick={() => store()} colorScheme='blue'>
        Generar Guía
      </Button>
    </>
  );
};
