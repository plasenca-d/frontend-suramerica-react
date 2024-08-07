import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    width: '80mm',
  },
  section: {
    margin: 3,
    padding: 3,
    flexGrow: 1,
  },
});

// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size={{ width: '230', height: 'auto' }} style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
