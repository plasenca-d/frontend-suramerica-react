import { PDFViewer } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { EstructuraFactura } from './estructura/EstructuraFactura';
import instanceWithToken from '../../utils/instanceWithToken';
import { useParams } from 'react-router-dom';

export const Factura = () => {
  const { facturaId } = useParams();
  let [factura, setFactura] = useState(null);

  const getFactura = () => {
    instanceWithToken.get("facturas/" + facturaId).then((result) => {
      setFactura(result.data.data);
    });
  };

  useEffect(() => {
    getFactura();
  }, []);

  return (
    <div>
      {factura ? (
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
          <EstructuraFactura factura={factura} />
        </PDFViewer>
      ) : (
        <p>Cargando factura...</p> // Puedes personalizar este mensaje
      )}
    </div>
  );
};
