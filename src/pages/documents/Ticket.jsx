import React, { useEffect, useState } from 'react';
import { EstructuraTicket } from './estructura/EstructuraTicket';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import instanceWithToken from '../../utils/instanceWithToken';

export const Ticket = () => {
  const { guiaId } = useParams();
  const [guia, setGuia] = useState(null);
  
  const getGuia = () => {
    instanceWithToken.get(`guias/${guiaId}`).then((result) => {
      setGuia(result.data.data);
    });
  };

  useEffect(() => {
    getGuia();
  }, [guiaId]);

  if (!guia) {
    return <div>Cargando Ticket...</div>;
  }

  return (
    <PDFViewer style={{ width: '100%', height: '80vh' }}>
      <EstructuraTicket guia={guia} />
    </PDFViewer>
  );
};
