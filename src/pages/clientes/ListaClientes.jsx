import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { MyDocument } from '../pruebas/MyDocumnet'

export const ListaClientes = () => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <MyDocument />
    </PDFViewer>
  )
}
