import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import instanceWithToken from '../../utils/instanceWithToken';
import { PDFViewer } from '@react-pdf/renderer';
import { EstructuraGuia } from './estructura/EstructuraGuia';
import { EstructuraManifiesto } from './estructura/EstructuraManifiesto';

export const ManifiestoPdf = () => {
    const { manifiestoId } = useParams();
    const [manifiesto, setManifiesto] = useState(null);

    const getGuia = () => {
        instanceWithToken.get(`manifiestos/${manifiestoId}`).then((result) => {
            setManifiesto(result.data.data);
        });
    };

    useEffect(() => {
        getGuia();
    }, [manifiestoId]);

    if (!manifiesto) {
        return <div>Cargando Manifiesto...</div>;
    }

    return (
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
            <EstructuraManifiesto manifiesto={manifiesto} />
        </PDFViewer>
    )
}
