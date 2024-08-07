import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import instanceWithToken from '../../utils/instanceWithToken';
import { PDFViewer } from '@react-pdf/renderer';
import { EstructuraGuia } from './estructura/EstructuraGuia';

export const Guia = () => {
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
        return <div>Cargando Guia...</div>;
    }

    return (
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
            <EstructuraGuia guia={guia} />
        </PDFViewer>
    )
}
