import { PDFViewer } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import { EstructuraEtiqueta } from './estructura/EstructuraEtiqueta'
import { useParams } from 'react-router-dom';
import instanceWithToken from '../../utils/instanceWithToken';

export const Etiqueta = () => {
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
            <EstructuraEtiqueta guia={guia} />
        </PDFViewer>
    )
}
